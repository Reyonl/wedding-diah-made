"use client";

import { wedding } from "@/data/wedding";
import { asset } from "@/lib/asset";
import { PatraCorner } from "@/components/ornaments/PatraCorner";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export function CoupleSection() {
  const { bride, groom } = wedding;

  return (
    <section
      id="mempelai"
      className="py-28 px-6 relative bg-gradient-to-b from-night via-velvet-dark to-night overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section title: "Mempelai". No subtitle. */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="heading-section text-ivory">
            Mempelai
          </h2>
        </div>

        {/* Staggered Asymmetric Layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start justify-items-center">
          {/* 1. Mempelai Wanita (Diah Insani) - Left Column */}
          <div className="lg:col-span-5 flex flex-col items-center text-center w-full max-w-[400px]">
            {/* Tall Arch Frame with PatraCorner ornaments */}
            <div className="relative w-full aspect-[3/4] rounded-t-full rounded-b-2xl border-2 border-gold/60 p-2.5 shadow-2xl bg-velvet/40 mb-6">
              {/* Balinese Patra Carved Corner Ornaments on Arch Corners */}
              <div className="absolute -top-1 -left-1 z-20">
                <PatraCorner position="top-left" size={48} />
              </div>
              <div className="absolute -top-1 -right-1 z-20">
                <PatraCorner position="top-right" size={48} />
              </div>
              <div className="absolute -bottom-1 -left-1 z-20">
                <PatraCorner position="bottom-left" size={48} />
              </div>
              <div className="absolute -bottom-1 -right-1 z-20">
                <PatraCorner position="bottom-right" size={48} />
              </div>

              {/* Photo */}
              <div className="relative w-full h-full rounded-t-full rounded-b-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(bride.photo)}
                  alt={bride.name}
                  className="w-full h-full object-cover object-top filter brightness-95"
                />

                {/* Dark gradient overlay on lower part of photo */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night via-night/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-ivory leading-tight">
                    {bride.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Parents Bio */}
            <p className="font-sans text-xs sm:text-sm text-ivory/80 leading-relaxed max-w-sm mb-4">
              {bride.parents}
            </p>

            {/* Instagram Text Link */}
            <a
              href={bride.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-sans text-gold hover:text-gold-light transition-colors py-1 focus-visible:ring-1 focus-visible:ring-gold"
              aria-label={`Instagram ${bride.nick}: ${bride.instagramHandle}`}
            >
              <InstagramIcon className="w-3.5 h-3.5 text-gold" />
              <span className="font-medium underline underline-offset-4">
                {bride.instagramHandle}
              </span>
            </a>
          </div>

          {/* Central Overlapping Italic Gold "&" */}
          <div className="lg:col-span-2 flex items-center justify-center self-center my-4 lg:my-0 z-20">
            <span className="font-cormorant italic text-6xl sm:text-7xl lg:text-8xl text-gold font-light select-none drop-shadow-md">
              &amp;
            </span>
          </div>

          {/* 2. Mempelai Pria (I Made Ariana Putra) - Right Column (Shifted down ~96px on desktop) */}
          <div className="lg:col-span-5 lg:mt-24 flex flex-col items-center text-center w-full max-w-[400px]">
            {/* Tall Arch Frame with PatraCorner ornaments */}
            <div className="relative w-full aspect-[3/4] rounded-t-full rounded-b-2xl border-2 border-gold/60 p-2.5 shadow-2xl bg-velvet/40 mb-6">
              {/* Balinese Patra Carved Corner Ornaments on Arch Corners */}
              <div className="absolute -top-1 -left-1 z-20">
                <PatraCorner position="top-left" size={48} />
              </div>
              <div className="absolute -top-1 -right-1 z-20">
                <PatraCorner position="top-right" size={48} />
              </div>
              <div className="absolute -bottom-1 -left-1 z-20">
                <PatraCorner position="bottom-left" size={48} />
              </div>
              <div className="absolute -bottom-1 -right-1 z-20">
                <PatraCorner position="bottom-right" size={48} />
              </div>

              {/* Photo */}
              <div className="relative w-full h-full rounded-t-full rounded-b-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(groom.photo)}
                  alt={groom.name}
                  className="w-full h-full object-cover object-top filter brightness-95"
                />

                {/* Dark gradient overlay on lower part of photo */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night via-night/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-ivory leading-tight">
                    {groom.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Parents Bio */}
            <p className="font-sans text-xs sm:text-sm text-ivory/80 leading-relaxed max-w-sm mb-4">
              {groom.parents}
            </p>

            {/* Instagram Text Link */}
            <a
              href={groom.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-sans text-gold hover:text-gold-light transition-colors py-1 focus-visible:ring-1 focus-visible:ring-gold"
              aria-label={`Instagram ${groom.nick}: ${groom.instagramHandle}`}
            >
              <InstagramIcon className="w-3.5 h-3.5 text-gold" />
              <span className="font-medium underline underline-offset-4">
                {groom.instagramHandle}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}