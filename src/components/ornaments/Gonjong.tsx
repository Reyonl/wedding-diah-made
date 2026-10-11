import type { SVGProps } from "react";

/**
 * Minangkabau Gonjong Roof Silhouette
 * Hand-crafted cubic Bézier curves depicting the sacred 5-roof Rumah Gadang
 * (tanduk kerbau / buffalo horn gables), with the central peak tallest.
 * Solid fill with subtle architectural ridge accents.
 */
export function Gonjong({ className, fill = "currentColor", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1200 180"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`w-full block ${className ?? "h-16 md:h-24 text-night"}`}
      {...props}
    >
      {/*
        5-Tier Gonjong Silhouette:
        Peaks:
        - Outer Left Peak: (100, 36)
        - Inner Left Peak: (330, 22)
        - Center Peak (Tallest): (600, 8)
        - Inner Right Peak: (870, 22)
        - Outer Right Peak: (1100, 36)
      */}
      <path
        d="
          M 0 180
          L 1200 180
          L 1200 140
          C 1160 135, 1130 90, 1100 36
          C 1092 50, 1070 95, 1000 115
          C 940 105, 905 60, 870 22
          C 860 40, 825 90, 750 110
          C 680 95, 640 45, 600 8
          C 560 45, 520 95, 450 110
          C 375 90, 340 40, 330 22
          C 295 60, 260 105, 200 115
          C 130 95, 108 50, 100 36
          C 70 90, 40 135, 0 140
          Z
        "
        fill={fill}
      />
      {/* Decorative subtle roof ridge lines for authentic Minang architecture */}
      <path
        d="
          M 100 36 C 104 60, 130 110, 200 115
          M 330 22 C 336 50, 370 100, 450 110
          M 600 8  C 600 45, 640 95, 750 110
          M 870 22 C 864 50, 830 100, 750 110
          M 1100 36 C 1096 60, 1070 110, 1000 115
        "
        fill="none"
        stroke="#D4A53A"
        strokeWidth="1.2"
        opacity="0.45"
      />
      {/* Pinnacle spear finials (tonggak puncak gonjong) */}
      <circle cx="100" cy="34" r="2.5" fill="#D4A53A" opacity="0.8" />
      <circle cx="330" cy="20" r="3" fill="#D4A53A" opacity="0.8" />
      <circle cx="600" cy="6" r="3.5" fill="#D4A53A" opacity="0.9" />
      <circle cx="870" cy="20" r="3" fill="#D4A53A" opacity="0.8" />
      <circle cx="1100" cy="34" r="2.5" fill="#D4A53A" opacity="0.8" />
    </svg>
  );
}
