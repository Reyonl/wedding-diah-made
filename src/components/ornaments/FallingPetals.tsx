"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Frangipani } from "./Frangipani";

/**
 * Botanical Frangipani Petal Drift
 * Replaces generic shuriken-like star petals with real Balinese Frangipani flowers.
 * Rules: max 10 on desktop / 6 on mobile, slow gentle drift, transform-only CSS keyframes,
 * paused via IntersectionObserver when off-screen, completely disabled under prefers-reduced-motion.
 */
export function FallingPetals({ maxDesktop = 10, maxMobile = 6 }: { maxDesktop?: number; maxMobile?: number }) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // IntersectionObserver to pause animation when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = isMobile ? maxMobile : maxDesktop;

  // Deterministic petal distribution using golden ratio
  const petals = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const r1 = (i * 0.61803398875) % 1;
      const r2 = (i * 0.38196601125 + 0.15) % 1;
      const r3 = (i * 0.75487766625) % 1;
      return {
        left: `${Math.round(r1 * 90) + 5}%`,
        duration: 14 + r2 * 8, // Very slow, gentle drift (14s - 22s)
        delay: r3 * 10,
        size: 20 + Math.round(r3 * 10), // 20px - 30px realistic flower size
        initialRotate: Math.round(r1 * 360),
      };
    });
  }, []);

  if (prefersReduced) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {petals.slice(0, count).map((p, i) => (
        <span
          key={i}
          className="absolute -top-10 will-change-transform"
          style={{
            left: p.left,
            animation: isVisible
              ? `frangipani-fall ${p.duration}s linear infinite`
              : "none",
            animationDelay: `${p.delay}s`,
            animationPlayState: isVisible ? "running" : "paused",
          }}
        >
          <Frangipani
            size={p.size}
            style={{ transform: `rotate(${p.initialRotate}deg)` }}
            className="opacity-75"
          />
        </span>
      ))}

      <style jsx global>{`
        @keyframes frangipani-fall {
          0% {
            transform: translateY(-5vh) rotate(0deg) translateX(0);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(108vh) rotate(180deg) translateX(45px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

/** Legacy stub kept safe for phased migration */
export function FloatingOrbs() {
  return null;
}