// Geometry for the animated hero visual (src/components/hero-visual.tsx).
//
// A scene is a sparse point cloud, the camera poses that registered it, and the
// pairs of views that share correspondences. That shape is deliberately general:
// a structure-from-motion reconstruction is the first scene, but a medical volume
// with slice planes, a mirrored cloud for the symmetry work, or points condensing
// out of noise for generative models all fit it. Add a scene here and the
// renderer draws it without changes.

export type Vec3 = [number, number, number];

export type HeroCamera = {
  position: Vec3;
  target: Vec3;
};

export type HeroPoint = {
  p: Vec3;
  /** Camera that registers this point; it fades in when that camera does. */
  camera: number;
  /** Non-default colouring; undefined draws in the theme's foreground colour. */
  tint?: "gold";
};

/** Two views and the points they both see, drawn as coloured correspondence rays. */
export type HeroPair = {
  a: number;
  b: number;
  /** Indices into HeroScene.points. */
  shared: number[];
  /** Accent palette index for this pair's rays. */
  tint: number;
};

export type HeroScene = {
  id: string;
  points: HeroPoint[];
  cameras: HeroCamera[];
  pairs: HeroPair[];
  /** Point the orbit looks at. */
  center: Vec3;
  /** Resting orbit pose. The renderer sways gently around this. */
  view: { azimuth: number; elevation: number; distance: number };
};

/** Deterministic PRNG, so the cloud looks identical on every render and reload. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CAMERA_COUNT = 11;

/** Number of accent colours the renderer resolves from --chart-1..5. */
export const ACCENT_COUNT = 5;

// --- Skansen Kronan --------------------------------------------------------
//
// The 1687-1700 redoubt on Risåsberget above Haga, and Gothenburg's most
// recognisable silhouette. Proportions follow the fortress as described: an
// octagonal tower whose four wide faces alternate with four narrow chamfers,
// two horizontal rows of semicircular gun embrasures over the lower storeys,
// rifle ports between console mouldings on the top storey, and the gilded
// copper crown. Modelled to read at a glance, not to survey accuracy.

/** Half-width across the wide faces. */
const R = 0.62;
/** How much each corner is cut back to form the narrow faces. */
const CHAMFER = 0.26;
/** Height of the masonry, before the roof. */
const WALL_H = 1.24;

type Opening = { cu: number; cv: number; w: number; h: number };

/** Signed distance to an arched opening; negative inside the hole. */
function openingDistance(du: number, dv: number, w: number, h: number) {
  const r = w / 2;
  const top = h / 2 - r;
  const bottom = -h / 2;

  // Box for the shaft.
  const bx = Math.abs(du) - r;
  const by = Math.abs(dv - (bottom + top) / 2) - (top - bottom) / 2;
  const box =
    Math.min(Math.max(bx, by), 0) + Math.hypot(Math.max(bx, 0), Math.max(by, 0));

  // Circle for the semicircular head.
  const cap = Math.hypot(du, dv - top) - r;

  return Math.min(box, cap);
}

function octagonVertices(): Vec3[] {
  const inner = R - CHAMFER;
  return [
    [inner, 0, R],
    [R, 0, inner],
    [R, 0, -inner],
    [inner, 0, -R],
    [-inner, 0, -R],
    [-R, 0, -inner],
    [-R, 0, inner],
    [-inner, 0, R],
  ];
}

function buildSkansenKronan(): HeroScene {
  const rand = mulberry32(16871700);
  const points: HeroPoint[] = [];
  const verts = octagonVertices();

  // Two rows of gun embrasures plus a row of rifle ports, laid out so the wide
  // faces carry three per row and the narrow chamfers two — forty in total.
  const rows = [
    { cv: 0.4, w: 0.1, h: 0.17 },
    { cv: 0.76, w: 0.1, h: 0.17 },
  ];
  const RIFLE = { cv: 1.06, w: 0.045, h: 0.075 };

  for (let f = 0; f < 8; f++) {
    const v1 = verts[f];
    const v2 = verts[(f + 1) % 8];
    const dx = v2[0] - v1[0];
    const dz = v2[2] - v1[2];
    const faceW = Math.hypot(dx, dz);
    const ux = dx / faceW;
    const uz = dz / faceW;
    const wide = faceW > 0.5;

    const openings: Opening[] = [];
    const perRow = wide ? 3 : 2;
    for (const row of rows) {
      for (let k = 0; k < perRow; k++) {
        openings.push({
          cu: ((k + 0.5) / perRow) * faceW,
          cv: row.cv,
          w: row.w,
          h: row.h,
        });
      }
    }
    const rifleCount = wide ? 4 : 2;
    for (let k = 0; k < rifleCount; k++) {
      openings.push({
        cu: ((k + 0.5) / rifleCount) * faceW,
        cv: RIFLE.cv,
        w: RIFLE.w,
        h: RIFLE.h,
      });
    }

    // Jittered grid over the face, denser than random sampling would be at the
    // same count and so kinder to the embrasure outlines.
    const nu = Math.round(faceW * 62);
    const nv = 96;
    for (let i = 0; i < nu; i++) {
      for (let j = 0; j < nv; j++) {
        const u = ((i + rand()) / nu) * faceW;
        // Walls batter very slightly inwards towards the top.
        const v = ((j + rand()) / nv) * WALL_H;

        let dist = Infinity;
        for (const o of openings) {
          dist = Math.min(dist, openingDistance(u - o.cu, v - o.cv, o.w, o.h));
        }
        if (dist < -0.004) continue;

        const onEdge = dist < 0.015;
        // Console moulding under the rifle ports, and a plinth at the base.
        const onCourse =
          Math.abs(v - 0.96) < 0.016 ||
          Math.abs(v - 1.19) < 0.016 ||
          v < 0.05;
        if (!onEdge && !onCourse && rand() < 0.86) continue;

        const batter = 1 - (v / WALL_H) * 0.035;
        const jx = (rand() - 0.5) * 0.01;
        const jz = (rand() - 0.5) * 0.01;
        points.push({
          p: [
            (v1[0] + ux * u) * batter + jx,
            v + (rand() - 0.5) * 0.008,
            (v1[2] + uz * u) * batter + jz,
          ],
          camera: 0,
        });
      }
    }
  }

  // Low tented roof over the tower, tapering to the crown deck.
  for (let i = 0; i < 1000; i++) {
    const t = Math.pow(rand(), 0.65);
    const y = WALL_H + t * 0.36;
    const shrink = 1 - t * 0.8;
    const f = Math.floor(rand() * 8);
    const v1 = verts[f];
    const v2 = verts[(f + 1) % 8];
    const s = rand();
    points.push({
      p: [
        (v1[0] + (v2[0] - v1[0]) * s) * shrink + (rand() - 0.5) * 0.008,
        y,
        (v1[2] + (v2[2] - v1[2]) * s) * shrink + (rand() - 0.5) * 0.008,
      ],
      camera: 0,
    });
  }

  // The gilded crown: a banded circlet with arches closing on a small orb. This
  // is the one part of the scene that carries colour of its own.
  const CROWN_Y = WALL_H + 0.36;
  const crownR = 0.15;
  for (let i = 0; i < 420; i++) {
    const a = rand() * Math.PI * 2;
    const y = CROWN_Y + rand() * 0.05;
    points.push({
      p: [Math.cos(a) * crownR, y, Math.sin(a) * crownR],
      camera: 0,
      tint: "gold",
    });
  }
  for (let arch = 0; arch < 5; arch++) {
    const a = (arch / 5) * Math.PI * 2;
    for (let i = 0; i < 90; i++) {
      const t = i / 90;
      const rr = crownR * Math.cos((t * Math.PI) / 2);
      const y = CROWN_Y + 0.05 + Math.sin((t * Math.PI) / 2) * 0.17;
      points.push({
        p: [
          Math.cos(a) * rr + (rand() - 0.5) * 0.006,
          y,
          Math.sin(a) * rr + (rand() - 0.5) * 0.006,
        ],
        camera: 0,
        tint: "gold",
      });
    }
  }
  for (let i = 0; i < 90; i++) {
    const a = rand() * Math.PI * 2;
    const b = Math.acos(2 * rand() - 1);
    points.push({
      p: [
        Math.sin(b) * Math.cos(a) * 0.035,
        CROWN_Y + 0.24 + Math.cos(b) * 0.035,
        Math.sin(b) * Math.sin(a) * 0.035,
      ],
      camera: 0,
      tint: "gold",
    });
  }

  const groundHeight = (rr: number) =>
    -0.06 - 0.62 * (1 - Math.exp(-(rr - 0.78) / 0.9));

  // Risåsberget. The crown of the hill falls away steeply and then levels out
  // into the ground below, so the terrain carries all the way to the edges of
  // the frame rather than stopping in a disc around the tower.
  for (let i = 0; i < 2600; i++) {
    // Biased inwards, so the hilltop stays denser than the ground beyond it.
    const rr = 0.78 + Math.pow(rand(), 2.4) * 6.2;
    const a = rand() * Math.PI * 2;
    const rampart = Math.abs(rr - 1.28) < 0.07;
    if (!rampart && rand() < 0.4) continue;
    points.push({
      p: [
        Math.cos(a) * rr,
        groundHeight(rr) + (rampart ? 0.07 : 0) + (rand() - 0.5) * 0.03,
        Math.sin(a) * rr,
      ],
      camera: 0,
    });
  }

  // The outer line of the defensive works that ring the fortress, carried round
  // the hill as a raised bank.
  for (let i = 0; i < 1500; i++) {
    const a = rand() * Math.PI * 2;
    const across = rand();
    const rr = 3.2 + across * 0.34;
    // Crest in the middle of the bank, falling away to either side.
    const crest = Math.sin(across * Math.PI) * 0.15;
    points.push({
      p: [
        Math.cos(a) * rr,
        groundHeight(rr) + crest + (rand() - 0.5) * 0.022,
        Math.sin(a) * rr,
      ],
      camera: 0,
    });
  }

  // Skansberget is a park, and a bare ground plane reads as noise. Scattered
  // clumps of vegetation give the terrain something for the eye to hold on to.
  for (let c = 0; c < 46; c++) {
    const rr = 1.5 + Math.pow(rand(), 0.8) * 4.6;
    const a = rand() * Math.PI * 2;
    const bx = Math.cos(a) * rr;
    const bz = Math.sin(a) * rr;
    const base = groundHeight(rr);
    const size = 0.1 + rand() * 0.26;
    const n = 18 + Math.floor(rand() * 30);
    for (let i = 0; i < n; i++) {
      const t = Math.pow(rand(), 0.55);
      const spread = size * (1 - t * 0.55);
      const ang = rand() * Math.PI * 2;
      points.push({
        p: [
          bx + Math.cos(ang) * spread * (0.4 + rand() * 0.6),
          base + t * size * 2.1,
          bz + Math.sin(ang) * spread * (0.4 + rand() * 0.6),
        ],
        camera: 0,
      });
    }
  }

  // Cameras circle the tower on the hill, looking slightly up at it.
  const center: Vec3 = [0, 0.66, 0];
  const cameras: HeroCamera[] = [];
  for (let i = 0; i < CAMERA_COUNT; i++) {
    const t = i / (CAMERA_COUNT - 1);
    const angle = Math.PI * 0.02 + t * Math.PI * 0.86;
    const radius = 2.5 + Math.sin(t * Math.PI) * 0.22;
    cameras.push({
      position: [
        Math.cos(angle) * radius,
        0.5 + Math.sin(t * Math.PI) * 0.22,
        Math.sin(angle) * radius,
      ],
      target: [0, 0.6, 0],
    });
  }

  // A point is registered by whichever camera is nearest in plan, so the cloud
  // fills in from one side to the other as cameras come online. The jitter keeps
  // it from looking like a hard wipe.
  for (const point of points) {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < cameras.length; i++) {
      const c = cameras[i].position;
      const d =
        (point.p[0] - c[0]) * (point.p[0] - c[0]) +
        (point.p[2] - c[2]) * (point.p[2] - c[2]);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    const jittered = best + (rand() < 0.22 ? (rand() < 0.5 ? -1 : 1) : 0);
    point.camera = Math.max(0, Math.min(cameras.length - 1, jittered));
  }

  // Correspondences between neighbouring views. Candidates are the masonry
  // points on the arc of wall both cameras can see; they are then spread over
  // the height of the tower so the rays fan across the facade instead of
  // bunching at one spot.
  const pairs: HeroPair[] = [];
  for (let i = 0; i < cameras.length - 1; i++) {
    const ca = cameras[i].position;
    const cb = cameras[i + 1].position;
    const mid = Math.atan2((ca[2] + cb[2]) / 2, (ca[0] + cb[0]) / 2);

    const candidates: number[] = [];
    for (let k = 0; k < points.length; k++) {
      const pt = points[k];
      if (pt.p[1] < 0.18 || pt.p[1] > WALL_H + 0.08) continue;
      let delta = Math.atan2(pt.p[2], pt.p[0]) - mid;
      while (delta > Math.PI) delta -= Math.PI * 2;
      while (delta < -Math.PI) delta += Math.PI * 2;
      if (Math.abs(delta) > 0.62) continue;
      candidates.push(k);
    }
    candidates.sort((x, y) => points[x].p[1] - points[y].p[1]);

    const shared: number[] = [];
    const want = 10;
    for (let n = 0; n < want && candidates.length; n++) {
      const lo = Math.floor((n / want) * candidates.length);
      const hi = Math.floor(((n + 1) / want) * candidates.length);
      shared.push(candidates[lo + Math.floor(rand() * Math.max(1, hi - lo))]);
    }
    pairs.push({ a: i, b: i + 1, shared, tint: i % ACCENT_COUNT });
  }

  return {
    id: "skansen-kronan",
    points,
    cameras,
    pairs,
    center,
    // Looks down the capture arc from behind and above it, so the frusta read as
    // an array of viewpoints around the tower rather than overlapping it.
    view: { azimuth: Math.PI * 0.29, elevation: 0.3, distance: 7.4 },
  };
}

export const skansenKronanScene: HeroScene = buildSkansenKronan();
