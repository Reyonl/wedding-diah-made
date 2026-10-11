"use client";

import { wedding } from "@/data/wedding";
import { asset } from "@/lib/asset";
import { Poleng } from "@/components/ornaments/Poleng";

/**
 * Dua Adat, Satu Janji Section
 * Ivory section with dark text, honoring both Minangkabau (Baralek) and Balinese (Pawiwahan) heritage.
 * Section background rhythm: 4 Dua Adat (ivory with faint songket texture, dark text, Poleng strip on top).
 */
export function DuaAdatSection() {
  const { photos } = wedding;

  return (
    <section id="dua-adat" className="relative bg-ivory text-ink overflow-hidden">
      {/* Balinese Poleng sacred checker strip along top boundary */}
      <Poleng />

      {/* Faint songket watermark texture background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(#1B0F0B 1px, transparent 1px), radial-gradient(#1B0F0B 1px, #F1E6CE 1px)`,
          backgroundSize: "32px 32px",
          backgroundPosition: "0 0, 16px 16px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-28">
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="heading-section text-ink font-semibold">
            Dua Adat, Satu Janji
          </h2>
        </div>

        {/* Two Cultural Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* 1. Minangkabau - Baralek */}
          <div className="flex flex-col text-center md:text-left p-6 md:p-8 rounded-2xl border border-ink/10 bg-white/40 shadow-sm">
            <span className="font-sans text-xs uppercase tracking-widest text-velvet font-semibold mb-2">
              Tradisi Pesisir Barat
            </span>
            <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-ink mb-4">
              Minangkabau — Baralek
            </h3>
            <p className="font-sans text-sm sm:text-base text-ink/80 leading-relaxed">
              Dalam adat Minang, pernikahan dirayakan bersama keluarga besar. Anak daro bersanding
              dengan marapulai, dihiasi suntiang dan kain songket.
            </p>
          </div>

          {/* 2. Bali - Pawiwahan */}
          <div className="flex flex-col text-center md:text-left p-6 md:p-8 rounded-2xl border border-ink/10 bg-white/40 shadow-sm">
            <span className="font-sans text-xs uppercase tracking-widest text-gold-deep font-semibold mb-2">
              Tradisi Pulau Dewata
            </span>
            <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-ink mb-4">
              Bali — Pawiwahan
            </h3>
            <p className="font-sans text-sm sm:text-base text-ink/80 leading-relaxed">
              Dalam tradisi Bali, pernikahan disebut pawiwahan, dihadiri keluarga besar dengan
              busana adat dan persembahan.
            </p>
          </div>
        </div>

        {/* Visual Centrepiece: Balinese Photo or Carved Temple Gate Silhouette */}
        <div className="max-w-md mx-auto mb-16 flex flex-col items-center">
          {photos.groomBaliPhoto ? (
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gold-deep/30 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(photos.groomBaliPhoto)}
                alt="I Made Ariana Putra dalam busana adat Bali"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            /* Carved SVG Candi Bentar Silhouette */
            <div className="w-full max-w-xs flex justify-center py-4" aria-hidden="true">
              <svg
                viewBox="0 0 200 120"
                className="w-48 h-28 text-ink/25"
                fill="currentColor"
              >
                {/* Left Candi Bentar Wing */}
                <path d="M 85 10 L 85 110 L 15 110 L 22 95 L 35 95 L 42 75 L 55 75 L 62 50 L 72 50 L 85 10 Z" />
                {/* Right Candi Bentar Wing */}
                <path d="M 115 10 L 115 110 L 185 110 L 178 95 L 165 95 L 158 75 L 145 75 L 138 50 L 128 50 L 115 10 Z" />
                {/* Stepped Base Platform */}
                <rect x="5" y="110" width="190" height="4" rx="1" />
              </svg>
            </div>
          )}
        </div>

        {/* Centred Philosophical Harmony Proverb */}
        <div className="text-center pt-4 border-t border-ink/10">
          <p className="font-cormorant text-xl sm:text-2xl italic text-ink font-light leading-relaxed">
            &ldquo;Di mana bumi dipijak, di situ langit dijunjung.&rdquo;
          </p>
          <span className="text-[11px] font-sans uppercase tracking-widest text-ink/50 mt-2 block">
            Penyatuan Dua Pusaka Budaya
          </span>
        </div>
      </div>
    </section>
  );
}
