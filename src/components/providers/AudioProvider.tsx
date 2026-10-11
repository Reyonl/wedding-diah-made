"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { wedding } from "@/data/wedding";
import { asset } from "@/lib/asset";

/**
 * Manajemen audio latar dengan Web Audio API:
 * - HTMLAudioElement tunggal (persisten, tidak di-recreate saat render)
 * - AnalyserNode untuk visualizer equalizer real-time
 * - Autoplay aman: hanya dimulai dari gesture user (buka undangan / tombol play)
 * - Freeze-free: audio element di-cache sekali (module-level singleton)
 */

// Singleton audio di luar React lifecycle → tidak pernah di-recreate oleh re-render.
let sharedAudio: HTMLAudioElement | null = null;
let sharedCtx: AudioContext | null = null;
let sharedAnalyser: AnalyserNode | null = null;
let sharedSource: MediaElementAudioSourceNode | null = null;

function getSharedAudio(): HTMLAudioElement {
  if (!sharedAudio) {
    const audioPath = wedding.music?.src || "/audio/baralek-gadang.mp3";
    sharedAudio = new Audio(asset(audioPath));
    sharedAudio.loop = true;
    sharedAudio.preload = "auto";
    sharedAudio.setAttribute("playsinline", "");
  }
  return sharedAudio;
}

function ensureAnalyser(): {
  ctx: AudioContext;
  analyser: AnalyserNode;
} | null {
  const audio = getSharedAudio();
  if (!sharedCtx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    sharedCtx = new Ctor();
    sharedSource = sharedCtx.createMediaElementSource(audio);
    sharedAnalyser = sharedCtx.createAnalyser();
    sharedAnalyser.fftSize = 64;
    sharedSource.connect(sharedAnalyser);
    sharedAnalyser.connect(sharedCtx.destination);
  }
  return { ctx: sharedCtx, analyser: sharedAnalyser! };
}

type AudioCtxValue = {
  playing: boolean;
  toggle: () => void;
  playWithFade: (target?: number, durationMs?: number) => Promise<void>;
  /** Level equalizer 0..1 untuk setiap bar (dipakai visualizer). */
  levels: number[];
};

const AudioCtx = createContext<AudioCtxValue>({
  playing: false,
  toggle: () => {},
  playWithFade: async () => {},
  levels: [],
});

export function useAudio() {
  return useContext(AudioCtx);
}

const BAR_COUNT = 5;

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [levels, setLevels] = useState<number[]>(Array(BAR_COUNT).fill(0));
  const rafRef = useRef<number | null>(null);

  // Visualizer loop — hanya berjalan saat memutar.
  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setLevels(Array(BAR_COUNT).fill(0));
      return;
    }
    const eng = ensureAnalyser();
    if (!eng) return;
    const data = new Uint8Array(eng.analyser.frequencyBinCount);

    const tick = () => {
      eng.analyser.getByteFrequencyData(data);
      // Ambil beberapa band, normalisasi → level 0..1
      const next = Array.from({ length: BAR_COUNT }, (_, i) => {
        const idx = Math.min(data.length - 1, Math.floor((i / BAR_COUNT) * data.length * 0.7));
        return Math.min(1, data[idx] / 160);
      });
      setLevels(next);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  const playWithFade = useCallback(async (target = 0.6, durationMs = 1500) => {
    const audio = getSharedAudio();
    try {
      const eng = ensureAnalyser();
      if (eng && eng.ctx.state === "suspended") {
        await eng.ctx.resume();
      }
      audio.volume = 0;
      await audio.play();
      setPlaying(true);

      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        audio.volume = progress * target;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    } catch (err) {
      console.warn("[audio] playback blocked:", err);
      setPlaying(false);
    }
  }, []);

  const toggle = useCallback(async () => {
    const audio = getSharedAudio();
    try {
      if (audio.paused) {
        // Resume AudioContext (dipicu gesture user — aman untuk autoplay policy).
        const eng = ensureAnalyser();
        if (eng && eng.ctx.state === "suspended") {
          await eng.ctx.resume();
        }
        await audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch (err) {
      console.warn("[audio] playback blocked:", err);
      setPlaying(false);
    }
  }, []);

  // Cleanup saat page ditutup (opsional — tidak freeze selama SPA).
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <AudioCtx.Provider value={{ playing, toggle, playWithFade, levels }}>
      {children}
    </AudioCtx.Provider>
  );
}