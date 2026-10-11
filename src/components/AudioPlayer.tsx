"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { wedding } from "@/data/wedding";
import { useAudio } from "@/components/providers/AudioProvider";

export function AudioPlayer() {
  const { playing, toggle } = useAudio();
  const [showPill, setShowPill] = useState(false);

  // Show pill for 3 seconds only when playback starts, then hide
  useEffect(() => {
    if (playing) {
      setShowPill(true);
      const timer = setTimeout(() => setShowPill(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowPill(false);
    }
  }, [playing]);

  // Pause playback automatically when tab is hidden (visibilitychange)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && playing) {
        toggle();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [playing, toggle]);

  return (
    <div className="fixed bottom-5 right-5 z-30 flex items-center gap-2.5 pointer-events-none">
      {/* Ephemeral toast pill (visible for only 3s after playback starts) */}
      <AnimatePresence>
        {showPill ? (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-night/95 border border-gold/40 text-xs text-gold font-sans shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="whitespace-nowrap">
              Memutar: {wedding.music.title}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Floating round music button with rotating disc icon */}
      <button
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Jeda musik latar" : "Putar musik latar"}
        title={playing ? "Jeda musik latar" : "Putar musik latar"}
        className="pointer-events-auto w-12 h-12 rounded-full border border-gold/70 bg-night/95 text-gold flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer relative"
      >
        {/* Subtle rotating vinyl grooves effect when playing */}
        <span
          className={`absolute inset-1 rounded-full border border-gold/20 pointer-events-none ${
            playing ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "6s" }}
        />

        {playing ? (
          <Pause className="w-5 h-5 relative z-10" />
        ) : (
          <Play className="w-5 h-5 relative z-10 ml-0.5" />
        )}
      </button>
    </div>
  );
}