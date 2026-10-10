"use client";

import { Heart } from "lucide-react";
import { wedding } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export function Footer() {
  return (
    <footer className="py-20 px-6 relative bg-night border-t border-gold/30 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <Reveal>
          <svg className="w-16 h-16 text-gold mb-6" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
            <path
              d="M50 5 L65 30 L95 35 L70 55 L80 85 L50 70 L20 85 L30 55 L5 35 L35 30 Z"
              fill="#5A0F14"
              stroke="#D4A53A"
              strokeWidth="2"
            />
            <circle cx="50" cy="50" r="6" fill="#D4A53A" />
          </svg>
        </Reveal>

        <Reveal delay={0.1}>
          <blockquote className="font-cormorant text-xl md:text-2xl italic text-ivory/90 max-w-xl mx-auto mb-6">
            &ldquo;Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.&rdquo;
          </blockquote>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="text-xs uppercase tracking-widest text-ivory/50 mb-3">
            Keluarga Besar Mempelai
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <h3 className="font-cinzel text-3xl md:text-4xl font-bold gold-gradient-text tracking-widest mb-4">
            Diah &amp; Made
          </h3>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="inline-block px-6 py-2 rounded-full border border-gold/50 bg-charcoal/80 text-gold font-sans font-bold text-sm tracking-widest uppercase mb-8 shadow">
            {wedding.hashtag}
          </div>
        </Reveal>

        <Reveal delay={0.36}>
          <div className="flex items-center gap-4 mb-8">
            <a
              href={wedding.couple.bride.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 text-gold/80 hover:text-gold hover:border-gold text-xs transition"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              {wedding.couple.bride.instagram}
            </a>
            <a
              href={wedding.couple.groom.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 text-gold/80 hover:text-gold hover:border-gold text-xs transition"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              {wedding.couple.groom.instagram}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.42}>
          <div className="w-full pt-8 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ivory/50 gap-2">
            <span>
              &copy; 2026 The Wedding of Diah &amp; Made. All rights reserved.
            </span>
            <span className="flex items-center gap-1.5">
              Dibuat dengan <Heart className="w-3 h-3 text-crimson fill-crimson" /> untuk Diah &amp; Made
            </span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}