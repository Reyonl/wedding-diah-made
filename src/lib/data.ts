// ─────────────────────────────────────────────────────────────
// The Wedding of Diah & Made — single source of truth
// Semua data undangan (mempelai, acara, galeri, rekening, dll).
// ─────────────────────────────────────────────────────────────

export const wedding = {
  hashtag: "#DiahMade",
  couple: {
    bride: {
      fullName: "Diah Insani",
      shortName: "Diah",
      instagram: "@diahinsani12",
      instagramUrl: "https://www.instagram.com/diahinsani12/",
      parents: "Putri ke-2 dari Alm. Maraidijon M. Eza & Ibu Rina Mardiah",
      parentsShort: "Alm. Maraidijon M. Eza & Ibu Rina Mardiah",
      culture: "Keluarga Besar Minangkabau",
      photo: "/images/mempelai-wanita.jpg",
    },
    groom: {
      fullName: "I Made Ariana Putra",
      shortName: "Made",
      instagram: "@tambak_grokgak",
      instagramUrl: "https://www.instagram.com/tambak_grokgak/",
      parents: "Putra ke-2 dari Bapak I Wayan Beratha & Ibu Ni Komang Merdani",
      parentsShort: "Bapak I Wayan Beratha & Ibu Ni Komang Merdani",
      culture: "Keluarga Besar Bali",
      photo: "/images/mempelai-pria.jpg",
    },
  },
  events: {
    akad: {
      name: "Akad Nikah & Pemberkatan",
      dayDate: "Sabtu, 28 November 2026",
      time: "08.00 – 10.00 WIB",
      venue: "Kediaman Mempelai Wanita",
      address: "Jl. Dayung IIIC No. 6",
      icon: "ring" as const,
    },
    resepsi: {
      name: "Resepsi Adat & Syukuran",
      dayDate: "Sabtu, 28 November 2026",
      time: "11.00 – 14.00 WIB",
      venue: "Kediaman Mempelai Wanita",
      address: "Jl. Dayung III No. 6",
      icon: "party" as const,
    },
  },
  mapLink: "https://maps.app.goo.gl/PXkcZmXVvkohWC269",
  audio: "/audio/baralek_gadang.mp3",
  audioTitle: "Baralek Gadang",
  audioSubtitle: "Lagu Minang Tradisional",
  coverPhoto: "/images/cover.jpg",
  weddingDateISO: "2026-11-28T08:00:00+07:00", // Akad — target countdown
  calendar: {
    // Google Calendar quick-add (UTC, all-day window for the ceremony date)
    text: "The Wedding of Diah & Made",
    details:
      "Pernikahan Diah Insani & I Made Ariana Putra — Akad 08.00 WIB, Resepsi 11.00 WIB. Menunggu kedatangan Bapak/Ibu/Saudara/i dengan suka cita. #DiahMade",
    location: "Jl. Dayung IIIC No. 6, Jakarta",
    dates: "20261128T010000Z/20261128T070000Z",
  },
  gallery: [
    {
      src: "/images/gallery-1.jpg",
      title: "Dermaga Cinta & Langkah Bersama",
      desc: "Genggaman erat di tepian dermaga menjadi lambang komitmen awal kami mengayuh biduk rumah tangga bersama.",
    },
    {
      src: "/images/gallery-2.jpg",
      title: "Pandangan Hangat Dua Jiwa",
      desc: "Dua insan yang dipersatukan dalam cinta, keyakinan, dan restu tulus dari kedua belah pihak keluarga besar.",
    },
    {
      src: "/images/gallery-3.jpg",
      title: "Kisah Klasik Mobil Antik",
      desc: "Momen keceriaan dan canda tawa di sisi mobil antik klasik kuning menjadi kenangan tak terlupakan sepanjang masa.",
    },
    {
      src: "/images/gallery-4.jpg",
      title: "Dua Hati di Tepi Telaga",
      desc: "Kesejukan semilir angin dan percikan air telaga mengiringi dekapan hangat janji suci kedua mempelai.",
    },
    {
      src: "/images/gallery-5.jpg",
      title: "Keceriaan di Titian Jembatan",
      desc: "Mengabadikan potret bahagia saat melangkah berdua meniti jembatan merah kehidupan nan penuh harapan.",
    },
    {
      src: "/images/gallery-6.jpg",
      title: "Melaju Bersama Menuju Masa Depan",
      desc: "Bersama motor klasik Honda CB di bawah temaram senja keemasan, siap mengarungi setiap jalan kehidupan bersama.",
    },
  ],
  bankAccounts: [
    {
      bank: "BANK BCA",
      noRek: "2020507023",
      holder: "I Made Ariana Putra",
      culture: "✦ BALI",
      cardGradient: "from-[#2a1c0d] via-[#3d2a12] to-[#5a3a14]",
      accent: "#f2c94c",
    },
    {
      bank: "MANDIRI",
      noRek: "1760004245781",
      holder: "Diah Insani",
      culture: "✦ MINANG",
      cardGradient: "from-[#2a120f] via-[#3d1813] to-[#5a1c14]",
      accent: "#f2c94c",
    },
  ],
  // Ucapan awal (buku tamu) — diisi default lalu digabung dengan localStorage
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
  navLinks: [
    { href: "#mempelai", label: "Mempelai" },
    { href: "#savethedate", label: "Waktu" },
    { href: "#acara", label: "Acara" },
    { href: "#galeri", label: "Galeri" },
    { href: "#hadiah", label: "Tanda Kasih" },
    { href: "#rsvp", label: "RSVP" },
  ],
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