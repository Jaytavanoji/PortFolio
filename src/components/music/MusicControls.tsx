"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Track } from "@/data/musicTracks";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
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
    <div className="w-full max-w-md flex flex-col items-center gap-2 px-4 select-none">
      {/* Active Track Editorial Information */}
      <div className="flex flex-col items-center text-center gap-0.5">
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase truncate max-w-xs sm:max-w-md">
          {currentTrack.title}
        </h2>
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#A1A1AA] tracking-widest uppercase">
          <span>{currentTrack.artist}</span>
          <span className="text-[#6E1A2B]">·</span>
          <span className="text-[#8A8A8A] font-light">{currentTrack.genre}</span>
        </div>
      </div>

      {/* Seekable Progress Bar & Timestamps */}
      <div className="w-full flex flex-col gap-1">
        <div
          ref={progressBarRef}
          onPointerDown={handlePointerDown}
          className="group relative w-full h-3 flex items-center cursor-pointer touch-none"
          role="slider"
          aria-label="Seek track"
          aria-valuenow={Math.round(displayCurrentTime)}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration) || 0}
        >
          {/* Background Track */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden transition-all group-hover:h-1.5">
            <div
              className="h-full bg-[#6E1A2B] rounded-full transition-[width] duration-75 ease-linear"
              style={{ width: `${Math.min(100, Math.max(0, displayProgress))}%` }}
            />
          </div>

          {/* Scrub Handle Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-md border-2 border-[#6E1A2B] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ left: `${Math.min(100, Math.max(0, displayProgress))}%` }}
          />
        </div>

        {/* Timestamps */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#8A8A8A] px-0.5">
          <span>{formatTime(displayCurrentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Minimal Playback Controls */}
      <div className="flex items-center gap-5 pt-0.5">
        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous song"
          className="p-2 rounded-full text-[#A1A1AA] hover:text-white hover:bg-white/10 transition-all active:scale-90"
        >
          <SkipBack className="w-4 h-4 fill-current" />
        </button>

        {/* Center Play / Pause Button */}
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="relative p-3 rounded-full bg-[#6E1A2B] hover:bg-[#5C1222] text-white shadow-[0_0_20px_rgba(110,26,43,0.5)] transition-all transform hover:scale-105 active:scale-95"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current translate-x-0.5" />
          )}
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          aria-label="Next song"
          className="p-2 rounded-full text-[#A1A1AA] hover:text-white hover:bg-white/10 transition-all active:scale-90"
        >
          <SkipForward className="w-4 h-4 fill-current" />
        </button>
      </div>
    </div>
  );
}
