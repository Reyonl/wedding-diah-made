"use client";

import { Music2, Pause, Play } from "lucide-react";
import { wedding } from "@/lib/data";
import { useAudio } from "@/components/providers/AudioProvider";

const BAR_DELAYS = [0, 0.18, 0.36, 0.12, 0.28];

export function AudioPlayer() {
  const { playing, toggle, levels } = useAudio();

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3">
      {/* Toast label */}
      <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/90 border border-gold/40 text-xs text-gold tracking-wide backdrop-blur-md shadow-lg">
        <span
          className={`w-2 h-2 rounded-full ${
            playing ? "bg-emerald-400 animate-ping" : "bg-amber-400"
          }`}
        />
        <span>{playing ? `Memutar: ${wedding.audioTitle}` : "Musik dijeda"}</span>
      </div>

      {/* Equalizer bars */}
      <div className="hidden sm:flex items-end gap-[3px] h-6 px-1" aria-hidden="true">
        {levels.map((lvl, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-gold/80 eq-bar"
            style={{
              height: `${Math.max(12, lvl * 100)}%`,
              animationDelay: `${BAR_DELAYS[i]}s`,
              animationPlayState: playing ? "running" : "paused",
            }}
          />
        ))}
      </div>

      <button
        onClick={toggle}
        className="w-14 h-14 rounded-full gold-gradient-bg text-night flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 relative group gold-glow cursor-pointer"
        title={playing ? "Jeda musik latar" : "Putar musik latar"}
        aria-label={playing ? "Jeda musik latar" : "Putar musik latar"}
      >
        <span className="absolute -inset-1 rounded-full border border-gold/60 animate-pulse pointer-events-none" />
        {/* Vinyl disc */}
        <span
          className={`absolute inset-1 rounded-full border border-night/30 ${
            playing ? "animate-spin-slow spinning" : "animate-spin-slow"
          }`}
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at center, rgba(15,10,8,0.35) 0 2px, transparent 2px 5px)",
          }}
        />
        {playing ? (
          <Pause className="w-6 h-6 relative z-10" />
        ) : (
          <Play className="w-6 h-6 relative z-10 ml-0.5" />
        )}
        <Music2 className="w-3 h-3 absolute -top-0.5 -right-0.5 text-night/70" />
      </button>
    </div>
  );
}