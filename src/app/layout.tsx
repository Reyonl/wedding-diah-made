import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { AudioProvider } from "@/components/providers/AudioProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { wedding } from "@/data/wedding";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://reyonl.github.io/wedding-diah-made/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `The Wedding of ${wedding.bride.nick} & ${wedding.groom.nick} | Undangan Pernikahan`,
  description: `Pernikahan ${wedding.bride.name} & ${wedding.groom.name} — ${wedding.date.fullDate}. ${wedding.hashtag}`,
  keywords: [
    "undangan pernikahan",
    wedding.bride.name,
    wedding.groom.name,
    `${wedding.bride.nick} & ${wedding.groom.nick}`,
    wedding.hashtag,
    "undangan digital",
    "Minangkabau",
    "Bali",
  ],
  openGraph: {
    type: "website",
    title: `The Wedding of ${wedding.bride.nick} & ${wedding.groom.nick}`,
    description: `Kami mengundang Anda untuk hadir berbagi kebahagiaan pada ${wedding.date.fullDate}. ${wedding.hashtag}`,
    url: siteUrl,
    images: ["/images/cover.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `The Wedding of ${wedding.bride.nick} & ${wedding.groom.nick}`,
    description: `${wedding.date.fullDate} — ${wedding.hashtag}`,
    images: ["/images/cover.jpg"],
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
      className={`${cormorant.variable} ${plusJakarta.variable}`}
    >
      <body className="bg-night text-ivory font-sans antialiased overflow-x-hidden selection:bg-gold selection:text-night">
        <SmoothScroll>
          <AudioProvider>
            <ToastProvider>{children}</ToastProvider>
          </AudioProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}