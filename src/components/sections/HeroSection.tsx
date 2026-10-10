"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MailOpen, ChevronDown } from "lucide-react";
import { wedding } from "@/lib/data";
import { asset } from "@/lib/asset";
import { useLenis } from "@/components/providers/SmoothScroll";
import { useAudio } from "@/components/providers/AudioProvider";
import { CandiBentarGate, GonjongRoof } from "@/components/ornaments/CandiBentarGate";
import { FallingPetals } from "@/components/ornaments/FallingPetals";

export function HeroSection({
  guestName,
  onOpened,
}: {
  guestName: string;
  onOpened: () => void;
}) {
  const [opened, setOpened] = useState(false);
  const { setLocked, scrollTo } = useLenis();
  const { toggle } = useAudio();

  const handleOpen = async () => {
    setOpened(true);
    // Buka kunci scroll (setelah gerbang membuka) & mulai audio dari gesture.
    setTimeout(() => setLocked(false), 650);
    // Autoplay musik (aman: dipicu oleh gesture).
    await toggle();
    // Scroll mulus ke welcome setelah gate terbuka.
    setTimeout(() => {
      onOpened();
      scrollTo("#welcome");
    }, 900);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Photo cover + overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(wedding.coverPhoto)}
          alt="Diah & Made — Balinese Minangkabau Wedding"
          className="w-full h-full object-cover object-center scale-105 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/80 to-maroon/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0F0A08_85%)]" />
      </div>

      <FallingPetals />

      {/* Candi Bentar gate — membuka dengan spring saat "Buka Undangan" */}
      <CandiBentarGate opened={opened} />

      {/* Content */}
      <div className="relative z-30 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="invite"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24, transition: { duration: 0.4 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Ornamen atas */}
              <div className="mb-4 flex items-center justify-center gap-4">
                <div className="w-16 md:w-28 h-[1px] bg-gradient-to-r from-transparent via-gold to-gold" />
                <svg
                  className="w-8 h-8 text-gold"
                  viewBox="0 0 40 40"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20 2 C22 12 28 18 38 20 C28 22 22 28 20 38 C18 28 12 22 2 20 C12 18 18 12 20 2 Z" />
                  <circle cx="20" cy="20" r="4" fill="#B3141F" />
                </svg>
                <div className="w-16 md:w-28 h-[1px] bg-gradient-to-l from-transparent via-gold to-gold" />
              </div>

              <p className="font-cormorant text-goldlight tracking-[0.35em] text-xs md:text-sm uppercase font-semibold mb-2">
                The Wedding of
              </p>

              <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black gold-gradient-text tracking-wider mb-4 drop-shadow-[0_4px_25px_rgba(212,165,58,0.5)]">
                Diah &amp; Made
              </h1>

              <div className="inline-flex items-center gap-2 px-6 py-1.5 rounded-full bg-charcoal/80 border border-gold/40 text-xs md:text-sm text-ivory font-cormorant tracking-widest uppercase mb-8 backdrop-blur-md">
                <span>Sabtu</span>
                <span className="w-1 h-1 rounded-full bg-gold" />
                <span className="text-gold font-bold">28 November 2026</span>
              </div>

              {/* Guest card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-surface/85 border border-gold/50 backdrop-blur-lg gold-box-shadow relative mb-8"
              >
                <span className="absolute top-2 left-3 text-gold text-xs">◆</span>
                <span className="absolute top-2 right-3 text-gold text-xs">◆</span>
                <span className="absolute bottom-2 left-3 text-gold text-xs">◆</span>
                <span className="absolute bottom-2 right-3 text-gold text-xs">◆</span>

                <p className="text-xs uppercase tracking-widest text-ivory/70 mb-2">
                  Kepada Yth. Bapak/Ibu/Saudara/i
                </p>
                <h3 className="font-cormorant text-2xl md:text-3xl font-bold text-goldlight mb-1 min-h-[2.5rem] break-words">
                  {guestName}
                </h3>
                <p className="text-[11px] text-ivory/50 tracking-wider">
                  Kami mengundang Anda untuk hadir berbagi kebahagiaan dalam momen suci kami.
                </p>

                <button
                  onClick={handleOpen}
                  className="mt-6 w-full py-3.5 px-8 rounded-full gold-gradient-bg text-night font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all duration-300 gold-glow shadow-xl cursor-pointer"
                >
                  <MailOpen className="w-4 h-4" />
                  <span>Buka Undangan</span>
                </button>
              </motion.div>

              <div className="inline-flex flex-col items-center text-gold/70">
                <span className="text-[10px] uppercase tracking-widest font-semibold mb-1">
                  Gulir untuk membuka gerbang
                </span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="opening"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="font-cormorant text-goldlight tracking-[0.4em] uppercase text-sm font-semibold mb-3">
                Assalamualaikum Wr. Wb.
              </p>
              <h2 className="font-vibes text-5xl md:text-7xl text-goldlight mb-4">
                Selamat Datang
              </h2>
              <p className="text-sm md:text-base text-ivory/80 max-w-lg mx-auto font-sans leading-relaxed">
                {guestName !== "Tamu Undangan Terhormat"
                  ? `${guestName}, terima kasih telah hadir dalam momen spesial kami.`
                  : "Terima kasih telah hadir dalam momen spesial kami."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gonjong roof + songket border bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <GonjongRoof />
        <div className="h-2 w-full songket-border" />
      </div>
    </section>
  );
}