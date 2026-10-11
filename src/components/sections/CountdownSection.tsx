"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { wedding, formatCountdownParts } from "@/data/wedding";

/**
 * Generates an .ics file client-side containing both Akad and Resepsi events
 * with Asia/Jakarta timezone.
 */
function downloadICS() {
  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Wedding of Diah and Made//ID",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-TIMEZONE:Asia/Jakarta",
    // Event 1: Akad Nikah & Pemberkatan
    "BEGIN:VEVENT",
    "UID:akad-20261128-diah-made@wedding",
    "DTSTAMP:20261128T010000Z",
    "DTSTART;TZID=Asia/Jakarta:20261128T080000",
    "DTEND;TZID=Asia/Jakarta:20261128T100000",
    `SUMMARY:${wedding.akad.title} Diah & Made`,
    `DESCRIPTION:Pernikahan ${wedding.bride.name} & ${wedding.groom.name} ${wedding.hashtag}`,
    `LOCATION:${wedding.venue.name}, ${wedding.venue.address}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    // Event 2: Resepsi
    "BEGIN:VEVENT",
    "UID:resepsi-20261128-diah-made@wedding",
    "DTSTAMP:20261128T010000Z",
    "DTSTART;TZID=Asia/Jakarta:20261128T110000",
    "DTEND;TZID=Asia/Jakarta:20261128T140000",
    `SUMMARY:${wedding.resepsi.title} Diah & Made`,
    `DESCRIPTION:Resepsi Pernikahan ${wedding.bride.name} & ${wedding.groom.name} ${wedding.hashtag}`,
    `LOCATION:${wedding.venue.name}, ${wedding.venue.address}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([icsLines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Pernikahan-Diah-Made.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function CountdownSection() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = new Date(wedding.date.countdownTarget).getTime();
  const parts = formatCountdownParts(target - now);
  const isAfter = now >= target;

  const cells = [
    { label: "Hari", value: parts.days },
    { label: "Jam", value: parts.hours },
    { label: "Menit", value: parts.minutes },
    { label: "Detik", value: parts.seconds },
  ];

  return (
    <section id="savethedate" className="py-24 px-6 relative bg-night overflow-hidden border-t border-gold/15">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Heading */}
        <div className="mb-14">
          <h2 className="heading-section text-ivory mb-3">
            Save The Date
          </h2>
          <p className="font-sans text-sm text-ivory/70 max-w-md mx-auto">
            {wedding.date.fullDate}
          </p>
        </div>

        {/* Large Numerals separated by thin vertical lines — NO boxes */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 max-w-2xl mx-auto mb-14">
          {cells.map((c, i) => (
            <div key={c.label} className="flex items-center gap-4 sm:gap-8 md:gap-12">
              <div className="flex flex-col items-center">
                <span className="font-cormorant text-5xl sm:text-7xl md:text-8xl font-semibold text-gold tabular-nums leading-none">
                  {c.value}
                </span>
                <span className="text-xs uppercase tracking-wider text-ivory/60 font-sans mt-2">
                  {c.label}
                </span>
              </div>

              {/* Thin vertical separator between items (except after last item) */}
              {i < cells.length - 1 ? (
                <div className="w-[1px] h-14 sm:h-20 bg-gold/25 self-center" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>

        {/* Action Button: Generates client-side .ics with Asia/Jakarta TZID */}
        {isAfter ? (
          <p className="font-cormorant text-xl text-gold-light italic">
            Hari bahagia telah tiba — selamat datang kepada para tamu undangan tercinta.
          </p>
        ) : (
          <button
            onClick={downloadICS}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-gold/70 bg-surface hover:bg-gold hover:text-night text-gold font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Calendar className="w-4 h-4" />
            <span>Simpan ke Kalender</span>
          </button>
        )}
      </div>
    </section>
  );
}