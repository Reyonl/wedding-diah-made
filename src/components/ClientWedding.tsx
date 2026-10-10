"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { CoupleSection } from "@/components/sections/CoupleSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { EventSection } from "@/components/sections/EventSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { GiftSection } from "@/components/sections/GiftSection";
import { RsvpSection } from "@/components/sections/RsvpSection";
import { Footer } from "@/components/Footer";
import { AudioPlayer } from "@/components/AudioPlayer";

/**
 * GuestGate: menyembunyikan seluruh konten undangan sampai gerbang dibuka.
 * Membaca ?to=Nama+Tamu untuk personalisasi kartu.
 */
function GuestGate({ guestName }: { guestName: string }) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Navbar visible={opened} />
              <HeroSection guestName={guestName} onOpened={() => setOpened(true)} />

      {opened ? (
        <>
          <WelcomeSection />
          <CoupleSection />
          <CountdownSection />
          <EventSection />
          <GallerySection />
          <GiftSection />
          <RsvpSection />
          <Footer />
          <AudioPlayer />
        </>
      ) : null}
    </>
  );
}

function ClientWeddingInner() {
  const searchParams = useSearchParams();
  const guestName = useMemo(() => {
    const raw = searchParams.get("to") || searchParams.get("u") || searchParams.get("guest");
    if (!raw) return "Tamu Undangan Terhormat";
    // Bersihkan input, batasi panjang.
    const clean = raw.trim().replace(/\s+/g, " ").slice(0, 60);
    return clean || "Tamu Undangan Terhormat";
  }, [searchParams]);

  return <GuestGate guestName={guestName} />;
}

export function ClientWedding() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-night" />}>
      <ClientWeddingInner />
    </Suspense>
  );
}