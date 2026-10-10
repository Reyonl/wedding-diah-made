"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, Heart } from "lucide-react";
import { wedding, buildWhatsAppUrl } from "@/lib/data";
import { useToast } from "@/components/providers/ToastProvider";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

const STORAGE_KEY = "diah_made_wedding_wishes";

type Wish = {
  id: string;
  name: string;
  status: string;
  pax: string;
  message: string;
  time: string;
};

type FormState = {
  name: string;
  status: string;
  pax: string;
  message: string;
};

const emptyForm: FormState = { name: "", status: "Hadir", pax: "1 Orang", message: "" };

function loadWishes(): Wish[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Wish[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function RsvpSection() {
  const { showToast } = useToast();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sentViaWa, setSentViaWa] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    setWishes(loadWishes());
  }, []);

  const allWishes = useMemo(
    () => [
      ...wedding.seedWishes.map((w, i) => ({ ...w, id: `seed-${i}` })),
      ...wishes,
    ],
    [wishes]
  );

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Mohon tuliskan nama Anda.";
    if (!form.message.trim()) next.message = "Tuliskan ucapan & doa restu Anda.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newWish: Wish = {
      id: `${Date.now()}`,
      name: form.name.trim(),
      status: form.status,
      pax: form.pax,
      message: form.message.trim(),
      time: "Baru saja",
    };

    const next = [newWish, ...loadWishes()];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* penyimpanan penuh / private mode — tetap tampil di sesi */
    }
    setWishes(next);
    setForm(emptyForm);
    setSubmitted(true);
    showToast("Terima kasih! Doa restu Anda tersimpan.");
    setTimeout(() => setSubmitted(false), 3500);
  };

  const handleWhatsApp = () => {
    if (!form.name.trim()) {
      setErrors((e) => ({ ...e, name: "Mohon isi nama Anda dahulu." }));
      showToast("Mohon isi nama terlebih dahulu");
      return;
    }
    setSentViaWa(true);
    window.open(
      buildWhatsAppUrl({ ...form, name: form.name.trim(), message: form.message.trim() }),
      "_blank"
    );
    setTimeout(() => setSentViaWa(false), 2500);
  };

  const inputClass = (err?: string) =>
    `w-full px-4 py-3 rounded-xl bg-surface border text-sm transition-colors focus:outline-none ${
      err
        ? "border-red-400/80 focus:border-red-400"
        : "border-gold/40 text-ivory focus:border-gold"
    }`;

  return (
    <section id="rsvp" className="py-24 px-6 relative bg-surface border-t border-gold/20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Konfirmasi Kehadiran"
          title="RSVP & Doa Restu"
          subtitle="Mohon konfirmasikan kehadiran serta titipkan doa terbaik Anda"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form */}
          <Reveal className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-night/90 border border-gold/40 relative backdrop-blur-md gold-box-shadow">
              <h3 className="font-cinzel text-xl font-bold text-gold mb-6">
                Konfirmasi Kehadiran
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5 text-left" noValidate>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ivory/80 font-semibold mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Contoh: Bpk. Bambang & Ibu"
                    className={inputClass(errors.name)}
                  />
                  {errors.name ? (
                    <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ivory/80 font-semibold mb-2">
                      Konfirmasi Kehadiran
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) => update("status", e.target.value)}
                      className={inputClass()}
                    >
                      <option value="Hadir">Hadir</option>
                      <option value="Tidak Hadir">Tidak Hadir (Berhalangan)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ivory/80 font-semibold mb-2">
                      Jumlah Tamu
                    </label>
                    <select
                      value={form.pax}
                      onChange={(e) => update("pax", e.target.value)}
                      className={inputClass()}
                    >
                      <option value="1 Orang">1 Orang</option>
                      <option value="2 Orang">2 Orang</option>
                      <option value="3 Orang">3 Orang</option>
                      <option value="4 Orang">4 Orang</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ivory/80 font-semibold mb-2">
                    Ucapan &amp; Doa Restu
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tuliskan untaian doa dan ucapan selamat untuk kedua mempelai..."
                    className={inputClass(errors.message)}
                  />
                  {errors.message ? (
                    <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                  ) : null}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-4 rounded-xl gold-gradient-bg text-night font-bold uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition shadow-lg gold-glow inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Kirim Ucapan &amp; Konfirmasi
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="py-4 px-6 rounded-xl border border-emerald-500 bg-emerald-600/20 hover:bg-emerald-600 hover:text-white text-emerald-400 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition shadow"
                  >
                    {sentViaWa ? <Heart className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                    {sentViaWa ? "Membuka WA..." : "Kirim via WA"}
                  </button>
                </div>

                <AnimatePresence>
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 px-4 py-3 rounded-xl bg-emerald-600/15 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2">
                        <Heart className="w-4 h-4 shrink-0" />
                        Terima kasih! Doa restu dan konfirmasi kehadiran Anda telah tersimpan.
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </form>
            </div>
          </Reveal>

          {/* Wish list */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-night/90 border border-gold/40 relative backdrop-blur-md gold-box-shadow flex flex-col h-[560px]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gold/30">
                <h3 className="font-cinzel text-lg font-bold text-gold">
                  Untaian Doa Tamu
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-maroon text-goldlight border border-gold/40">
                  {allWishes.length} Ucapan
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                <AnimatePresence initial={false}>
                  {allWishes.map((w, i) => (
                    <motion.div
                      key={w.id || `seed-${i}`}
                      layout
                      initial={{ opacity: 0, y: 16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="p-4 rounded-2xl bg-surface/80 border border-gold/25"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-sans font-bold text-xs text-gold">
                          {w.name}{" "}
                          <span className="text-[10px] text-ivory/60 font-normal">
                            ({w.status}
                            {w.status === "Hadir" ? ` • ${w.pax}` : ""})
                          </span>
                        </h4>
                        <span className="text-[10px] text-ivory/40 shrink-0 ml-2">{w.time}</span>
                      </div>
                      <p className="text-xs text-ivory/80 leading-relaxed font-sans">
                        &ldquo;{w.message}&rdquo;
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}