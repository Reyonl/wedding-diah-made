"use client";

import { useEffect, useState, useRef } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { wedding, buildWhatsAppUrl } from "@/data/wedding";

interface Wish {
  id: string;
  name: string;
  message: string;
  time: string;
}

const STORAGE_KEY = "wedding_diah_made_wishes_v2";

const SEED_WISHES: Wish[] = [
  {
    id: "seed-1",
    name: "Keluarga Besar Datuk Bandaro",
    message: "Barekek balimau, basatu duo pusako adaik nan mulia. Samawa untuak ananda Diah dan Made, rukun dan berkah sampai anak cucu.",
    time: "Baru saja",
  },
  {
    id: "seed-2",
    name: "Prof. Wayan Sudarta & Keluarga",
    message: "Selamat menempuh hidup baru Made dan Diah. Dumogi langgeng riwekasan, sakinah mawaddah warahmah dalam lindungan Sang Hyang Widhi Wasa.",
    time: "1 jam lalu",
  },
  {
    id: "seed-3",
    name: "Rizky Pratama & Amanda",
    message: "Selamat berbahagia Diah & Made! Senang sekali melihat dua insan dan dua budaya yang begitu indah bersatu. Semoga selalu diliputi cinta dan kedamaian.",
    time: "3 jam lalu",
  },
];

export function RsvpSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>(SEED_WISHES);

  const lastSubmitRef = useRef<number>(0);

  // Determine active API endpoint (Hostinger MySQL endpoint or custom URL)
  const getApiEndpoint = () => {
    if (wedding.wishesApiUrl) return wedding.wishesApiUrl;
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      // On Hostinger or custom domain, default to /api/wishes.php
      if (host !== "localhost" && !host.includes("github.io")) {
        return "/api/wishes.php";
      }
    }
    return "";
  };

  // Initialize from localStorage and remote MySQL endpoint
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Wish[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged = [...parsed, ...SEED_WISHES.filter((s) => !parsed.some((p) => p.id === s.id))];
          setWishes(merged);
        }
      }
    } catch {
      // Ignore localStorage errors
    }

    const endpoint = getApiEndpoint();
    if (!endpoint) return;

    const fetchWishes = async () => {
      try {
        const res = await fetch(endpoint, { method: "GET" });
        if (res.ok) {
          const json = await res.json();
          const list = Array.isArray(json) ? json : json.data;
          if (Array.isArray(list) && list.length > 0) {
            setWishes(list);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
            } catch {}
          }
        }
      } catch {
        // Fallback to local wishes
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

    if (!message.trim()) {
      setErrorMessage("Silakan tuliskan kesan, pesan, atau ucapan selamat Anda.");
      return;
    }

    setLoading(true);

    const newWish: Wish = {
      id: String(Date.now()),
      name: name.trim().slice(0, 40),
      message: message.trim().slice(0, 400),
      time: "Baru saja",
    };

    // 3. Submit to Hostinger MySQL endpoint if available
    const endpoint = getApiEndpoint();
    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newWish.name, message: newWish.message }),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.id) {
            newWish.id = String(json.data.id);
            newWish.time = json.data.time || newWish.time;
          }
        }
      } catch {
        // Handled gracefully: wish still persisted locally
      }
    }

    // 4. Update state and localStorage
    const updated = [newWish, ...wishes.filter((w) => w.id !== newWish.id)];
    setWishes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="ucapan" className="py-24 px-6 relative bg-night border-t border-gold/15 scroll-mt-20">
      {/* Hidden anchor for backward-compatibility with #rsvp links */}
      <div id="rsvp" className="absolute -top-24 pointer-events-none" aria-hidden="true" />

      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="heading-section text-ivory mb-3">
            Kesan, Pesan &amp; Doa Restu
          </h2>
          <p className="font-sans text-sm text-ivory/70 max-w-md mx-auto">
            Tuliskan kesan, pesan bahagia, dan ucapan selamat untuk Diah &amp; Made
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-xl mx-auto p-8 rounded-2xl border border-gold/30 bg-surface/80 shadow-xl mb-16">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-cormorant text-2xl font-semibold text-ivory mb-2">
                Terima Kasih atas Doa &amp; Ucapan Anda
              </h3>
              <p className="font-sans text-sm text-ivory/70 mb-6">
                Pesan dan doa restu Anda telah tersampaikan dan sangat berarti bagi kami berdua.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                  }}
                  className="px-6 py-2.5 rounded-full border border-gold/60 text-gold hover:bg-gold/10 text-xs font-sans tracking-wide uppercase transition-colors cursor-pointer"
                >
                  Tulis ucapan lainnya
                </button>
                <a
                  href={buildWhatsAppUrl({ name, message })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-gold hover:bg-gold-light text-night text-xs font-sans font-semibold tracking-wide uppercase transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Kirim ke WhatsApp
                </a>
              </div>
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
                  Nama Anda *
                </label>
                <input
                  type="text"
                  required
                  maxLength={40}
                  placeholder="Contoh: Budi Santoso & Keluarga"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-night border border-gold/40 text-ivory placeholder-ivory/30 text-sm font-sans focus-visible:border-gold focus-visible:outline-none"
                />
              </div>

              {/* Field: Kesan, Pesan & Ucapan */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-sans uppercase tracking-wider text-ivory/80">
                    Kesan, Pesan &amp; Ucapan Selamat *
                  </label>
                  <span className="text-[11px] font-sans text-ivory/50">
                    {message.length} / 400
                  </span>
                </div>
                <textarea
                  rows={4}
                  required
                  maxLength={400}
                  placeholder="Tuliskan kesan, pesan, atau ucapan selamat dan doa restu..."
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
                <span>{loading ? "Mengirim..." : "Kirim Ucapan"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Untaian Doa & Pesan List */}
        <div className="max-w-2xl mx-auto">
          <h3 className="font-cormorant text-2xl font-semibold text-ivory text-center mb-8">
            Untaian Doa &amp; Pesan Hangat
          </h3>

          {wishes.length === 0 ? (
            <p className="text-center text-sm font-sans text-ivory/50 py-8">
              Belum ada ucapan. Jadilah yang pertama menyampaikan doa restu.
            </p>
          ) : (
            <div className="space-y-4 max-h-[560px] overflow-y-auto pr-1">
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
                      {w.time}
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-ivory/85 leading-relaxed whitespace-pre-wrap">
                    {w.message}
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