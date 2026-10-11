import type { SVGProps } from "react";

interface FrangipaniProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * Balinese Frangipani (Bunga Kamboja / Bunga Jepun)
 * 5-petal sacred flower with soft ivory petals (#FFFDF7) and a glowing
 * yellow/gold gradient center (#F9C846). Pure SVG, realistic botanical form.
 */
export function Frangipani({ size = 32, className, ...props }: FrangipaniProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`inline-block ${className ?? ""}`}
      {...props}
    >
      <defs>
        {/* Soft yellow heart gradient */}
        <radialGradient
          id="frangipani-center"
          cx="50%"
          cy="50%"
          r="48%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#E69500" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#F9C846" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#FFF2A8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFFDF7" stopOpacity="0" />
        </radialGradient>

        {/* Petal subtle gradient for soft realistic curvature */}
        <linearGradient id="petal-shading" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#F5EFE0" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>

        {/* Reusable single plumeria petal */}
        <path
          id="frangipani-petal"
          d="
            M 50 50
            C 44 40, 36 28, 42 12
            C 46 4, 58 4, 62 14
            C 66 26, 58 42, 50 50
            Z
          "
          fill="url(#petal-shading)"
          stroke="#EAE0CE"
          strokeWidth="0.6"
        />
      </defs>

      {/* 5 Petals rotated at 0, 72, 144, 216, 288 degrees */}
      <g filter="drop-shadow(0 2px 3px rgba(0,0,0,0.18))">
        <use href="#frangipani-petal" transform="rotate(0 50 50)" />
        <use href="#frangipani-petal" transform="rotate(72 50 50)" />
        <use href="#frangipani-petal" transform="rotate(144 50 50)" />
        <use href="#frangipani-petal" transform="rotate(216 50 50)" />
        <use href="#frangipani-petal" transform="rotate(288 50 50)" />

        {/* Radiant yellow center overlay */}
        <circle cx="50" cy="50" r="22" fill="url(#frangipani-center)" />
        {/* Core pistil dot */}
        <circle cx="50" cy="50" r="2.8" fill="#B36B00" opacity="0.8" />
      </g>
    </svg>
  );
}
