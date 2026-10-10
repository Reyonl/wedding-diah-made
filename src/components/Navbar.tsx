"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { wedding } from "@/lib/data";
import { useLenis } from "@/components/providers/SmoothScroll";

export function Navbar({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollTo } = useLenis();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
            scrolled
              ? "bg-night/90 backdrop-blur-md border-b border-gold/25"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
            <button onClick={() => go("#hero")} className="flex items-center gap-3 group text-left">
              <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center bg-maroon/50 group-hover:bg-gold/20 transition shrink-0">
                <span className="font-cinzel text-gold font-bold text-sm tracking-widest">
                  D&amp;M
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-gold tracking-widest text-xs uppercase">
                  Diah &amp; Made
                </span>
                <span className="text-[10px] text-ivory/60 tracking-wider">
                  28 November 2026
                </span>
              </div>
            </button>

            <nav className="hidden lg:flex items-center space-x-7 text-xs font-semibold uppercase tracking-widest text-ivory/80">
              {wedding.navLinks.slice(0, 5).map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="hover:text-gold transition-colors py-2 border-b-2 border-transparent hover:border-gold"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => go("#rsvp")}
                className="px-4 py-2 rounded-full border border-gold text-gold hover:bg-gold hover:text-night transition-all"
              >
                RSVP
              </button>
            </nav>

            <button
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden text-gold p-2"
              aria-label="Buka menu navigasi"
              aria-expanded={open}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <AnimatePresence>
            {open ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden overflow-hidden bg-night/95 border-b border-gold/30"
              >
                <div className="px-6 py-4 flex flex-col gap-1">
                  {wedding.navLinks.map((l) => (
                    <button
                      key={l.href}
                      onClick={() => go(l.href)}
                      className="text-left text-ivory/90 hover:text-gold py-2.5 text-xs uppercase tracking-widest border-b border-gold/10 last:border-0"
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Scroll progress bar */}
          <motion.div
            style={{ scaleX: progress }}
            className="h-[2px] origin-left gold-gradient-bg"
          />
        </motion.header>
      ) : null}
    </AnimatePresence>
  );
}