import type { Metadata, Viewport } from "next";
import {
  Cinzel_Decorative,
  Cormorant_Garamond,
  Great_Vibes,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { AudioProvider } from "@/components/providers/AudioProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { asset } from "@/lib/asset";

const cinzelDeco = Cinzel_Decorative({
  variable: "--font-cinzel-deco",
  weight: ["700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://reyonl.github.io/wedding-diah-made/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Wedding of Diah & Made | Undangan Pernikahan",
  description:
    "Pernikahan Diah Insani & I Made Ariana Putra — Sabtu, 28 November 2026. Perpaduan luhur adat Minangkabau dan Bali dalam satu ikatan suci. #DiahMade",
  keywords: [
    "undangan pernikahan",
    "Diah Insani",
    "I Made Ariana Putra",
    "Diah & Made",
    "#DiahMade",
    "undangan digital",
    "Minangkabau",
    "Bali",
  ],
  openGraph: {
    type: "website",
    title: "The Wedding of Diah & Made",
    description:
      "Kami mengundang Anda untuk hadir berbagi kebahagiaan pada Sabtu, 28 November 2026. #DiahMade",
    url: siteUrl,
    images: [asset("/images/cover.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Diah & Made",
    description: "Sabtu, 28 November 2026 — #DiahMade",
    images: [asset("/images/cover.jpg")],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0a08",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${cinzelDeco.variable} ${cormorant.variable} ${greatVibes.variable} ${plusJakarta.variable}`}
    >
      <body className="bg-night text-ivory font-sans antialiased overflow-x-hidden">
        <SmoothScroll>
          <AudioProvider>
            <ToastProvider>{children}</ToastProvider>
          </AudioProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}