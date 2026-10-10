"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function WelcomeSection() {
  return (
    <section id="welcome" className="py-24 px-6 relative bg-night">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-8">
          {["", "scale-x-[-1]"].map((flip, i) => (
            <motion.svg
              key={i}
              className={`w-10 h-10 md:w-16 md:h-16 text-gold drop-shadow ${flip}`}
              viewBox="0 0 100 100"
              aria-hidden="true"
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M10 50 C 30 20, 70 20, 90 50 C 70 80, 30 80, 10 50 Z"
                fill="none"
                stroke="#D4A53A"
                strokeWidth="2"
              />
              <path
                d="M30 50 C 40 30, 60 30, 70 50 C 60 70, 40 70, 30 50 Z"
                fill="#5A0F14"
                stroke="#F2C94C"
                strokeWidth="1.5"
              />
              <circle cx="50" cy="50" r="5" fill="#D4A53A" />
            </motion.svg>
          ))}
        </div>

        <Reveal>
          <span className="font-cormorant text-xl md:text-2xl tracking-[0.25em] uppercase text-goldlight font-bold block mb-8">
            Ungkapan Syukur
          </span>
        </Reveal>

        <Reveal delay={0.12}>
          <blockquote className="font-cormorant text-2xl sm:text-3xl md:text-4xl italic text-ivory font-light leading-relaxed mb-6">
            &ldquo;Dua adat pusaka nan mulia, dua hati yang bersatu dalam ikatan suci
            pernikahan, melangkah bersama dengan restu semesta menuju lembaran baru penuh
            kasih, keberkahan, dan kebahagiaan abadi.&rdquo;
          </blockquote>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="font-sans text-xs md:text-sm tracking-wider text-ivory/60 max-w-xl mx-auto">
            Dengan penuh rasa hormat dan kerendahan hati, kami bermaksud memohon kehadiran
            serta doa restu Bapak/Ibu/Saudara/i sekalian dalam perayaan penyatuan cinta kami.
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="mt-8 flex items-center justify-center">
            <span className="w-12 h-[1px] bg-gold/50" />
            <span className="mx-3 text-gold text-sm font-cinzel">✦</span>
            <span className="w-12 h-[1px] bg-gold/50" />
          </div>
        </Reveal>

        <Reveal delay={0.34}>
          <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-ivory/40">
            {wedding.hashtag}
          </p>
        </Reveal>
      </div>
    </section>
  );
}