import type { SVGProps } from "react";

/**
 * Balinese Poleng Pattern Strip
 * Traditional checkerboard pattern with sacred black (#14100E), grey (#8A8680),
 * and white/ivory (#F4F0E6) squares (16px size) symbolizing cosmic balance (Rwa Bhineda).
 * Pure SVG, scalable, reusable as a section divider.
 */
export function Poleng({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className ?? ""}`}>
      <svg
        width="100%"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="block w-full h-4"
        {...props}
      >
        <defs>
          <pattern
            id="poleng-pattern"
            width="32"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            {/* Tile 1: 16x16 black */}
            <rect x="0" y="0" width="16" height="16" fill="#14100E" />
            {/* Tile 2: 16x16 white/ivory */}
            <rect x="16" y="0" width="16" height="16" fill="#F4F0E6" />
            {/* Soft inner texture lines for woven fabric realism */}
            <line
              x1="0"
              y1="8"
              x2="32"
              y2="8"
              stroke="#8A8680"
              strokeWidth="0.5"
              opacity="0.3"
            />
            <line
              x1="8"
              y1="0"
              x2="8"
              y2="16"
              stroke="#8A8680"
              strokeWidth="0.5"
              opacity="0.3"
            />
            <line
              x1="24"
              y1="0"
              x2="24"
              y2="16"
              stroke="#8A8680"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="16" fill="url(#poleng-pattern)" />
      </svg>
    </div>
  );
}
