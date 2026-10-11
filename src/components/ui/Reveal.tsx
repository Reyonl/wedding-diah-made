"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
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
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Editorial Studio Section Heading
 * Pure, calm typography: Cormorant Garamond heading, sentence case,
 * optional subtle subtitle. NO eyebrow labels. NO gold underline bars.
 */
export function SectionHeading({
  title,
  subtitle,
  className,
  ...rest
}: {
  title: ReactNode;
  subtitle?: string;
  className?: string;
  eyebrow?: string;
}) {
  void rest;
  return (
    <div className={`text-center mb-12 md:mb-16 ${className ?? ""}`}>
      <h2 className="heading-section text-ivory tracking-normal">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-sm md:text-base text-ivory/70 mt-3 max-w-xl mx-auto font-sans leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/** Legacy ornament stub kept safe for phased migration */
export function GoldStar(props?: { className?: string }) {
  void props;
  return null;
}