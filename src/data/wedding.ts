/**
 * Single Source of Truth for Wedding Data
 * The Wedding of Diah Insani (Minangkabau) & I Made Ariana Putra (Balinese)
 * Date: Saturday, 28 November 2026
 */

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}

export interface BankAccount {
  bank: string;
  number: string;
  holder: string;
}

export interface WeddingData {
  bride: {
    name: string;
    nick: string;
    child: string;
    father: string;
    mother: string;
    parents: string;
    instagram: string;
    instagramHandle: string;
    photo: string;
  };
  groom: {
    name: string;
    nick: string;
    child: string;
    father: string;
    mother: string;
    parents: string;
    instagram: string;
    instagramHandle: string;
    photo: string;
    groomBaliPhoto?: string;
  };
  date: {
    day: string;
    fullDate: string;
    dateOnly: string;
    iso: string;
    countdownTarget: string;
  };
  akad: {
    title: string;
    time: string;
  };
  resepsi: {
    title: string;
    time: string;
  };
  venue: {
    name: string;
    address: string;
  };
  maps: string;
  gifts: {
    bca: BankAccount;
    mandiri: BankAccount;
  };
  hashtag: string;
  music: {
    src: string;
    title: string;
  };
  greeting: {
    text: string;
    showOmSwastyastu: boolean;
  };
  whatsappNumber: string;
  rsvpEndpoint: string;
  photos: {
    cover: string;
    bride: string;
    groom: string;
    groomBaliPhoto?: string;
    gallery: GalleryItem[];
  };
  navLinks: Array<{ href: string; label: string }>;
}

export const wedding: WeddingData = {
  bride: {
    name: "Diah Insani",
    nick: "Diah",
    child: "Putri ke-2",
    father: "Alm. Maraidijon M. Eza",
    mother: "Rina Mardiah",
    parents: "Putri ke-2 dari Alm. Maraidijon M. Eza dan Ibu Rina Mardiah",
    instagram: "https://www.instagram.com/diahinsani12/",
    instagramHandle: "@diahinsani12",
    photo: "/images/mempelai-wanita.jpg",
  },
  groom: {
    name: "I Made Ariana Putra",
    nick: "Made",
    child: "Putra ke-2",
    father: "I Wayan Beratha",
    mother: "Ni Komang Merdani",
    parents: "Putra ke-2 dari Bapak I Wayan Beratha dan Ibu Ni Komang Merdani",
    instagram: "https://www.instagram.com/tambak_grokgak/",
    instagramHandle: "@tambak_grokgak",
    photo: "/images/mempelai-pria.jpg",
    // Optional Balinese costume photo; undefined if missing from assets
    groomBaliPhoto: undefined,
  },
  date: {
    day: "Sabtu",
    fullDate: "Sabtu, 28 November 2026",
    dateOnly: "28 November 2026",
    iso: "2026-11-28T08:00:00+07:00",
    countdownTarget: "2026-11-28T08:00:00+07:00",
  },
  akad: {
    title: "Akad Nikah & Pemberkatan",
    time: "08.00 - 10.00 WIB", // TODO: confirm time
  },
  resepsi: {
    title: "Resepsi",
    time: "11.00 - 14.00 WIB", // TODO: confirm time
  },
  venue: {
    name: "Kediaman Mempelai Wanita (Diah Insani)",
    address: "Jl. Dayung IIIC No. 6", // Canonical address constant used everywhere
  },
  maps: "https://maps.app.goo.gl/PXkcZmXVvkohWC269",
  gifts: {
    bca: {
      bank: "BCA",
      number: "2020507023",
      holder: "I Made Ariana Putra",
    },
    mandiri: {
      bank: "Mandiri",
      number: "1760004245781",
      holder: "Diah Insani",
    },
  },
  hashtag: "#DiahMade",
  music: {
    src: "/audio/baralek-gadang.mp3",
    title: "Baralek Gadang",
  },
  greeting: {
    text: "Assalamualaikum Wr. Wb.",
    showOmSwastyastu: false,
  },
  whatsappNumber: "", // TODO: add bride/groom WhatsApp number
  rsvpEndpoint: process.env.NEXT_PUBLIC_RSVP_URL || "",
  photos: {
    cover: "/images/cover.jpg",
    bride: "/images/mempelai-wanita.jpg",
    groom: "/images/mempelai-pria.jpg",
    groomBaliPhoto: undefined,
    gallery: [
      {
        src: "/images/gallery-1.jpg",
        alt: "Diah & Made di tepi dermaga danau",
        caption: "Dermaga Kasih",
      },
      {
        src: "/images/gallery-2.jpg",
        alt: "Diah & Made bersanding di tepian danau",
        caption: "Tepian Damai",
      },
      {
        src: "/images/gallery-3.jpg",
        alt: "Momen manis di dekat mobil klasik merah",
        caption: "Kenangan Klasik",
      },
      {
        src: "/images/gallery-4.jpg",
        alt: "Potret berdua di jembatan merah",
        caption: "Jembatan Kasih",
      },
      {
        src: "/images/gallery-5.jpg",
        alt: "Suasana senja di samping air mancur",
        caption: "Senja Keemasan",
      },
      {
        src: "/images/gallery-6.jpg",
        alt: "Keceriaan bersama motor klasik",
        caption: "Jejak Langkah",
      },
    ],
  },
  navLinks: [
    { href: "#mempelai", label: "Mempelai" },
    { href: "#acara", label: "Acara" },
    { href: "#galeri", label: "Galeri" },
    { href: "#hadiah", label: "Tanda Kasih" },
    { href: "#rsvp", label: "RSVP" },
  ],
};

export function formatCountdownParts(msLeft: number) {
  const s = Math.max(0, Math.floor(msLeft / 1000));
  return {
    days: String(Math.floor(s / 86400)).padStart(2, "0"),
    hours: String(Math.floor((s % 86400) / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((s % 3600) / 60)).padStart(2, "0"),
    seconds: String(s % 60).padStart(2, "0"),
  };
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
