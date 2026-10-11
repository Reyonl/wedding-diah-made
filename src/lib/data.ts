// ─────────────────────────────────────────────────────────────
// Compatibility adapter re-exporting from single source of truth
// Primary data lives in src/data/wedding.ts
// ─────────────────────────────────────────────────────────────

import { wedding as canonicalWedding } from "@/data/wedding";

export { canonicalWedding };

export const wedding = {
  hashtag: canonicalWedding.hashtag,
  couple: {
    bride: {
      fullName: canonicalWedding.bride.name,
      shortName: canonicalWedding.bride.nick,
      instagram: canonicalWedding.bride.instagramHandle,
      instagramUrl: canonicalWedding.bride.instagram,
      parents: canonicalWedding.bride.parents,
      parentsShort: `${canonicalWedding.bride.father} & ${canonicalWedding.bride.mother}`,
      culture: "Keluarga Besar Minangkabau",
      photo: canonicalWedding.photos.bride,
    },
    groom: {
      fullName: canonicalWedding.groom.name,
      shortName: canonicalWedding.groom.nick,
      instagram: canonicalWedding.groom.instagramHandle,
      instagramUrl: canonicalWedding.groom.instagram,
      parents: canonicalWedding.groom.parents,
      parentsShort: `${canonicalWedding.groom.father} & ${canonicalWedding.groom.mother}`,
      culture: "Keluarga Besar Bali",
      photo: canonicalWedding.photos.groom,
      groomBaliPhoto: canonicalWedding.photos.groomBaliPhoto,
    },
  },
  events: {
    akad: {
      name: canonicalWedding.akad.title,
      dayDate: canonicalWedding.date.fullDate,
      time: canonicalWedding.akad.time,
      venue: canonicalWedding.venue.name,
      address: canonicalWedding.venue.address, // Canonical address: Jl. Dayung IIIC No. 6
      icon: "ring" as const,
    },
    resepsi: {
      name: canonicalWedding.resepsi.title,
      dayDate: canonicalWedding.date.fullDate,
      time: canonicalWedding.resepsi.time,
      venue: canonicalWedding.venue.name,
      address: canonicalWedding.venue.address, // Canonical address: Jl. Dayung IIIC No. 6 (fixed bug)
      icon: "party" as const,
    },
  },
  mapLink: canonicalWedding.maps,
  audio: canonicalWedding.music.src,
  audioTitle: canonicalWedding.music.title,
  audioSubtitle: "Lagu Minang Tradisional",
  coverPhoto: canonicalWedding.photos.cover,
  weddingDateISO: canonicalWedding.date.iso,
  calendar: {
    text: `The Wedding of ${canonicalWedding.bride.nick} & ${canonicalWedding.groom.nick}`,
    details: `Pernikahan ${canonicalWedding.bride.name} & ${canonicalWedding.groom.name} — Akad 08.00 WIB, Resepsi 11.00 WIB. ${canonicalWedding.hashtag}`,
    location: `${canonicalWedding.venue.address}`,
    dates: "20261128T010000Z/20261128T070000Z",
  },
  gallery: [
    {
      src: "/images/gallery-1.jpg",
      title: "Dermaga Kasih",
      desc: "Langkah bersama di tepian dermaga menjadi lambang komitmen awal kami.",
    },
    {
      src: "/images/gallery-2.jpg",
      title: "Tepian Damai",
      desc: "Dua insan yang dipersatukan dalam cinta dan restu tulus keluarga besar.",
    },
    {
      src: "/images/gallery-3.jpg",
      title: "Kenangan Klasik",
      desc: "Momen keceriaan dan canda tawa di sisi mobil klasik.",
    },
    {
      src: "/images/gallery-4.jpg",
      title: "Jembatan Kasih",
      desc: "Dekapan hangat dan janji suci kedua mempelai di tepi telaga.",
    },
    {
      src: "/images/gallery-5.jpg",
      title: "Senja Keemasan",
      desc: "Mengabadikan potret bahagia di bawah temaram senja keemasan.",
    },
    {
      src: "/images/gallery-6.jpg",
      title: "Jejak Langkah",
      desc: "Keceriaan bersama motor klasik melangkah menuju masa depan berdua.",
    },
  ],
  bankAccounts: [
    {
      bank: canonicalWedding.gifts.mandiri.bank,
      noRek: canonicalWedding.gifts.mandiri.number,
      holder: canonicalWedding.gifts.mandiri.holder,
      culture: "✦ MINANG",
      cardGradient: "from-[#2a120f] via-[#3d1813] to-[#5a1c14]",
      accent: "#f2c94c",
    },
  ],
  seedWishes: [
    {
      name: "Prof. Wayan Sudarta",
      status: "Hadir",
      pax: "2 Orang",
      message:
        "Selamat menempuh hidup baru Made dan Diah. Dumogi langgeng riwekasan, sakinah mawaddah warahmah dalam lindungan Sang Hyang Widhi Wasa.",
      time: "Baru saja",
    },
    {
      name: "Keluarga Besar Datuk Bandaro",
      status: "Hadir",
      pax: "3 Orang",
      message:
        "Barekek balimau, basatu duo pusako adaik nan mulia. Samawa untuak ananda Diah dan Made, rukun dan berkah sampai anak cucu.",
      time: "1 jam lalu",
    },
    {
      name: "Gusti Ayu & Rekan",
      status: "Hadir",
      pax: "2 Orang",
      message:
        "Happy wedding Diah & Made! Cantik dan gagah sekali perpaduan adat Minang dan Balinya. Bahagia dan sukses selalu!",
      time: "3 jam lalu",
    },
  ],
  navLinks: canonicalWedding.navLinks,
};

export function buildCalendarUrl(): string {
  const { calendar } = wedding;
  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", calendar.text);
  url.searchParams.set("dates", calendar.dates);
  url.searchParams.set("details", calendar.details);
  url.searchParams.set("location", calendar.location);
  return url.toString();
}

export function buildWhatsAppUrl(input: {
  name: string;
  status: string;
  pax: string;
  message: string;
}): string {
  const text =
    `Halo Diah & Made!%0A%0A` +
    `Saya *${encodeURIComponent(input.name)}* mengonfirmasi kehadiran untuk acara pernikahan kalian:%0A` +
    `• Kehadiran: *${encodeURIComponent(input.status)}*%0A` +
    `• Jumlah: *${encodeURIComponent(input.pax)}*%0A` +
    `• Doa & Ucapan: "${encodeURIComponent(input.message || "-")}"%0A%0A` +
    `Selamat berbahagia! ${wedding.hashtag}`;
  return `https://api.whatsapp.com/send?text=${text}`;
}

export function formatCountdownParts(msLeft: number) {
  const s = Math.max(0, Math.floor(msLeft / 1000));
  return {
    days: String(Math.floor(s / 86400)).padStart(2, "0"),
    hours: String(Math.floor((s % 86400) / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((s % 3600) / 60)).padStart(2, "0"),
    seconds: String(s % 60).padStart(2, "0"),
  };
}