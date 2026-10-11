"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, ExternalLink, Navigation, Gem, PartyPopper } from "lucide-react";
import { wedding } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

type EventData = {
  name: string;
  dayDate: string;
  time: string;
  venue: string;
  address: string;
  icon: "ring" | "party";
};

function EventCard({ event, delay }: { event: EventData; delay: number }) {
  const Icon = event.icon === "ring" ? Gem : PartyPopper;

  return (
    <Reveal delay={delay} className="h-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="h-full p-8 rounded-3xl bg-surface/85 border border-gold/40 relative overflow-hidden backdrop-blur-md gold-box-shadow flex flex-col justify-between group hover:border-gold transition duration-300"
      >
        <div>
          <div className="flex items-center justify-end mb-4">
            <Icon className="w-5 h-5 text-gold/80" />
          </div>

          <h3 className="font-cinzel text-2xl font-bold text-ivory mb-2">
            {event.name}
          </h3>
          <p className="font-cormorant text-lg text-gold font-semibold mb-6">
            {event.dayDate}
          </p>

          <div className="space-y-4 text-xs text-ivory/80 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-maroon/60 border border-gold/30 flex items-center justify-center shrink-0 text-gold">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-ivory block font-semibold">Pukul:</strong>
                <span>{event.time}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-maroon/60 border border-gold/30 flex items-center justify-center shrink-0 text-gold">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-ivory block font-semibold">Tempat / Lokasi:</strong>
                <span>
                  {event.venue}
                  <br />
                  {event.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        <a
          href={wedding.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-full border border-gold text-gold hover:bg-gold hover:text-night font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition duration-300"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Buka Google Maps</span>
        </a>
      </motion.div>
    </Reveal>
  );
}

export function EventSection() {
  const { akad, resepsi } = wedding.events;

  return (
    <section id="acara" className="py-24 px-6 relative bg-night">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Rangkaian Acara"
          title="Waktu & Tempat Acara"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-stretch">
          <EventCard event={akad} delay={0.1} />
          <EventCard event={resepsi} delay={0.2} />
        </div>

        {/* Navigation banner */}
        <Reveal delay={0.15}>
          <div className="p-6 md:p-8 rounded-3xl bg-surface border border-gold/50 relative overflow-hidden gold-box-shadow">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="w-14 h-14 rounded-2xl gold-gradient-bg flex items-center justify-center text-night shrink-0 shadow-lg">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-cinzel text-lg md:text-xl font-bold text-ivory">
                    Petunjuk Arah &amp; Navigasi Google Maps
                  </h4>
                  <p className="text-xs text-ivory/70">
                    Jalan Dayung III &amp; IIIC No 6 — Akses rute langsung menuju lokasi pernikahan
                  </p>
                </div>
              </div>
              <a
                href={wedding.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full gold-gradient-bg text-night font-bold uppercase tracking-wider text-xs hover:brightness-110 transition shadow-lg shrink-0 flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Petunjuk Arah</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}