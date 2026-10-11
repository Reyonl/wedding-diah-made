"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import { wedding, buildCalendarUrl, formatCountdownParts } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function CountdownSection() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = new Date(wedding.weddingDateISO).getTime();
  const parts = formatCountdownParts(target - now);
  const isAfter = now >= target;

  const cells = [
    { label: "Hari", value: parts.days },
    { label: "Jam", value: parts.hours },
    { label: "Menit", value: parts.minutes },
    { label: "Detik", value: parts.seconds },
  ];

  return (
    <section id="savethedate" className="py-24 px-6 relative bg-prada overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <Reveal>
          <p className="font-cormorant text-goldlight tracking-[0.35em] uppercase text-xs md:text-sm font-semibold mb-2">
            Hitung Mundur Hari Bahagia
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-ivory mb-4">
            Save The Date
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-xs md:text-sm text-ivory/70 max-w-lg mx-auto mb-12">
            Menuju peresmian ikatan suci kami pada hari Sabtu, 28 November 2026
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto mb-10">
          {cells.map((c, i) => (
            <Reveal key={c.label} delay={0.1 + i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-surface/90 border border-gold/60 backdrop-blur-md gold-box-shadow"
              >
                <div className="font-cinzel text-4xl md:text-6xl font-bold gold-gradient-text tabular-nums h-12 md:h-16 flex items-center justify-center">
                  {c.value}
                </div>
                <span className="text-xs uppercase tracking-widest text-ivory/70 font-semibold mt-1 block">
                  {c.label}
                </span>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {isAfter ? (
          <Reveal>
            <p className="text-sm text-goldlight italic font-cormorant">
              🎉 Hari bahagia telah tiba — selamat datang, para tamu istimewa!
            </p>
          </Reveal>
        ) : (
          <Reveal delay={0.2}>
            <a
              href={buildCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full gold-gradient-bg text-night font-bold uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all shadow-xl gold-glow"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Simpan ke Kalender</span>
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}