import type { SVGProps } from "react";

export type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface PatraCornerProps extends SVGProps<SVGSVGElement> {
  position?: CornerPosition;
  size?: number | string;
}

/**
 * Balinese Patra Carved Scroll Corner (Patra Punggel)
 * Traditional Balinese floral and leaf spiral carving used to ornament
 * the corners of architectural arch photo frames.
 * Supports all 4 corners via mirroring.
 */
export function PatraCorner({
  position = "top-left",
  size = 56,
  className,
  ...props
}: PatraCornerProps) {
  const transform =
    position === "top-right"
      ? "scale(-1, 1)"
      : position === "bottom-left"
        ? "scale(1, -1)"
        : position === "bottom-right"
          ? "scale(-1, -1)"
          : undefined;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none ${className ?? ""}`}
      style={transform ? { transform, transformOrigin: "center" } : undefined}
      {...props}
    >
      {/* Outer corner L-border guide */}
      <path
        d="M 2 32 L 2 2 L 32 2"
        stroke="#D4A53A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Primary floral scroll curl (Patra Punggel spiral) */}
      <path
        d="
          M 4 4
          C 14 4, 24 8, 28 16
          C 32 24, 26 32, 18 30
          C 12 28, 10 22, 16 16
          C 20 12, 26 14, 24 18
        "
        stroke="#F2D27A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Secondary accent leaf (lung-lungan motif) */}
      <path
        d="
          M 4 14
          C 8 18, 16 20, 20 28
          C 22 34, 18 42, 12 40
          C 6 38, 6 30, 10 24
        "
        stroke="#D4A53A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Outer flourish sweeping to the right */}
      <path
        d="
          M 14 4
          C 18 8, 20 16, 28 20
          C 34 22, 42 18, 40 12
          C 38 6, 30 6, 24 10
        "
        stroke="#D4A53A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Tiny seed jewel in corner root */}
      <circle cx="8" cy="8" r="2.2" fill="#F2D27A" />
      <circle cx="8" cy="8" r="3.6" stroke="#9A6F1E" strokeWidth="0.8" />
    </svg>
  );
}
