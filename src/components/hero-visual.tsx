"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  ACCENT_COUNT,
  skansenKronanScene,
  type HeroScene,
  type Vec3,
} from "@/lib/hero-scenes";

/** Seconds for every camera to come online and the cloud to finish filling in. */
const REVEAL_SECONDS = 9;
/** Seconds for one full back-and-forth of the orbit. */
const SWAY_SECONDS = 44;
/** Opacity quantisation for the point buckets; also the painter's ordering. */
const ALPHA_STEPS = 32;

/** Seconds between one view pair lighting up and the next. Pairs overlap. */
const PAIR_SECONDS = 2.4;

/** The gilded copper crown, which keeps its own colour in both themes. */
const GOLD_LIGHT = "40 82% 46%";
const GOLD_DARK = "44 88% 62%";

type Basis = { eye: Vec3; right: Vec3; up: Vec3; forward: Vec3 };
type Screen = { x: number; y: number; z: number };

function sub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function dot(a: Vec3, b: Vec3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function normalize(v: Vec3): Vec3 {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}

function lookAt(eye: Vec3, target: Vec3): Basis {
  const forward = normalize(sub(target, eye));
  const right = normalize(cross(forward, [0, 1, 0]));
  const up = cross(right, forward);
  return { eye, right, up, forward };
}

function cssVar(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

/** Lightness of an "H S% L%" triple, used to tell the two themes apart. */
function lightnessOf(hsl: string) {
  const parts = hsl.split(/\s+/);
  return Number.parseFloat(parts[2]) || 0;
}

/**
 * The --chart-* tokens are picked for filled chart marks, not hairlines, and
 * they carry different hues per theme. Keep the hue and saturation, but push
 * lightness into a band that stays legible as a thin ray over the background.
 */
function rayColor(hsl: string, dark: boolean) {
  const [h, s, l] = hsl.split(/\s+/);
  const lightness = Number.parseFloat(l) || 50;
  const clamped = dark
    ? Math.max(58, Math.min(76, lightness))
    : Math.min(48, Math.max(34, lightness));
  return `${h} ${s} ${clamped}%`;
}

type Palette = { ink: string; gold: string; rays: string[] };

function readPalette(): Palette {
  const background = cssVar("--background", "0 0% 100%");
  const dark = lightnessOf(background) < 50;
  return {
    ink: cssVar("--foreground", "0 0% 3.9%"),
    gold: dark ? GOLD_DARK : GOLD_LIGHT,
    rays: Array.from({ length: ACCENT_COUNT }, (_, i) =>
      rayColor(cssVar(`--chart-${i + 1}`, "0 0% 50%"), dark)
    ),
  };
}

export function HeroVisual({
  scene = skansenKronanScene,
  className,
}: {
  scene?: HeroScene;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let palette = readPalette();
    let running = true;
    let frame = 0;
    let start = 0;
    let elapsed = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Screen-space scratch buffers, reused every frame to avoid per-frame garbage.
    const projected: Screen[] = scene.points.map(() => ({ x: 0, y: 0, z: 0 }));
    const visible = new Uint8Array(scene.points.length);
    // Points are bucketed by opacity rather than depth-sorted. Opacity is derived
    // from depth, so the buckets already run far-to-near, and drawing them in
    // order gives the same painter's result for one fillStyle change per bucket
    // instead of one per point.
    const inkBuckets: number[][] = Array.from({ length: ALPHA_STEPS }, () => []);
    const goldBuckets: number[][] = Array.from({ length: ALPHA_STEPS }, () => []);

    const draw = (time: number) => {
      if (width === 0 || height === 0) return;

      const reveal = reduceMotion ? 1 : Math.min(1, time / REVEAL_SECONDS);
      // Ease so the last cameras settle in rather than snapping.
      const eased = 1 - Math.pow(1 - reveal, 3);
      const live = eased * scene.cameras.length;

      const sway = reduceMotion
        ? 0
        : Math.sin((time / SWAY_SECONDS) * Math.PI * 2);
      // Kept small: a wide sway flattens the capture arc into a straight line.
      const azimuth = scene.view.azimuth + sway * 0.09;
      const elevation = scene.view.elevation + sway * 0.03;
      const distance = scene.view.distance;

      const eye: Vec3 = [
        scene.center[0] + Math.cos(azimuth) * Math.cos(elevation) * distance,
        scene.center[1] + Math.sin(elevation) * distance,
        scene.center[2] + Math.sin(azimuth) * Math.cos(elevation) * distance,
      ];
      const basis = lookAt(eye, scene.center);

      // Narrow viewports put a full-width text card over the middle of the hero,
      // so the scene is pulled back and centred to stay readable above and below it.
      const narrow = width < 768;
      const focal = narrow ? 1.32 : 1.92;
      const scale = Math.max(height, width * 0.42);
      const cx = width * (narrow ? 0.5 : 0.64);
      const cy = height * (narrow ? 0.42 : 0.4);

      const project = (p: Vec3): Screen | null => {
        const v = sub(p, basis.eye);
        const z = dot(v, basis.forward);
        if (z <= 0.08) return null;
        return {
          x: cx + (dot(v, basis.right) / z) * focal * scale,
          y: cy - (dot(v, basis.up) / z) * focal * scale,
          z,
        };
      };

      ctx.clearRect(0, 0, width, height);

      visible.fill(0);
      for (let b = 0; b < ALPHA_STEPS; b++) {
        inkBuckets[b].length = 0;
        goldBuckets[b].length = 0;
      }

      for (let i = 0; i < scene.points.length; i++) {
        const point = scene.points[i];
        if (point.camera > live) continue;
        const s = project(point.p);
        if (
          !s ||
          s.x < -40 ||
          s.x > width + 40 ||
          s.y < -40 ||
          s.y > height + 40
        ) {
          continue;
        }
        projected[i] = s;
        visible[i] = 1;

        // Points fade in over roughly one camera's worth of progress, and fade
        // out with distance so the far terrain reads as depth, not as grit.
        const age = Math.min(1, Math.max(0, live - point.camera));
        const depth = Math.max(0, Math.min(1, (distance + 1.6 - s.z) / 3.8));
        const gold = point.tint === "gold";
        const alpha =
          ((gold ? 0.5 : 0.09) + depth * (gold ? 0.45 : 0.66)) * age;
        const bucket = Math.max(
          0,
          Math.min(ALPHA_STEPS - 1, Math.round(alpha * ALPHA_STEPS) - 1)
        );
        if (bucket < 0) continue;
        (gold ? goldBuckets : inkBuckets)[bucket].push(i);
      }

      for (let b = 0; b < ALPHA_STEPS; b++) {
        const alpha = ((b + 1) / ALPHA_STEPS).toFixed(3);
        for (const [buckets, colour] of [
          [inkBuckets, palette.ink],
          [goldBuckets, palette.gold],
        ] as const) {
          const list = buckets[b];
          if (list.length === 0) continue;
          ctx.fillStyle = `hsl(${colour} / ${alpha})`;
          for (const i of list) {
            const s = projected[i];
            const size = s.z < distance ? 1.8 : 1.3;
            ctx.fillRect(s.x, s.y, size, size);
          }
        }
      }

      // Correspondence rays: each pair of neighbouring views lights up in turn,
      // rays growing out from both cameras to the points they share.
      const cycle = scene.pairs.length * PAIR_SECONDS;
      const phase = reduceMotion ? PAIR_SECONDS : time % cycle;
      ctx.lineWidth = 1.1;
      for (let j = 0; j < scene.pairs.length; j++) {
        const pair = scene.pairs[j];
        if (pair.b > live) continue;

        let d = phase - j * PAIR_SECONDS;
        if (d < 0) d += cycle;
        // Windows are twice the step, so two pairs are lit at any moment.
        if (d > PAIR_SECONDS * 2) continue;

        const envelope = Math.sin((d / (PAIR_SECONDS * 2)) * Math.PI);
        const grow = Math.min(1, d / (PAIR_SECONDS * 0.45));
        const from = [
          project(scene.cameras[pair.a].position),
          project(scene.cameras[pair.b].position),
        ];

        const colour = palette.rays[pair.tint % palette.rays.length];
        ctx.strokeStyle = `hsl(${colour} / ${(envelope * 0.75).toFixed(3)})`;
        ctx.beginPath();
        for (const k of pair.shared) {
          if (!visible[k]) continue;
          const target = projected[k];
          for (const origin of from) {
            if (!origin) continue;
            ctx.moveTo(origin.x, origin.y);
            ctx.lineTo(
              origin.x + (target.x - origin.x) * grow,
              origin.y + (target.y - origin.y) * grow
            );
          }
        }
        ctx.stroke();

        // Mark the triangulated point once its rays arrive.
        if (grow >= 1) {
          ctx.fillStyle = `hsl(${colour} / ${(envelope * 0.9).toFixed(3)})`;
          for (const k of pair.shared) {
            if (!visible[k]) continue;
            ctx.fillRect(projected[k].x - 1, projected[k].y - 1, 3, 3);
          }
        }
      }

      // Camera frusta, drawn in registration order.
      for (let i = 0; i < scene.cameras.length; i++) {
        const appear = Math.min(1, Math.max(0, live - i));
        if (appear <= 0) continue;

        const cam = scene.cameras[i];
        const cb = lookAt(cam.position, cam.target);
        const near = 0.26;
        const w = 0.17;
        const h = 0.11;

        const corner = (sx: number, sy: number): Vec3 => [
          cam.position[0] +
            cb.forward[0] * near +
            cb.right[0] * sx * w +
            cb.up[0] * sy * h,
          cam.position[1] +
            cb.forward[1] * near +
            cb.right[1] * sx * w +
            cb.up[1] * sy * h,
          cam.position[2] +
            cb.forward[2] * near +
            cb.right[2] * sx * w +
            cb.up[2] * sy * h,
        ];

        const apex = project(cam.position);
        const corners = [
          project(corner(-1, -1)),
          project(corner(1, -1)),
          project(corner(1, 1)),
          project(corner(-1, 1)),
        ];
        if (!apex || corners.some((c) => !c)) continue;
        const quad = corners as Screen[];

        ctx.lineWidth = 1;
        ctx.strokeStyle = `hsl(${palette.ink} / ${(0.72 * appear).toFixed(3)})`;
        ctx.beginPath();
        for (let k = 0; k < 4; k++) {
          ctx.moveTo(apex.x, apex.y);
          ctx.lineTo(quad[k].x, quad[k].y);
        }
        ctx.moveTo(quad[0].x, quad[0].y);
        for (let k = 1; k < 4; k++) ctx.lineTo(quad[k].x, quad[k].y);
        ctx.closePath();
        ctx.stroke();
      }
    };

    // Elapsed time is banked on pause and restored on resume, so scrolling the
    // hero out of view and back does not jump the orbit or replay the reveal.
    let banked = 0;

    const loop = (now: number) => {
      if (!start) start = now;
      elapsed = banked + (now - start) / 1000;
      draw(elapsed);
      if (running) frame = requestAnimationFrame(loop);
    };

    const setRunning = (next: boolean) => {
      if (next === running || reduceMotion) return;
      running = next;
      if (running) {
        start = 0;
        frame = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(frame);
        banked = elapsed;
      }
    };

    resize();

    if (reduceMotion) {
      draw(REVEAL_SECONDS);
    } else {
      frame = requestAnimationFrame(loop);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(REVEAL_SECONDS);
    });
    resizeObserver.observe(parent);

    // Stop burning frames when the hero is scrolled away or the tab is hidden.
    let onScreen = true;
    const sync = () => setRunning(onScreen && !document.hidden);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    intersectionObserver.observe(canvas);
    document.addEventListener("visibilitychange", sync);

    // Follow theme changes; next-themes toggles a class on <html>.
    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      if (reduceMotion) draw(REVEAL_SECONDS);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", sync);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
    };
  }, [scene]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}
