"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Kelopak bunga jatuh (ambient). Deterministik agar tidak hydration-mismatch:
 * posisi/durasi dihitung dari index, bukan random runtime.
 */
export function FallingPetals({ count = 14 }: { count?: number }) {
  const prefersReduced = useReducedMotion();

  const petals = useMemo(() => {
    // Deret pseudo-acak deterministik (golden-ratio hash).
    return Array.from({ length: count }, (_, i) => {
      const r1 = (i * 0.61803398875) % 1;
      const r2 = (i * 0.38196601125 + 0.13) % 1;
      const r3 = (i * 0.75487766625) % 1;
      return {
        left: `${Math.round(r1 * 96) + 2}%`,
        duration: 9 + r2 * 7,
        delay: r3 * 9,
        size: 12 + Math.round(r3 * 12),
        gold: i % 2 === 1,
      };
    });
  }, [count]);

  if (prefersReduced) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((p, i) => (
        <span
          key={i}
          className="animate-petal absolute -top-6"
          style={{
            left: p.left,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={p.gold ? "text-goldlight" : "text-ivory"}
            style={{ opacity: p.gold ? 0.7 : 0.8 }}
          >
            <path d="M12 2C9 5 8 9 9 12C7 9 3 9 2 12C5 15 9 16 12 15C15 18 16 22 19 21C18 18 18 14 15 12C18 10 22 9 21 6C17 7 14 6 12 2Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** Bola lampu melayang lembut untuk aksen. */
export function FloatingOrbs() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute top-1/4 left-[12%] w-40 h-40 rounded-full bg-gold/10 blur-3xl"
        animate={{ y: [0, -28, 0], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[10%] w-52 h-52 rounded-full bg-crimson/10 blur-3xl"
        animate={{ y: [0, 26, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
    </div>
  );
}