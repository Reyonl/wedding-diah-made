"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Landmark, Gift } from "lucide-react";
import { wedding } from "@/lib/data";
import { useToast } from "@/components/providers/ToastProvider";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

function BankCard({
  account,
  index,
}: {
  account: (typeof wedding.bankAccounts)[number];
  index: number;
}) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(account.noRek);
      setCopied(true);
      showToast(`Nomor rekening ${account.bank} tersalin`);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      showToast(`Nomor rekening: ${account.noRek}`);
    }
  };

  return (
    <Reveal delay={index * 0.15}>
      <motion.div
        whileHover={{ y: -10, rotateX: 4, rotateZ: -1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.7 }}
        initial={false}
        className={`relative p-8 rounded-3xl bg-gradient-to-br ${account.cardGradient} border-2 border-gold overflow-hidden gold-box-shadow`}
        style={{ transformPerspective: 800 }}
      >
        <div className="absolute top-0 left-0 right-0 h-2 songket-border" />

        {/* Chip kartu */}
        <div className="flex items-start justify-between mb-8">
          <span className="font-cinzel text-2xl font-black text-gold tracking-wider">
            {account.bank}
          </span>
          <div className="flex flex-col items-end gap-1">
            <div className="w-12 h-9 rounded-md bg-gradient-to-tr from-amber-200 via-amber-300 to-yellow-500 opacity-90 border border-yellow-100 shadow-inner" />
            <Landmark className="w-4 h-4 text-gold/70 mt-1" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-widest text-ivory/60">
            Nomor Rekening
          </span>
          <span className="text-[10px] font-cinzel text-gold/80 tracking-widest uppercase">
            {index === 0 ? "Bali" : "Minang"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 mb-6">
          <span className="font-cinzel text-xl md:text-2xl font-bold tracking-widest text-goldlight tabular-nums">
            {account.noRek}
          </span>
          <button
            onClick={copyNumber}
            className={`px-4 py-2 rounded-full text-night text-xs font-bold uppercase tracking-wider active:scale-95 transition-all duration-300 shadow inline-flex items-center gap-1.5 ${
              copied ? "bg-emerald-400" : "gold-gradient-bg hover:brightness-110"
            }`}
            aria-label={`Salin nomor rekening ${account.bank}`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Tersalin" : "Salin Nomor"}
          </button>
        </div>

        <div className="pt-4 border-t border-gold/20 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-ivory/50">
              Atas Nama
            </p>
            <p className="font-sans font-bold text-sm text-ivory">{account.holder}</p>
          </div>
          <span className="text-xs text-gold font-cinzel">{account.culture}</span>
        </div>

        {/* Kilau kartu */}
        <motion.div
          className="absolute -top-1/2 -right-1/3 w-52 h-52 bg-white/10 blur-2xl rounded-full pointer-events-none"
          animate={{ x: [0, 20, 0], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </Reveal>
  );
}

export function GiftSection() {
  return (
    <section id="hadiah" className="py-24 px-6 relative bg-night">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeading
          eyebrow="Tanda Kasih & Doa"
          title="Amplop Digital"
          subtitle="Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberi tanda kasih, kami menyediakan rekening berikut:"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {wedding.bankAccounts.map((acc, i) => (
            <BankCard key={acc.bank} account={acc} index={i} />
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 inline-flex items-center gap-2 text-xs text-ivory/50 tracking-wider">
            <Gift className="w-4 h-4 text-gold" />
            Mohon konfirmasi jika telah mengirim — terima kasih atas doa &amp; kasihnya.
          </p>
        </Reveal>
      </div>
    </section>
  );
}