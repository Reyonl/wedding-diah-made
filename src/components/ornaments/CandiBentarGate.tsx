"use client";

import { motion, useReducedMotion } from "framer-motion";

interface GateProps {
  opened: boolean;
}

/**
 * Authentic Balinese Candi Bentar Split Temple Gate
 * Two mirrored monolithic leaves with stepped narrowing tiers, perfectly vertical inner edges.
 * Rendered with layered stone/brick course gradients, subtle feTurbulence volcanic noise,
 * inner shadow toward the central opening, carved patra center panels, and thin gold tier caps.
 * Under prefers-reduced-motion: opens with a pure fade rather than translateX.
 */
export function CandiBentarGate({ opened }: GateProps) {
  const prefersReduced = useReducedMotion();

  const transition = prefersReduced
    ? { duration: 0.8, ease: "easeOut" as const }
    : { duration: 1.1, ease: [0.77, 0, 0.18, 1] as [number, number, number, number] };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex justify-between overflow-hidden">
      {/* Left Leaf */}
      <motion.div
        className="h-full w-[30vw] md:w-[38vw] relative"
        initial={{ x: 0, opacity: 1 }}
        animate={
          prefersReduced
            ? { opacity: opened ? 0 : 1 }
            : { x: opened ? "-102%" : "0%" }
        }
        transition={transition}
      >
        <GateLeaf side="left" />
      </motion.div>

      {/* Right Leaf */}
      <motion.div
        className="h-full w-[30vw] md:w-[38vw] relative"
        initial={{ x: 0, opacity: 1 }}
        animate={
          prefersReduced
            ? { opacity: opened ? 0 : 1 }
            : { x: opened ? "102%" : "0%" }
        }
        transition={transition}
      >
        <GateLeaf side="right" />
      </motion.div>
    </div>
  );
}

function GateLeaf({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";

  return (
    <div
      className={`w-full h-full relative ${
        isLeft ? "" : "scale-x-[-1]"
      }`}
    >
      <svg
        viewBox="0 0 380 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle volcanic stone noise filter */}
          <filter id={`stone-noise-${side}`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="3"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="
                0 0 0 0 0.14
                0 0 0 0 0.08
                0 0 0 0 0.06
                0 0 0 0.15 0"
              result="coloredNoise"
            />
            <feComposite in="SourceGraphic" in2="coloredNoise" operator="over" />
          </filter>

          {/* Staggered brick course repeating pattern */}
          <pattern
            id={`brick-courses-${side}`}
            width="50"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            {/* Dark terracotta base */}
            <rect width="50" height="24" fill="#20100D" />
            {/* Top course bricks */}
            <rect x="1" y="1" width="48" height="10" fill="#2B1612" rx="1" />
            <line x1="0" y1="12" x2="50" y2="12" stroke="#140806" strokeWidth="1.2" />
            {/* Staggered bottom course bricks */}
            <rect x="1" y="13" width="23" height="10" fill="#261310" rx="1" />
            <rect x="26" y="13" width="23" height="10" fill="#2B1612" rx="1" />
            <line x1="25" y1="12" x2="25" y2="24" stroke="#140806" strokeWidth="1.2" />
          </pattern>

          {/* Inner shadow toward the vertical center gap (at x=380) */}
          <linearGradient id={`gap-shadow-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F0A08" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#0F0A08" stopOpacity="0" />
            <stop offset="100%" stopColor="#0F0A08" stopOpacity="0.65" />
          </linearGradient>

          {/* Vertical depth gradient */}
          <linearGradient id={`vertical-depth-${side}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#140A08" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#2A1612" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0F0A08" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/*
          Candi Bentar Architectural Geometry:
          Right edge (x=380) is the vertical gap facing the courtyard/couple.
          Left edge steps inward progressively across 5 grand tiers.
        */}
        <g filter={`url(#stone-noise-${side})`}>
          {/* Main stepped monolithic silhouette */}
          <path
            d="
              M 380 0
              L 380 1000
              L 20 1000
              L 20 860
              L 65 860
              L 65 720
              L 115 720
              L 115 560
              L 170 560
              L 170 410
              L 230 410
              L 230 260
              L 285 260
              L 285 130
              L 335 130
              L 350 40
              L 380 0
              Z
            "
            fill={`url(#brick-courses-${side})`}
            stroke="#120605"
            strokeWidth="2"
          />

          {/* Atmospheric shadows */}
          <path
            d="
              M 380 0 L 380 1000 L 20 1000 L 20 860 L 65 860 L 65 720
              L 115 720 L 115 560 L 170 560 L 170 410 L 230 410
              L 230 260 L 285 260 L 285 130 L 335 130 L 350 40 L 380 0 Z
            "
            fill={`url(#gap-shadow-${side})`}
          />
          <path
            d="
              M 380 0 L 380 1000 L 20 1000 L 20 860 L 65 860 L 65 720
              L 115 720 L 115 560 L 170 560 L 170 410 L 230 410
              L 230 260 L 285 260 L 285 130 L 335 130 L 350 40 L 380 0 Z
            "
            fill={`url(#vertical-depth-${side})`}
          />
        </g>

        {/* Tier Ledge Trim Lines: 1px light gold on top with soft dark shadow underneath */}
        {[
          { x1: 20, y: 860 },
          { x1: 65, y: 720 },
          { x1: 115, y: 560 },
          { x1: 170, y: 410 },
          { x1: 230, y: 260 },
          { x1: 285, y: 130 },
          { x1: 335, y: 40 },
        ].map((tier, i) => (
          <g key={i}>
            {/* Soft dark shadow underneath the ledge */}
            <line
              x1={tier.x1}
              y1={tier.y + 2.5}
              x2="380"
              y2={tier.y + 2.5}
              stroke="#080302"
              strokeWidth="3.5"
              opacity="0.8"
            />
            {/* 1px light gold line on top of ledge */}
            <line
              x1={tier.x1}
              y1={tier.y}
              x2="380"
              y2={tier.y}
              stroke="#D4A53A"
              strokeWidth="1.2"
              opacity="0.85"
            />
            {/* Delicate gold corner cap dot */}
            <circle
              cx={tier.x1 + 1}
              cy={tier.y}
              r="2.2"
              fill="#F2D27A"
            />
          </g>
        ))}

        {/* Centered Carved Patra Relief Panel on Middle Body */}
        <g opacity="0.82">
          {/* Panel frame */}
          <rect
            x="240"
            y="470"
            width="120"
            height="180"
            fill="#180A08"
            stroke="#D4A53A"
            strokeWidth="1"
            rx="3"
          />
          {/* Inner frame inset */}
          <rect
            x="245"
            y="475"
            width="110"
            height="170"
            fill="none"
            stroke="#9A6F1E"
            strokeWidth="0.8"
            strokeDasharray="4 2"
          />
          {/* Balinese Karang Bintulu / Patra Floral Carving Center */}
          <path
            d="
              M 300 510
              C 320 520, 335 550, 315 570
              C 295 590, 275 560, 290 540
              C 300 525, 312 535, 305 545
            "
            stroke="#D4A53A"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="
              M 300 610
              C 320 600, 335 570, 315 550
              C 295 530, 275 560, 290 580
              C 300 595, 312 585, 305 575
            "
            stroke="#D4A53A"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="300" cy="560" r="4" fill="#F2D27A" />
        </g>

        {/* Vertical Inner Gap Boundary Accent */}
        <line
          x1="379.5"
          y1="0"
          x2="379.5"
          y2="1000"
          stroke="#D4A53A"
          strokeWidth="0.8"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}