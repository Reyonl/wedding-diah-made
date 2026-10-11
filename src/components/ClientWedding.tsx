"use client";

import { useEffect, useState } from "react";
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
 * ClientWedding Orchestrator
 * Parses ?to=Nama with new URLSearchParams(window.location.search) in useEffect (Hard Rule 3).
 * Trims input, caps at 40 chars, defaults to "Bapak/Ibu/Saudara/i".
 */
export function ClientWedding() {
  const [guestName, setGuestName] = useState("Bapak/Ibu/Saudara/i");
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const raw = params.get("to") || params.get("u") || params.get("guest");
      if (raw) {
        const clean = raw.trim().replace(/\s+/g, " ").slice(0, 40);
        if (clean) setGuestName(clean);
      }
    } catch {
      // Fallback stays "Bapak/Ibu/Saudara/i"
    }
  }, []);

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