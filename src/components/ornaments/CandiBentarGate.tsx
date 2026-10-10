"use client";

import { motion } from "framer-motion";

/**
 * Candi Bentar — gerbang candi terbelah (khas Bali).
 * Dua panel kiri/kanan, masing-masing dengan ukiran & relief.
 * Menerima `opened` untuk menggerakkan panel ke luar layar dengan spring.
 */
export function CandiBentarGate({ opened }: { opened: boolean }) {
  const panelTransition = {
    type: "spring" as const,
    stiffness: 42,
    damping: 17,
    mass: 1.1,
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex justify-between overflow-hidden">
      <motion.div
        className="h-full w-[46%] sm:w-[38%] lg:w-[30%]"
        initial={{ x: 0 }}
        animate={{ x: opened ? "-102%" : 0 }}
        transition={panelTransition}
      >
        <GatePanel side="left" />
      </motion.div>
      <motion.div
        className="h-full w-[46%] sm:w-[38%] lg:w-[30%]"
        initial={{ x: 0 }}
        animate={{ x: opened ? "102%" : 0 }}
        transition={panelTransition}
      >
        <GatePanel side="right" />
      </motion.div>
    </div>
  );
}

function GatePanel({ side }: { side: "left" | "right" }) {
  // Path yang menyerupai candi bentar: badan bertingkat + puncak meruncing.
  const d =
    side === "left"
      ? "M280 40 L280 800 L20 800 L30 720 L80 720 L90 640 L50 640 L60 560 L110 560 L120 470 L70 470 L80 390 L130 390 L140 300 L90 300 L110 200 L160 200 L170 120 L220 120 L230 50 Z"
      : "M20 40 L20 800 L280 800 L270 720 L220 720 L210 640 L250 640 L240 560 L190 560 L180 470 L230 470 L220 390 L170 390 L160 300 L210 300 L190 200 L140 200 L130 120 L80 120 L70 50 Z";

  const decoration =
    side === "left"
      ? {
          lines: "M260 70 L260 780 M240 100 L240 760 M200 140 L200 760 M150 220 L150 760",
          c1: [200, 280],
          c2: [220, 450],
        }
      : {
          lines: "M40 70 L40 780 M60 100 L60 760 M100 140 L100 760 M150 220 L150 760",
          c1: [100, 280],
          c2: [80, 450],
        };

  return (
    <svg
      viewBox="0 0 300 800"
      preserveAspectRatio="none"
      className="w-full h-full text-gold/75 drop-shadow-[0_0_18px_rgba(212,165,58,0.35)]"
      aria-hidden="true"
    >
      <path d={d} fill="#18110E" stroke="#D4A53A" strokeWidth="3" />
      <path
        d={decoration.lines}
        stroke="#F2C94C"
        strokeWidth="1.5"
        strokeDasharray="6,4"
        fill="none"
      />
      <circle
        cx={decoration.c1[0]}
        cy={decoration.c1[1]}
        r="14"
        fill="#5A0F14"
        stroke="#D4A53A"
        strokeWidth="2"
      />
      <circle
        cx={decoration.c2[0]}
        cy={decoration.c2[1]}
        r="18"
        fill="#5A0F14"
        stroke="#D4A53A"
        strokeWidth="2"
      />
    </svg>
  );
}

/** Siluet atap gonjong (rumah gadang Minangkabau) sebagai pembatas bawah. */
export function GonjongRoof({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      fill="currentColor"
      className={className ?? "w-full h-14 md:h-20 text-night"}
      aria-hidden="true"
    >
      <path d="M0,120 L1440,120 L1440,90 Q1360,10 1310,2 L1300,30 Q1220,10 1170,2 L1160,30 Q1080,10 1030,2 L1020,30 Q940,10 890,2 L880,30 Q800,10 750,2 L740,30 Q660,10 610,2 L600,30 Q520,10 470,2 L460,30 Q380,10 330,2 L320,30 Q240,10 190,2 L180,30 Q100,10 50,2 L40,30 L0,90 Z" />
    </svg>
  );
}