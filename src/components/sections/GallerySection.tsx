"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { wedding } from "@/data/wedding";
import { asset } from "@/lib/asset";

/**
 * Gallery Section (Velvet-Dark Background Rhythm)
 * Bento grid on desktop, horizontal scroll-snap on mobile, lazy loading.
 * Lightbox with Esc and arrow keys, focus trap, aria-modal, and focus return.
 */
export function GallerySection() {
  const [active, setActive] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const gallery = wedding.photos.gallery;

  const open = (i: number) => {
    setDirection(0);
    setActive(i);
  };

  const close = () => {
    const prevIndex = active;
    setActive(null);
    // Accessibility: Return focus to the thumbnail that triggered the lightbox
    if (prevIndex !== null && triggerRefs.current[prevIndex]) {
      setTimeout(() => triggerRefs.current[prevIndex]?.focus(), 50);
    }
  };

  const prev = () => {
    setDirection(-1);
    setActive((i) => (i === null ? i : (i + gallery.length - 1) % gallery.length));
  };

  const next = () => {
    setDirection(1);
    setActive((i) => (i === null ? i : (i + 1) % gallery.length));
  };

  // Keyboard navigation & scroll locking
  useEffect(() => {
    if (active === null) return;

    // Focus close button on open
    setTimeout(() => closeButtonRef.current?.focus(), 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        const prevIndex = active;
        setActive(null);
        if (prevIndex !== null && triggerRefs.current[prevIndex]) {
          setTimeout(() => triggerRefs.current[prevIndex]?.focus(), 50);
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setDirection(-1);
        setActive((i) => (i === null ? i : (i + gallery.length - 1) % gallery.length));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setDirection(1);
        setActive((i) => (i === null ? i : (i + 1) % gallery.length));
      }
    };

    window.addEventListener("keydown", onKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [active, gallery.length]);

  // Mixed bento grid column spans for desktop
  const getBentoSpan = (i: number) => {
    if (i === 0) return "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto";
    if (i === 4) return "md:col-span-2 aspect-[16/9]";
    return "aspect-[4/5]";
  };

  return (
    <section id="galeri" className="py-28 px-6 relative bg-velvet-dark overflow-hidden border-t border-gold/15">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="heading-section text-ivory mb-3">
            Dokumentasi Cinta
          </h2>
          <p className="font-sans text-sm text-ivory/70 max-w-lg mx-auto">
            Potret kebersamaan dan kenangan indah pranikah Diah &amp; Made
          </p>
        </div>

        {/* 1. Mobile Layout: Horizontal Scroll-Snap */}
        <div className="sm:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-6 px-6 scrollbar-none">
          {gallery.map((item, i) => (
            <button
              key={item.src}
              ref={(el) => { triggerRefs.current[i] = el; }}
              onClick={() => open(i)}
              className="snap-center shrink-0 w-[80vw] max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden border border-gold/40 relative shadow-lg cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={`Lihat foto ${item.caption}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(item.src)}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-transparent flex items-end p-4">
                <span className="font-cormorant text-base text-gold-light font-semibold">
                  {item.caption}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* 2. Desktop Layout: Bento Grid with Mixed Spans */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-5">
          {gallery.map((item, i) => (
            <button
              key={item.src}
              ref={(el) => { triggerRefs.current[i] = el; }}
              onClick={() => open(i)}
              className={`group relative overflow-hidden rounded-2xl border border-gold/30 hover:border-gold shadow-md cursor-pointer transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold ${getBentoSpan(i)}`}
              aria-label={`Lihat foto ${item.caption}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(item.src)}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Dark subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                <span className="font-cormorant text-lg text-ivory group-hover:text-gold-light font-semibold transition-colors">
                  {item.caption}
                </span>
                <span className="text-xs font-sans text-gold/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  Perbesar
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Lightbox Modal */}
      <AnimatePresence>
        {active !== null ? (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-night/95 backdrop-blur-md p-4 sm:p-6"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Galeri: ${gallery[active].caption}`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[92vh] bg-night rounded-2xl border border-gold/40 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="px-5 py-3.5 border-b border-gold/20 flex items-center justify-between bg-surface/80">
                <span className="font-cormorant text-base text-gold font-semibold">
                  {gallery[active].caption}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-sans text-ivory/60">
                    {active + 1} / {gallery.length}
                  </span>
                  <button
                    ref={closeButtonRef}
                    onClick={close}
                    className="p-1.5 rounded-full hover:bg-white/10 text-gold transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-gold"
                    aria-label="Tutup galeri"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Image Display */}
              <div className="relative flex-1 flex items-center justify-center p-4 bg-black/40 min-h-[300px] max-h-[68vh] overflow-hidden">
                <AnimatePresence mode="popLayout" custom={direction}>
                  <motion.img
                    key={active}
                    src={asset(gallery[active].src)}
                    alt={gallery[active].alt}
                    className="max-h-[62vh] max-w-full object-contain rounded-lg"
                    initial={{ opacity: 0, x: direction * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -60 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-3 sm:left-5 z-20 p-2.5 rounded-full bg-night/80 border border-gold/50 text-gold hover:bg-gold hover:text-night transition-colors cursor-pointer"
                  aria-label="Foto sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-3 sm:right-5 z-20 p-2.5 rounded-full bg-night/80 border border-gold/50 text-gold hover:bg-gold hover:text-night transition-colors cursor-pointer"
                  aria-label="Foto berikutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Caption */}
              <div className="px-5 py-3 border-t border-gold/20 text-center bg-surface/80">
                <p className="font-sans text-xs text-ivory/75">
                  {gallery[active].alt}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}