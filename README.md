# 💍 The Wedding of Diah & Made

> **Royal Balinese & Minangkabau Cultural Fusion Wedding Invitation**
> Perpaduan luhur adat istiadat Minangkabau dan ageman keraton Bali dalam satu ikatan suci pernikahan.

🌐 **Live Website:** [https://reyonl.github.io/wedding-diah-made/](https://reyonl.github.io/wedding-diah-made/)

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide React · Lenis · Web Audio API

---

## ✨ Fitur Undangan Digital

| Fitur | Detail |
|---|---|
| **Opening Gate** | Gerbang Candi Bentar membuka dengan **spring animation** (`AnimatePresence`) saat *"Buka Undangan"* diklik |
| **Guest Personalization** | Baca `?to=Nama+Tamu` (juga `?u=` / `?guest=`) → kartu undangan tamu dinamis |
| **Parallax & Scroll Reveal** | Motion reveal tiap seksi saat masuk viewport |
| **Lightbox Gallery** | Transisi **shared `layoutId`** yang mulus + navigasi keyboard/touch |
| **Audio Manager** | **Web Audio API** (`AnalyserNode`) + visualizer equalizer hidup, autoplay aman dari gesture, floating player |
| **Countdown Timer** | Presisi ke akad 28 Nov 2026 08.00 WIB (UTC+7) |
| **Calendar Sync** | 1-klik simpan agenda ke Google Calendar |
| **Digital Envelope** | Kartu bank BCA & Mandiri luxury + copy nomor + **toast notification** |
| **RSVP & Buku Tamu** | Form validasi state, persist ke **localStorage**, kirim konfirmasi via **WhatsApp** |
| **Desain Responsif** | Optimal di smartphone (iPhone/Android), tablet, dan desktop |

## 👰🤵 Mempelai

- **Mempelai Wanita:** Diah Insani ([@diahinsani12](https://www.instagram.com/diahinsani12/))
  *Putri ke-2 dari Alm. Maraidijon M. Eza & Ibu Rina Mardiah (Minangkabau)*
- **Mempelai Pria:** I Made Ariana Putra ([@tambak_grokgak](https://www.instagram.com/tambak_grokgak/))
  *Putra ke-2 dari Bapak I Wayan Beratha & Ibu Ni Komang Merdani (Bali)*

## 📅 Rangkaian Acara

- **Akad Nikah / Pemberkatan:** Sabtu, 28 November 2026 · 08.00 – 10.00 WIB
  - Lokasi: Rumah Mempelai Wanita, Jl. Dayung IIIC No 6 — [Google Maps](https://maps.app.goo.gl/PXkcZmXVvkohWC269)
- **Resepsi Pernikahan:** Sabtu, 28 November 2026 · 11.00 – 14.00 WIB
  - Lokasi: Rumah Mempelai Wanita, Jl. Dayung III No 6 — [Google Maps](https://maps.app.goo.gl/PXkcZmXVvkohWC269)

**Amplop Digital:** BCA 2020507023 (I Made Ariana Putra) · Mandiri 1760004245781 (Diah Insani)

## 🏗️ Arsitektur

```
src/
├── app/
│   ├── layout.tsx          # Font, metadata, provider tree
│   ├── page.tsx            # SSG route "/" (static export)
│   └── globals.css         # Tailwind v4 @theme + design tokens
├── components/
│   ├── providers/          # SmoothScroll (Lenis), AudioProvider, ToastProvider
│   ├── sections/           # Hero, Welcome, Couple, Countdown, Event,
│   │                       # Gallery, Gift, RSVP
│   ├── ornaments/          # Candi Bentar gate, Falling petals, Gonjong roof
│   ├── ui/                 # Reveal (scroll animations), InstagramIcon
│   ├── Navbar.tsx          # Sticky nav + scroll progress
│   ├── AudioPlayer.tsx     # Floating player + equalizer
│   ├── Footer.tsx
│   └── ClientWedding.tsx   # Guest gate + guest-name personalization
├── lib/
│   ├── data.ts             # Single source of truth (data undangan)
│   └── asset.ts            # basePath-aware asset helper
public/
├── images/                 # Foto (optimized: cover, mempelai, galeri)
└── audio/baralek_gadang.mp3
```

## 💻 Menjalankan Secara Lokal

```bash
// Install dependencies
npm install

// Development (hot reload, root path)
npm run dev            // → http://localhost:3000/?to=Nama+Tamu

// Production static export untuk GitHub Pages (subpath /wedding-diah-made/)
npm run build:pages

// Preview hasil export di subpath
npm run serve          // → http://localhost:3124/wedding-diah-made/?to=Nama+Tamu

// Quality gates
npm run typecheck && npm run lint
```

## 🚀 Deploy (GitHub Actions)

Workflow `.github/workflows/deploy.yml` otomatis build & deploy ke **GitHub Pages**
setiap push ke `master`:

1. `npm ci`
2. `npm run build` dengan `NEXT_PUBLIC_BASE_PATH=/wedding-diah-made`
3. Upload artifact `out/` → GitHub Pages

> **Penting:** Set **Settings → Pages → Source: "GitHub Actions"** (bukan *Deploy from a branch*).
> Karena repo di-host di subpath `/wedding-diah-made/`, build **wajib** memakai
> `NEXT_PUBLIC_BASE_PATH` agar asset tidak 404.

## 🎼 Musik

`public/audio/baralek_gadang.mp3` — lagu tradisional Minang *"Baralek Gadang"*.
Autoplay hanya di-trigger dari gesture user (tombol *Buka Undangan* / play) — aman
untuk kebijakan autoplay browser mobile.

## 📝 Catatan Teknis

- **basePath:** Semua asset publik diakses lewat helper `asset()` (`src/lib/asset.ts`)
  sehingga otomatis ter-prefix `/wedding-diah-made` di produksi.
- **Static export:** `output: "export"` — tanpa server runtime.
- **Fonts:** Google Fonts via `next/font` (Cinzel Decorative, Cormorant Garamond,
  Great Vibes, Plus Jakarta Sans) — di-optimasi saat build, bebas CLS.
- **Reduced motion:** Animasi & smooth-scroll dinonaktifkan otomatis saat
  `prefers-reduced-motion: reduce`.

---

**© 2026 The Wedding of Diah & Made. All rights reserved.** · `#DiahMade`