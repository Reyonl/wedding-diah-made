"use client";

import { MapPin } from "lucide-react";
import { wedding } from "@/data/wedding";

/**
 * Acara Section (Night Background)
 * ONE location, TWO times.
 * Left: Clean vertical timeline (Akad Nikah & Pemberkatan 08.00-10.00 WIB, Resepsi 11.00-14.00 WIB).
 * Right: Venue block (name, address, one "Buka Google Maps" button).
 * No duplicate cards, no duplicate map buttons, no icon circles.
 * Date "Sabtu, 28 November 2026" shown once.
 */
export function EventSection() {
  const { date, akad, resepsi, venue, maps } = wedding;

  return (
    <section id="acara" className="py-24 px-6 relative bg-night border-t border-gold/15">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading & Single Date */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="heading-section text-ivory mb-3">
            Rangkaian Acara
          </h2>
          <p className="font-cormorant text-xl sm:text-2xl text-gold italic font-normal">
            {date.fullDate}
          </p>
        </div>

        {/* Two-Column Clean Layout: Vertical Timeline + Venue Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Column 1: Vertical Timeline (7 cols) */}
          <div className="lg:col-span-7 relative pl-8 border-l border-gold/30 space-y-12">
            {/* Timeline Node 1: Akad Nikah & Pemberkatan */}
            <div className="relative">
              {/* Timeline marker */}
              <div
                className="absolute -left-[37px] top-1.5 w-3.5 h-3.5 rounded-full bg-gold border-2 border-night"
                aria-hidden="true"
              />
              <span className="text-xs uppercase tracking-wider text-gold font-sans font-semibold block mb-1">
                {akad.time}
              </span>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-ivory leading-tight">
                {akad.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ivory/65 mt-2 leading-relaxed">
                Prosesi sakral ijab kabul dan ikrar janji suci penyatuan dua insan.
              </p>
            </div>

            {/* Timeline Node 2: Resepsi */}
            <div className="relative">
              {/* Timeline marker */}
              <div
                className="absolute -left-[37px] top-1.5 w-3.5 h-3.5 rounded-full bg-gold border-2 border-night"
                aria-hidden="true"
              />
              <span className="text-xs uppercase tracking-wider text-gold font-sans font-semibold block mb-1">
                {resepsi.time}
              </span>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-ivory leading-tight">
                {resepsi.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ivory/65 mt-2 leading-relaxed">
                Ramah tamah, jamuan makan, dan doa restu bersama keluarga besar tercinta.
              </p>
            </div>
          </div>

          {/* Column 2: One Venue Details Block (5 cols) */}
          <div className="lg:col-span-5 p-8 rounded-2xl border border-gold/30 bg-surface/70">
            <span className="text-xs font-sans uppercase tracking-widest text-gold font-semibold block mb-3">
              Lokasi Acara
            </span>
            <h4 className="font-cormorant text-2xl sm:text-3xl font-semibold text-ivory mb-2">
              {venue.name}
            </h4>
            <p className="font-sans text-sm text-ivory/75 leading-relaxed mb-8">
              {venue.address}
            </p>

            {/* ONE clean Google Maps action button */}
            <a
              href={maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full bg-gold hover:bg-gold-light text-night font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-md focus-visible:ring-2 focus-visible:ring-gold-light"
            >
              <MapPin className="w-4 h-4 text-night" />
              <span>Buka Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}