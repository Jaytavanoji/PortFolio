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
    <div className="w-full max-w-sm flex flex-col items-center gap-4 px-4 select-none">
      
      {/* ── 1. ACTIVE TRACK METADATA ── */}
      <div className="flex flex-col items-center text-center gap-1.5">
        {/* Title */}
        <h2 className="font-sans text-xl sm:text-2xl font-black text-white tracking-tighter uppercase leading-none truncate max-w-xs sm:max-w-md">
          {currentTrack.title}
        </h2>
        {/* Artist & Metadata */}
        <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-[#8A8A8A] tracking-[0.25em] uppercase">
          <span>{currentTrack.artist}</span>
          <span className="text-[#B52F43]/60">·</span>
          <span>{currentTrack.genre}</span>
        </div>
      </div>

      {/* ── 2. REFINED TIMELINE & SEEK BAR ── */}
      <div className="w-full flex items-center gap-3">
        {/* Current Time */}
        <span className="font-mono text-[9px] text-[#666] select-none min-w-[32px] text-right">
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
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden transition-all group-hover:h-[4px]">
            <div
              className="h-full bg-[#B52F43] rounded-full transition-[width] duration-75 ease-linear"
              style={{ width: `${Math.min(100, Math.max(0, displayProgress))}%` }}
            />
          </div>

          {/* Scrub Handle Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full border border-[#B52F43] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ left: `${Math.min(100, Math.max(0, displayProgress))}%` }}
          />
        </div>

        {/* Total Duration */}
        <span className="font-mono text-[9px] text-[#666] select-none min-w-[32px] text-left">
          {formatTime(duration)}
        </span>
      </div>

      {/* ── 3. EDITORIAL PLAYBACK CONTROLS ── */}
      <div className="flex items-center gap-6 pt-1">
        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous song"
          className="p-2 text-white/40 hover:text-white transition-colors active:scale-90"
        >
          <SkipBack className="w-4 h-4 fill-current" />
        </button>

        {/* Play/Pause Button (Editorial Wireframe Design) */}
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="relative p-3.5 rounded-full border border-white/15 bg-white/[0.03] text-white shadow-[0_0_15px_rgba(255,255,255,0.02)] transition-all duration-300 hover:scale-105 active:scale-95 hover:border-[#B52F43]/60 hover:text-[#B52F43] hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current translate-x-0.5" />
          )}
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          aria-label="Next song"
          className="p-2 text-white/40 hover:text-white transition-colors active:scale-90"
        >
          <SkipForward className="w-4 h-4 fill-current" />
        </button>
      </div>
    </div>
  );
}
