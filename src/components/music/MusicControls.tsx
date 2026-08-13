"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Track } from "@/data/musicTracks";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface MusicControlsProps {
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0 || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicControls({
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  progress,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
}: MusicControlsProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubPercent, setScrubPercent] = useState<number | null>(null);

  const calculateRatio = useCallback((clientX: number) => {
    const bar = progressBarRef.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    return Math.max(0, Math.min(1, ratio));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!duration || duration <= 0) return;
    setIsScrubbing(true);
    const ratio = calculateRatio(e.clientX);
    setScrubPercent(ratio * 100);
    onSeek(ratio * duration);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const moveRatio = calculateRatio(moveEvent.clientX);
      setScrubPercent(moveRatio * 100);
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      const finalRatio = calculateRatio(upEvent.clientX);
      setIsScrubbing(false);
      setScrubPercent(null);
      onSeek(finalRatio * duration);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const displayProgress = scrubPercent !== null ? scrubPercent : progress;
  const displayCurrentTime =
    scrubPercent !== null && duration > 0
      ? (scrubPercent / 100) * duration
      : currentTime;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center gap-4 px-4 select-none text-center">
      
      {/* ── 1. ACTIVE TRACK METADATA — PLAIN WHITE ── */}
      <div className="flex flex-col items-center text-center gap-1.5 w-full">
        {/* Title */}
        <h2 className="font-sans text-xl sm:text-2xl font-black text-white tracking-tight uppercase leading-none truncate max-w-xs sm:max-w-md">
          {currentTrack.title}
        </h2>
        {/* Artist & Metadata */}
        <div className="flex items-center justify-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-white/80 tracking-[0.25em] uppercase">
          <span className="text-white">{currentTrack.artist}</span>
          <span className="text-white/60">·</span>
          <span className="text-white/80">{currentTrack.genre}</span>
        </div>
      </div>

      {/* ── 2. PERFECTLY CENTERED TIMELINE & SEEK BAR — PLAIN WHITE ── */}
      <div className="w-full flex items-center justify-center gap-3">
        {/* Current Time */}
        <span className="font-mono text-[9px] text-white select-none min-w-[36px] text-right">
          {formatTime(displayCurrentTime)}
        </span>

        {/* Progress Bar Container */}
        <div
          ref={progressBarRef}
          onPointerDown={handlePointerDown}
          className="group relative flex-1 h-3 flex items-center cursor-pointer touch-none"
          role="slider"
          aria-label="Seek track"
          aria-valuenow={Math.round(displayCurrentTime)}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration) || 0}
        >
          {/* Background Track */}
          <div className="w-full h-[3px] bg-white/20 rounded-full overflow-hidden transition-all group-hover:h-[4px]">
            <div
              className="h-full bg-white rounded-full transition-[width] duration-75 ease-linear"
              style={{ width: `${Math.min(100, Math.max(0, displayProgress))}%` }}
            />
          </div>

          {/* Scrub Handle Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white rounded-full border border-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ left: `${Math.min(100, Math.max(0, displayProgress))}%` }}
          />
        </div>

        {/* Total Duration */}
        <span className="font-mono text-[9px] text-white select-none min-w-[36px] text-left">
          {formatTime(duration)}
        </span>
      </div>

      {/* ── 3. CENTERED PLAYBACK CONTROLS — PLAIN WHITE ── */}
      <div className="flex items-center justify-center gap-6 pt-1">
        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous song"
          className="p-2 text-white/80 hover:text-white transition-colors active:scale-90"
        >
          <SkipBack className="w-4 h-4 fill-current text-white" />
        </button>

        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="relative p-3.5 rounded-full border border-white/40 bg-white/10 text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-white/25 hover:border-white"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current text-white" />
          ) : (
            <Play className="w-4 h-4 fill-current text-white translate-x-0.5" />
          )}
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          aria-label="Next song"
          className="p-2 text-white/80 hover:text-white transition-colors active:scale-90"
        >
          <SkipForward className="w-4 h-4 fill-current text-white" />
        </button>
      </div>

    </div>
  );
}
