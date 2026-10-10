import type { Metadata } from "next";
import { ClientWedding } from "@/components/ClientWedding";
import { wedding } from "@/lib/data";
import { asset } from "@/lib/asset";

const desc =
  "Pernikahan Diah Insani & I Made Ariana Putra — Sabtu, 28 November 2026. Perpaduan luhur adat Minangkabau dan Bali. #DiahMade";

export const metadata: Metadata = {
  title: "The Wedding of Diah & Made | Undangan Pernikahan",
  description: desc,
  openGraph: {
    title: "The Wedding of Diah & Made",
    description: desc,
    images: [asset(wedding.coverPhoto)],
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-night text-ivory font-sans">
      <ClientWedding />
    </main>
  );
}