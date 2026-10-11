import type { SVGProps } from "react";

/**
 * Minangkabau Songket Strip Component
 * Crimson ground (#5C0E18), repeating gold pucuk-rebung (bamboo shoot triangle) motif,
 * thin black border, 28px high. Replaces the generic dashed stripe.
 */
export function SongketStrip({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className ?? ""}`}>
      <svg
        width="100%"
        height="28"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="block w-full h-7"
        {...props}
      >
        <defs>
          <pattern
            id="songket-pucuk-rebung"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            {/* Crimson ground */}
            <rect width="28" height="28" fill="#5C0E18" />

            {/* Top & bottom subtle gold weave borders */}
            <line x1="0" y1="2" x2="28" y2="2" stroke="#D4A53A" strokeWidth="0.8" opacity="0.6" />
            <line x1="0" y1="26" x2="28" y2="26" stroke="#D4A53A" strokeWidth="0.8" opacity="0.6" />

            {/* Pucuk Rebung triangle motif (Minang geometric chevron) */}
            <polygon
              points="14,4 26,24 2,24"
              fill="#D4A53A"
              opacity="0.9"
            />
            {/* Inner layered triangle for woven depth */}
            <polygon
              points="14,9 22,23 6,23"
              fill="#5C0E18"
            />
            <polygon
              points="14,12 19,22 9,22"
              fill="#F2D27A"
            />

            {/* Flanking diamond diamonds */}
            <polygon
              points="0,14 2,12 4,14 2,16"
              fill="#F2D27A"
              opacity="0.75"
            />
            <polygon
              points="28,14 26,12 24,14 26,16"
              fill="#F2D27A"
              opacity="0.75"
            />
          </pattern>
        </defs>

        {/* Top black border */}
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="#0F0A08" strokeWidth="1" />
        {/* Repeating songket band */}
        <rect x="0" y="1" width="100%" height="26" fill="url(#songket-pucuk-rebung)" />
        {/* Bottom black border */}
        <line x1="0" y1="27.5" x2="100%" y2="27.5" stroke="#0F0A08" strokeWidth="1" />
      </svg>
    </div>
  );
}
