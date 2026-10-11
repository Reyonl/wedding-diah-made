"use client";

import { useEffect, useState, useRef } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { wedding, buildWhatsAppUrl } from "@/data/wedding";

interface Wish {
  id: string;
  name: string;
  status: string;
  pax: string;
  message: string;
  time: string;
}

const SEED_WISHES: Wish[] = [
  {
    id: "seed-1",
    name: "Keluarga Besar Datuk Bandaro",
    status: "Hadir",
    pax: "3",
    message: "Barekek balimau, basatu duo pusako adaik nan mulia. Samawa untuak ananda Diah dan Made, rukun dan berkah sampai anak cucu.",
    time: "Baru saja",
  },
  {
    id: "seed-2",
    name: "Prof. Wayan Sudarta & Keluarga",
    status: "Hadir",
    pax: "2",
    message: "Selamat menempuh hidup baru Made dan Diah. Dumogi langgeng riwekasan, sakinah mawaddah warahmah dalam lindungan Sang Hyang Widhi Wasa.",
    time: "1 jam lalu",
  },
];

export function RsvpSection() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Hadir");
  const [pax, setPax] = useState("1");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>(SEED_WISHES);

  const lastSubmitRef = useRef<number>(0);

  // Fetch wishes from Google Apps Script endpoint if configured
  useEffect(() => {
    if (!wedding.rsvpEndpoint) return;
    const fetchWishes = async () => {
      try {
        const res = await fetch(wedding.rsvpEndpoint, { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setWishes(data);
          }
        }
      } catch {
        // Fallback to initial seed wishes
      }
    };
    fetchWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // 1. Honeypot check (anti-bot)
    if (honeypot) {
      return;
    }

    // 2. Client-side throttle (5 seconds limit between submits)
    const now = Date.now();
    if (now - lastSubmitRef.current < 5000) {
      setErrorMessage("Mohon tunggu beberapa detik sebelum mengirim kembali.");
      return;
    }
    lastSubmitRef.current = now;

    if (!name.trim()) {
      setErrorMessage("Silakan masukkan nama Anda.");
      return;
    }

    setLoading(true);

    const newWish: Wish = {
      id: String(Date.now()),
      name: name.trim().slice(0, 40),
      status,
      pax,
      message: message.trim().slice(0, 300),
      time: "Baru saja",
    };

    // 3. If no rsvpEndpoint is configured, fall back to WhatsApp URL
    if (!wedding.rsvpEndpoint) {
      setLoading(false);
      setSubmitted(true);
      setWishes((prev) => [newWish, ...prev]);

      // Open WhatsApp with prefilled message
      const waUrl = buildWhatsAppUrl({
        name: newWish.name,
        status: newWish.status,
        pax: `${newWish.pax} Orang`,
        message: newWish.message,
      });
      window.open(waUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // 4. Submit via POST to Google Apps Script endpoint
    try {
      const res = await fetch(wedding.rsvpEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWish),
        mode: "no-cors", // Google Apps Script Web App standard redirection
      });
      void res;
      setSubmitted(true);
      setWishes((prev) => [newWish, ...prev]);
    } catch {
      // Fallback
      setSubmitted(true);
      setWishes((prev) => [newWish, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 px-6 relative bg-night border-t border-gold/15">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="heading-section text-ivory mb-3">
            Konfirmasi Kehadiran
          </h2>
          <p className="font-sans text-sm text-ivory/70 max-w-md mx-auto">
            Kehadiran dan doa restu Anda merupakan kehormatan terbesar bagi kami
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-xl mx-auto p-8 rounded-2xl border border-gold/30 bg-surface/80 shadow-xl mb-16">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-cormorant text-2xl font-semibold text-ivory mb-2">
                Terima Kasih atas Konfirmasi Anda
              </h3>
              <p className="font-sans text-sm text-ivory/70 mb-6">
                Doa dan konfirmasi kehadiran Anda telah tercatat dengan baik.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setMessage("");
                }}
                className="text-xs font-sans text-gold underline underline-offset-4 cursor-pointer"
              >
                Kirim ucapan lainnya
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Hidden honeypot field (anti-spam) */}
              <input
                type="text"
                name="website_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {/* Field: Nama */}
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-ivory/80 mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  maxLength={40}
                  placeholder="Contoh: Bpk. Budi Santoso"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-night border border-gold/40 text-ivory placeholder-ivory/30 text-sm font-sans focus-visible:border-gold focus-visible:outline-none"
                />
              </div>

              {/* Field: Kehadiran */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-ivory/80 mb-2">
                    Kehadiran
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-night border border-gold/40 text-ivory text-sm font-sans focus-visible:border-gold focus-visible:outline-none cursor-pointer"
                  >
                    <option value="Hadir">Hadir</option>
                    <option value="Tidak Hadir">Tidak Hadir</option>
                  </select>
                </div>

                {/* Field: Jumlah Tamu (1-5) */}
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-ivory/80 mb-2">
                    Jumlah Tamu
                  </label>
                  <select
                    value={pax}
                    onChange={(e) => setPax(e.target.value)}
                    disabled={status === "Tidak Hadir"}
                    className="w-full px-4 py-3 rounded-xl bg-night border border-gold/40 text-ivory text-sm font-sans focus-visible:border-gold focus-visible:outline-none disabled:opacity-40 cursor-pointer"
                  >
                    <option value="1">1 Orang</option>
                    <option value="2">2 Orang</option>
                    <option value="3">3 Orang</option>
                    <option value="4">4 Orang</option>
                    <option value="5">5 Orang</option>
                  </select>
                </div>
              </div>

              {/* Field: Ucapan (max 300 chars with counter) */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-sans uppercase tracking-wider text-ivory/80">
                    Doa &amp; Ucapan
                  </label>
                  <span className="text-[11px] font-sans text-ivory/50">
                    {message.length} / 300
                  </span>
                </div>
                <textarea
                  rows={3}
                  maxLength={300}
                  placeholder="Tuliskan doa restu untuk kedua mempelai..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-night border border-gold/40 text-ivory placeholder-ivory/30 text-sm font-sans focus-visible:border-gold focus-visible:outline-none resize-none"
                />
              </div>

              {errorMessage ? (
                <p className="text-xs text-rose-400 font-sans">{errorMessage}</p>
              ) : null}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-gold hover:bg-gold-light text-night font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-night" />
                <span>{loading ? "Mengirim..." : "Kirim Konfirmasi"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Wishes List (Rendered as clean plain text) */}
        <div className="max-w-2xl mx-auto">
          <h3 className="font-cormorant text-2xl font-semibold text-ivory text-center mb-8">
            Untaian Doa &amp; Harapan
          </h3>

          {wishes.length === 0 ? (
            <p className="text-center text-sm font-sans text-ivory/50 py-8">
              Belum ada ucapan. Jadilah yang pertama.
            </p>
          ) : (
            <div className="space-y-4">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="p-5 rounded-xl border border-gold/20 bg-surface/60"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-cormorant text-lg font-semibold text-gold-light">
                      {w.name}
                    </span>
                    <span className="text-[11px] font-sans text-ivory/45">
                      {w.status === "Hadir" ? "Hadir" : "Berhalangan"}
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-ivory/80 leading-relaxed">
                    {w.message || "—"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}