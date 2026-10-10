"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

type LenisContextValue = {
  lenis: Lenis | null;
  /** True until the invitation gate has been opened. */
  locked: boolean;
  setLocked: (v: boolean) => void;
  scrollTo: (target: string | number) => void;
};

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  locked: true,
  setLocked: () => {},
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    // Respect reduced-motion: skip smooth scrolling entirely.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    setLenis(instance);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (locked) {
      lenis.stop();
      document.documentElement.classList.add("lenis-stopped");
    } else {
      lenis.start();
      document.documentElement.classList.remove("lenis-stopped");
    }
  }, [lenis, locked]);

  const scrollTo = (target: string | number) => {
    if (lenis) {
      lenis.scrollTo(target, { offset: -72 });
      return;
    }
    if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <LenisContext.Provider value={{ lenis, locked, setLocked, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}