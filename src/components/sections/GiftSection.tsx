"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { wedding } from "@/data/wedding";
import { SongketStrip } from "@/components/ornaments/SongketStrip";

/**
 * Physical-style Bank Card Component
 * Standard credit card aspect ratio 1.586:1 (ISO/IEC 7810 ID-1).
 * Finishes: BCA has warm gold foil metallic finish; Mandiri has deep velvet-dark finish.
 * Bank name rendered as clean typography (no logos).
 * "Salin nomor" switches to "Tersalin" for 2 seconds with aria-live="polite".
 */
function BankCard({
  bank,
  number,
  holder,
  isGoldFoil,
}: {
  bank: string;
  number: string;
  holder: string;
  isGoldFoil: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={`relative w-full max-w-[420px] aspect-[1.586/1] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl transition-transform hover:-translate-y-1.5 duration-300 ${
        isGoldFoil
          ? "bg-gradient-to-br from-[#F7E7B8] via-[#D4A53A] to-[#996C1B] text-night border border-amber-200/50"
          : "bg-gradient-to-br from-[#330810] via-[#24060C] to-[#120205] text-ivory border border-gold/40"
      }`}
    >
      {/* Top row: Chip simulation + Bank Name as Text */}
      <div className="flex items-start justify-between">
        {/* Physical metallic smart chip */}
        <div
          className={`w-11 h-8 rounded-md border flex items-center justify-center ${
            isGoldFoil
              ? "bg-gradient-to-br from-amber-100 to-amber-300 border-amber-400 shadow-inner"
              : "bg-gradient-to-br from-amber-300 to-amber-500 border-amber-200 shadow-inner"
          }`}
          aria-hidden="true"
        >
          <div className="w-8 h-5 border border-black/15 rounded-sm" />
        </div>

        {/* Bank name as bold typography (NO logos) */}
        <span
          className={`font-sans font-bold text-lg sm:text-xl tracking-wider ${
            isGoldFoil ? "text-night" : "text-gold-light"
          }`}
        >
          {bank}
        </span>
      </div>

      {/* Middle row: Account Number with tabular-nums */}
      <div>
        <span
          className={`text-[10px] uppercase tracking-widest block mb-1 ${
            isGoldFoil ? "text-night/70" : "text-ivory/60"
          }`}
        >
          Nomor Rekening
        </span>
        <div className="flex items-center justify-between gap-3">
          <span
            className={`font-cormorant text-2xl sm:text-3xl font-bold tracking-widest tabular-nums ${
              isGoldFoil ? "text-night" : "text-ivory"
            }`}
          >
            {number}
          </span>

          {/* Copy Button with 2s "Tersalin" feedback & aria-live */}
          <button
            onClick={copyNumber}
            className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold inline-flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
              copied
                ? "bg-emerald-600 text-white"
                : isGoldFoil
                  ? "bg-night text-gold hover:bg-night/90"
                  : "bg-gold text-night hover:bg-gold-light"
            }`}
            aria-live="polite"
            aria-label={`Salin nomor rekening ${bank}`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Tersalin" : "Salin nomor"}</span>
          </button>
        </div>
      </div>

      {/* Bottom row: Card Holder */}
      <div className="pt-2 border-t border-black/10">
        <span
          className={`text-[10px] uppercase tracking-wider block ${
            isGoldFoil ? "text-night/60" : "text-ivory/50"
          }`}
        >
          Atas Nama
        </span>
        <span
          className={`font-sans text-xs sm:text-sm font-semibold tracking-wide ${
            isGoldFoil ? "text-night" : "text-ivory"
          }`}
        >
          {holder}
        </span>
      </div>
    </div>
  );
}

export function GiftSection() {
  const { gifts } = wedding;

  return (
    <section id="hadiah" className="relative bg-ivory text-ink overflow-hidden border-t border-gold/20">
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-28 text-center">
        {/* Section Heading */}
        <div className="mb-14">
          <h2 className="heading-section text-ink mb-3">
            Tanda Kasih
          </h2>
          <p className="font-sans text-sm text-ink/75 max-w-lg mx-auto leading-relaxed">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila Anda bermaksud
            memberikan tanda kasih, kami menyediakan nomor rekening berikut:
          </p>
        </div>

        {/* Two Physical-Style Bank Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-10 mb-14">
          {/* Card 1: BCA (Gold foil finish) */}
          <BankCard
            bank={gifts.bca.bank}
            number={gifts.bca.number}
            holder={gifts.bca.holder}
            isGoldFoil={true}
          />

          {/* Card 2: Mandiri (Velvet-dark finish) */}
          <BankCard
            bank={gifts.mandiri.bank}
            number={gifts.mandiri.number}
            holder={gifts.mandiri.holder}
            isGoldFoil={false}
          />
        </div>

        <p className="text-xs font-sans text-ink/60">
          Terima kasih atas kebaikan dan doa restu yang tulus bagi perjalanan hidup kami.
        </p>
      </div>

      {/* SongketStrip along bottom edge */}
      <div className="w-full">
        <SongketStrip />
      </div>
    </section>
  );
}