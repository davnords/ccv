import { cn } from "@/lib/utils";

/**
 * Stand-in for imagery that has not been shot yet. Deterministic per `seed`,
 * so cards keep a stable look between renders. Swap for <Image /> when the
 * group's real photos and result figures are available.
 */
export function PlaceholderVisual({
  seed = 0,
  className,
  label,
}: {
  seed?: number;
  className?: string;
  label?: string;
}) {
  const hue = (seed * 47) % 360;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-lg border bg-muted",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(${hue} 45% 70% / 0.55), hsl(${
          (hue + 60) % 360
        } 45% 45% / 0.55))`,
      }}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <span className="text-xs font-medium uppercase tracking-widest text-foreground/50">
        {label ?? "Image"}
      </span>
    </div>
  );
}
