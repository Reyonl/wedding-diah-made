"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { wedding } from "@/data/wedding";
import { useLenis } from "@/components/providers/SmoothScroll";

export function Navbar({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollTo } = useLenis();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleNav = (href: string) => {
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
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            scrolled
              ? "bg-night/95 backdrop-blur-md border-b border-gold/20 shadow-md"
              : "bg-gradient-to-b from-night/80 to-transparent"
          }`}
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-8 h-18 flex items-center justify-between">
            {/* Brand Logo "D&M" in Cormorant Garamond */}
            <button
              onClick={() => handleNav("#hero")}
              className="flex items-center gap-3.5 text-left group cursor-pointer focus-visible:rounded-lg"
              aria-label="Kembali ke atas"
            >
              <div className="w-10 h-10 rounded-full border border-gold/60 flex items-center justify-center bg-velvet/60 group-hover:border-gold transition-colors shrink-0">
                <span className="font-cormorant text-gold font-semibold text-lg italic leading-none">
                  D&amp;M
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-cormorant text-ivory text-base font-semibold leading-tight group-hover:text-gold transition-colors">
                  Diah &amp; Made
                </span>
                <span className="text-[11px] text-ivory/60 font-sans tracking-normal leading-tight">
                  28 November 2026
                </span>
              </div>
            </button>

            {/* Desktop Navigation: Sentence case, no tracked-out all-caps */}
            <nav
              className="hidden lg:flex items-center space-x-7 text-sm font-sans font-medium text-ivory/80"
              aria-label="Navigasi Utama"
            >
              {wedding.navLinks.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className={`cursor-pointer transition-colors hover:text-gold ${
                    item.href === "#rsvp"
                      ? "px-5 py-2 rounded-full border border-gold text-gold hover:bg-gold hover:text-night transition-all font-semibold"
                      : "py-1.5 border-b border-transparent hover:border-gold/60"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="lg:hidden text-gold p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={open}
              aria-controls="mobile-nav-menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Drawer Menu */}
          <AnimatePresence>
            {open ? (
              <motion.div
                id="mobile-nav-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden overflow-hidden bg-night/98 border-b border-gold/25"
              >
                <div className="px-6 py-5 flex flex-col gap-2">
                  {wedding.navLinks.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNav(item.href)}
                      className={`text-left py-3 text-sm font-sans transition-colors cursor-pointer border-b border-gold/10 last:border-0 ${
                        item.href === "#rsvp"
                          ? "text-gold font-semibold"
                          : "text-ivory/90 hover:text-gold"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Scroll progress bar in gold */}
          <motion.div
            style={{ scaleX: progress }}
            className="h-[1.5px] origin-left bg-gradient-to-r from-gold to-gold-light"
          />
        </motion.header>
      ) : null}
    </AnimatePresence>
  );
}