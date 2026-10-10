"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 44 },
  down: { y: -44 },
  left: { x: 44 },
  right: { x: -44 },
  none: {},
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  className,
  once = true,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const offset = offsets[direction];

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`text-center mb-14 md:mb-20 ${className ?? ""}`}>
      <Reveal>
        <p className="font-cormorant text-gold tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-2">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-ivory tracking-wide">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="w-24 h-1 gold-gradient-bg mx-auto mt-5 rounded-full" />
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.22}>
          <p className="text-xs md:text-sm text-ivory/60 mt-4 max-w-xl mx-auto font-sans tracking-wide">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Ornamen layangan/star kecil untuk aksen dekoratif. */
export function GoldStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="currentColor"
      className={className ?? "w-8 h-8 text-gold"}
      aria-hidden="true"
    >
      <path d="M20 2 C22 12 28 18 38 20 C28 22 22 28 20 38 C18 28 12 22 2 20 C12 18 18 12 20 2 Z" />
      <circle cx="20" cy="20" r="4" fill="#B3141F" />
    </svg>
  );
}