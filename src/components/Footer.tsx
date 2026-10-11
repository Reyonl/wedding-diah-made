"use client";

import { wedding } from "@/data/wedding";
import { Gonjong } from "@/components/ornaments/Gonjong";

/**
 * Footer Section (Night Background with Gonjong Silhouette)
 * Closes the invitation with Minangkabau architectural Gonjong curves,
 * sincere gratitude statement, hashtag, and subtle copyright credit.
 */
export function Footer() {
  return (
    <footer className="relative bg-night border-t border-gold/15 overflow-hidden text-center">
      {/* Minangkabau Gonjong Silhouette along the top of Footer */}
      <div className="w-full flex justify-center -mb-2">
        <Gonjong className="w-full h-16 sm:h-24 md:h-28 text-velvet-dark" fill="currentColor" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-12 pb-16 flex flex-col items-center">
        {/* Names */}
        <h3 className="font-cormorant text-4xl sm:text-5xl font-semibold text-ivory mb-3">
          Diah <span className="italic font-normal text-gold">&amp;</span> Made
        </h3>

        {/* Hashtag */}
        <p className="font-sans text-xs tracking-widest uppercase text-gold font-semibold mb-6">
          {wedding.hashtag}
        </p>

        {/* Gratitude statement */}
        <p className="body-editorial text-xs sm:text-sm text-ivory/80 leading-relaxed max-w-xl mx-auto mb-10">
          Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i, kami ucapkan terima kasih.
          Kami yang berbahagia, Diah &amp; Made beserta keluarga.
        </p>

        {/* Small credit line */}
        <div className="w-full pt-8 border-t border-gold/15 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-ivory/40 gap-2">
          <span>
            &copy; 2026 The Wedding of Diah &amp; Made. All rights reserved.
          </span>
          <span>
            Dirancang dengan penuh cinta dan doa restu
          </span>
        </div>
      </div>
    </footer>
  );
}