"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { wedding } from "@/lib/data";
import { asset } from "@/lib/asset";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

/**
 * Galeri dengan shared layoutId → transisi foto ke fullscreen sangat mulus.
 * LayoutGroup diperlukan agar layoutId matching lintas pohon.
 */
export function GallerySection() {
  const [active, setActive] = useState<number | null>(null);

  const open = (i: number) => setActive(i);
  const close = () => setActive(null);
  const prev = () => setActive((i) => (i === null ? i : (i + wedding.gallery.length - 1) % wedding.gallery.length));
  const next = () => setActive((i) => (i === null ? i : (i + 1) % wedding.gallery.length));

  // Keyboard & scroll lock saat lightbox terbuka
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  // Bento grid: item 1 wide (2 kolom), item 6 tall/wide layout disesuaikan.
  const itemClass = (i: number) => {
    if (i === 0) return "sm:col-span-2";
    if (i === 5) return "sm:col-span-2 lg:col-span-1";
    return "";
  };

  return (
    <section id="galeri" className="py-24 px-6 relative bg-surface border-y border-gold/20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Dokumentasi Cinta"
          title="Momen Kami"
          subtitle="Potret Kenangan Indah Pranikah Diah & Made • Klik foto untuk memperbesar"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wedding.gallery.map((item, i) => (
            <Reveal key={item.src} delay={(i % 3) * 0.08}>
              <motion.button
                layoutId={`gallery-${i}`}
                onClick={() => open(i)}
                whileHover="hover"
                className={`relative group overflow-hidden rounded-2xl border-2 border-gold/50 h-80 md:h-96 shadow-xl cursor-pointer hover:border-gold transition-colors duration-500 w-full ${itemClass(i)}`}
                aria-label={`Perbesar: ${item.title}`}
              >
                <motion.img
                  src={asset(item.src)}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  variants={{ hover: { scale: 1.06 } }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-night/85 border border-gold text-gold flex items-center justify-center shadow-2xl">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                  <span className="font-cormorant text-base md:text-lg text-gold font-bold italic text-left leading-snug">
                    {item.title}
                  </span>
                  <span className="text-[11px] px-3 py-1 rounded-full bg-night/80 border border-gold/40 text-gold flex items-center gap-1.5 shrink-0">
                    <ZoomIn className="w-3.5 h-3.5" />
                    Perbesar
                  </span>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox — shared layoutId memastikan mulus */}
      <AnimatePresence>
        {active !== null ? (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[94vh] bg-night/95 rounded-3xl border-2 border-gold/70 shadow-[0_0_50px_rgba(212,165,58,0.35)] overflow-hidden"
              initial={{ scale: 0.94, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <div className="w-full h-1.5 songket-border shrink-0" />
              {/* Header */}
              <div className="w-full px-5 py-3.5 flex items-center justify-between border-b border-gold/25 bg-surface/80 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                  <span className="font-cinzel text-xs tracking-widest uppercase text-gold font-bold">
                    Galeri Dokumentasi Cinta
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-sans text-ivory/75 px-3 py-1 rounded-full bg-night border border-gold/30">
                    Foto {active + 1} dari {wedding.gallery.length}
                  </span>
                  <button
                    onClick={close}
                    className="w-9 h-9 rounded-full border border-gold/60 bg-night hover:bg-gold hover:text-night text-gold flex items-center justify-center transition-all duration-200"
                    aria-label="Tutup galeri"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main display */}
              <div className="relative w-full flex-1 flex items-center justify-center p-3 sm:p-5 overflow-hidden min-h-[280px] max-h-[62vh] bg-night">
                <motion.img
                  key={active}
                  src={asset(wedding.gallery[active].src)}
                  alt={wedding.gallery[active].title}
                  className="max-h-[58vh] sm:max-h-[60vh] max-w-full object-contain rounded-xl border border-gold/30 shadow-2xl"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />

                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-full bg-surface/85 border border-gold/70 text-gold hover:bg-gold hover:text-night flex items-center justify-center transition-all duration-200 shadow-xl hover:scale-105 active:scale-95"
                  aria-label="Foto sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-full bg-surface/85 border border-gold/70 text-gold hover:bg-gold hover:text-night flex items-center justify-center transition-all duration-200 shadow-xl hover:scale-105 active:scale-95"
                  aria-label="Foto selanjutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Caption */}
              <div className="w-full px-6 py-4 border-t border-gold/25 bg-surface/90 text-center shrink-0">
                <h4 className="font-cormorant text-xl sm:text-2xl font-bold text-goldlight italic mb-1">
                  {wedding.gallery[active].title}
                </h4>
                <p className="text-xs sm:text-sm text-ivory/75 max-w-2xl mx-auto leading-relaxed font-sans">
                  {wedding.gallery[active].desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}