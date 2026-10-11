"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { asset } from "@/lib/asset";
import { useLenis } from "@/components/providers/SmoothScroll";
import { useAudio } from "@/components/providers/AudioProvider";
import { CandiBentarGate } from "@/components/ornaments/CandiBentarGate";
import { FallingPetals } from "@/components/ornaments/FallingPetals";
import { SongketStrip } from "@/components/ornaments/SongketStrip";

interface HeroSectionProps {
  guestName: string;
  onOpened: () => void;
}

/**
 * Phase 2: Cover & Hero Experience
 * - Cover: Volcanic brick Balinese Candi Bentar gate framing Diah & Made in the center gap.
 * - Opening sequence: Button fades -> Music starts with 0 to 0.6 volume fade ->
 *   Gate slides outward (cubic-bezier(.77,0,.18,1)) -> Photo scales 1.15 to 1 ->
 *   Scroll unlocks -> Cover unmounts -> Seamless full-bleed Hero with SongketStrip.
 */
export function HeroSection({ guestName, onOpened }: HeroSectionProps) {
  const [opening, setOpening] = useState(false);
  const [coverMounted, setCoverMounted] = useState(true);
  const [buttonFaded, setButtonFaded] = useState(false);
  const [heroTextVisible, setHeroTextVisible] = useState(false);

  const { setLocked, scrollTo } = useLenis();
  const { playWithFade } = useAudio();
  const prefersReduced = useReducedMotion();

  // Lock scroll until cover is opened
  useEffect(() => {
    setLocked(true);
  }, [setLocked]);

  const handleOpen = async () => {
    // 1. Button fades out over 200ms
    setButtonFaded(true);

    // 2. Start music with gradual 1.5s volume fade (0 -> 0.6)
    playWithFade(0.6, 1500).catch(() => {});

    // 3. Trigger gate opening slide
    setOpening(true);

    // 4. Hero text fades in around 900ms
    setTimeout(() => {
      setHeroTextVisible(true);
    }, 900);

    // 5. Unlock scroll, unmount cover at 1300ms, and notify parent
    setTimeout(() => {
      setCoverMounted(false);
      setLocked(false);
      onOpened();
      scrollTo("#hero");
    }, prefersReduced ? 600 : 1300);
  };

  const gateTransitionEase = [0.77, 0, 0.18, 1] as const;

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. COVER (Full Viewport Candi Bentar Gate)
          ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {coverMounted ? (
          <motion.div
            key="wedding-cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-night select-none"
            role="dialog"
            aria-modal="true"
            aria-label="Undangan Pernikahan Diah & Made"
          >
            {/* Centered Cover Photo behind the gate gap */}
            <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
              <motion.img
                src={asset(wedding.photos.cover)}
                alt="Diah Insani & I Made Ariana Putra"
                className="w-full h-full object-cover object-center filter brightness-95"
                initial={{ scale: 1.15 }}
                animate={{
                  scale: opening ? 1 : 1.15,
                  filter: opening ? "brightness(1.05)" : "brightness(0.92)",
                }}
                transition={{
                  duration: prefersReduced ? 0.6 : 2.4,
                  ease: gateTransitionEase,
                }}
              />
              {/* Dark overlay ONLY at edges and bottom — never covering faces */}
              <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/60 pointer-events-none" />
              <div className="absolute inset-0 bg-radial-to-r from-transparent via-transparent to-night/70 pointer-events-none" />
            </div>

            {/* Falling Frangipani Petals */}
            <FallingPetals maxDesktop={10} maxMobile={6} />

            {/* Balinese Candi Bentar Gate */}
            <CandiBentarGate opened={opening} />

            {/* Centered Gap Content (never touching the gate) */}
            <div className="relative z-30 w-full max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl px-4 text-center flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: buttonFaded ? 0 : 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center w-full"
              >
                <p className="font-cormorant text-ivory/80 text-sm md:text-base tracking-widest uppercase mb-2">
                  The Wedding of
                </p>

                {/* Couple Names: Stacked on mobile (Diah / & / Made), inline on desktop */}
                <h1 className="font-cormorant text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-ivory tracking-tight mb-3">
                  <span className="block sm:inline">Diah</span>{" "}
                  <span className="font-cormorant italic font-normal text-gold px-1">
                    &amp;
                  </span>{" "}
                  <span className="block sm:inline">Made</span>
                </h1>

                {/* Plain date line (no pill) */}
                <p className="font-sans text-xs sm:text-sm text-ivory/85 mb-6 sm:mb-8 font-normal tracking-wide">
                  {wedding.date.fullDate}
                </p>

                {/* Clean guest salutation — no box, no diamond ornament */}
                <div className="mb-8 w-full max-w-sm">
                  <p className="text-xs text-ivory/65 font-sans mb-1.5">
                    Kepada Yth.
                  </p>
                  <p className="font-cormorant text-2xl sm:text-3xl text-gold-light font-semibold leading-snug break-words">
                    {guestName}
                  </p>
                </div>

                {/* Single dignified gold button */}
                <button
                  onClick={handleOpen}
                  disabled={opening}
                  className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-light text-night font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-gold-light"
                >
                  Buka Undangan
                </button>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION (Full-Bleed Studio Photo after Opening)
          ───────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-[90vh] md:min-h-screen flex items-end justify-center overflow-hidden bg-night"
      >
        {/* Full-bleed studio photo, gradient only at the bottom */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(wedding.photos.cover)}
            alt="Pernikahan Diah Insani & I Made Ariana Putra"
            className="w-full h-full object-cover object-top filter brightness-95"
          />
          {/* Subtle vignette and bottom gradient only */}
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent" />
        </div>

        {/* Ambient Petals on Hero */}
        <FallingPetals maxDesktop={8} maxMobile={4} />

        {/* Hero Editorial Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 pb-20 pt-32 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{
              opacity: heroTextVisible || !coverMounted ? 1 : 0,
              y: heroTextVisible || !coverMounted ? 0 : 24,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Greeting line */}
            <p className="font-cormorant text-gold text-lg md:text-xl italic mb-3">
              {wedding.greeting.text}
              {wedding.greeting.showOmSwastyastu ? " • Om Swastyastu" : ""}
            </p>

            {/* Names */}
            <h2 className="display-names text-ivory font-semibold mb-3">
              Diah <span className="italic font-normal text-gold">&amp;</span> Made
            </h2>

            {/* Plain date line */}
            <p className="font-sans text-sm md:text-base text-gold-light mb-6 font-medium">
              {wedding.date.fullDate}
            </p>

            {/* Core invitation sentence */}
            <p className="body-editorial text-ivory/85 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              Dengan restu orang tua dan keluarga besar, kami mengundang Bapak/Ibu/Saudara/i
              untuk menyaksikan hari bahagia kami.
            </p>
          </motion.div>
        </div>

        {/* Bottom edge: Authentic Minangkabau Songket Strip */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <SongketStrip />
        </div>
      </section>
    </>
  );
}