"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/data";
import { asset } from "@/lib/asset";
import { Reveal, SectionHeading, GoldStar } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

function CoupleCard({
  person,
  isBride,
  delay,
}: {
  person: (typeof wedding.couple)["bride"];
  isBride: boolean;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="lg:col-span-5">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="relative flex flex-col items-center text-center p-8 rounded-3xl bg-night/85 border border-gold/40 overflow-hidden group hover:border-gold transition duration-500 gold-box-shadow"
      >
        {/* Bingkai foto lengkung (tradisi galeri) */}
        <div className="relative w-56 h-72 md:w-60 md:h-80 mb-6 p-2 rounded-t-[7rem] rounded-b-xl border-2 border-gold bg-gradient-to-b from-maroon/60 to-charcoal shadow-2xl overflow-hidden">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
            <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" />
            </svg>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(person.photo)}
            alt={person.fullName}
            className="w-full h-full object-cover object-top rounded-t-[6.5rem] rounded-b-lg group-hover:scale-105 transition duration-700"
          />
        </div>

        <span className="font-vibes text-3xl text-gold mb-1">
          {isBride ? "Mempelai Wanita" : "Mempelai Pria"}
        </span>
        <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-ivory mb-2">
          {person.fullName}
        </h3>
        <p className="text-xs text-ivory/80 leading-relaxed font-sans max-w-sm mb-4">
          {person.parents}
        </p>
        <p className="text-[11px] text-ivory/50 tracking-wider uppercase mb-5">
          {person.culture}
        </p>

        <a
          href={person.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold/60 bg-surface hover:bg-gold hover:text-night text-gold text-xs font-semibold tracking-wider transition-all duration-300 shadow"
        >
          <InstagramIcon className="w-4 h-4" />
          <span>{person.instagram}</span>
        </a>

        <div className="absolute bottom-0 left-0 right-0 h-2 songket-border" />
      </motion.div>
    </Reveal>
  );
}

export function CoupleSection() {
  const { bride, groom } = wedding.couple;
  return (
    <section id="mempelai" className="py-24 px-6 relative bg-surface border-y border-gold/20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Kedua Mempelai"
          title={
            <span className="gold-gradient-text">Sang Mempelai</span>
          }
          subtitle="Harmonisasi Luhur Tradisi Minangkabau & Bali"
        />

        <div className="grid grid-cols-1 lg:grid-cols-11 gap-10 items-center">
          <CoupleCard person={bride} isBride delay={0.1} />

          <div className="lg:col-span-1 flex flex-col items-center justify-center my-4 lg:my-0">
            <Reveal direction="none">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold/70 bg-night flex items-center justify-center gold-box-shadow">
                <span className="font-cormorant text-4xl md:text-5xl font-bold gold-gradient-text italic">
                  &amp;
                </span>
              </div>
            </Reveal>
            <div className="hidden lg:block w-[1px] h-24 bg-gradient-to-b from-gold to-transparent mt-3" />
          </div>

          <CoupleCard person={groom} isBride={false} delay={0.2} />
        </div>

        {/* Aksen bawah */}
        <div className="mt-14 flex items-center justify-center gap-3 text-gold/70">
          <span className="w-12 h-[1px] bg-gold/50" />
          <GoldStar className="w-5 h-5" />
          <span className="w-12 h-[1px] bg-gold/50" />
        </div>
      </div>
    </section>
  );
}