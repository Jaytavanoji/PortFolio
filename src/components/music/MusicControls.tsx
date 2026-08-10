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
    <div className="w-full max-w-xl flex flex-col items-center gap-4 px-4 select-none">
      {/* Active Track Editorial Information */}
      <div className="flex flex-col items-center text-center gap-1">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight uppercase truncate max-w-md sm:max-w-xl">
          {currentTrack.title}
        </h2>
        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#A1A1AA] tracking-widest uppercase">
          <span>{currentTrack.artist}</span>
          <span className="text-[#FF4D1F]">·</span>
          <span className="text-[#8A8A8A] font-light">{currentTrack.genre}</span>
        </div>
      </div>

      {/* Seekable Progress Bar & Timestamps */}
      <div className="w-full flex flex-col gap-1.5 pt-1">
        <div
          ref={progressBarRef}
          onPointerDown={handlePointerDown}
          className="group relative w-full h-4 flex items-center cursor-pointer touch-none"
          role="slider"
          aria-label="Seek track"
          aria-valuenow={Math.round(displayCurrentTime)}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration) || 0}
        >
          {/* Background Track */}
          <div className="w-full h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden transition-all group-hover:h-2">
            <div
              className="h-full bg-[#FF4D1F] rounded-full transition-[width] duration-75 ease-linear"
              style={{ width: `${Math.min(100, Math.max(0, displayProgress))}%` }}
            />
          </div>

          {/* Scrub Handle Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white rounded-full shadow-md border-2 border-[#FF4D1F] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ left: `${Math.min(100, Math.max(0, displayProgress))}%` }}
          />
        </div>

        {/* Timestamps */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8A8A] px-0.5">
          <span>{formatTime(displayCurrentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Minimal Playback Controls */}
      <div className="flex items-center gap-6 sm:gap-8 pt-1">
        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous song"
          className="p-2.5 rounded-full text-[#A1A1AA] hover:text-white hover:bg-white/10 transition-all active:scale-90"
        >
          <SkipBack className="w-5 h-5 fill-current" />
        </button>

        {/* Center Play / Pause Button */}
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="relative p-4 rounded-full bg-[#FF4D1F] hover:bg-[#E63E12] text-white shadow-[0_0_25px_rgba(255,77,31,0.4)] transition-all transform hover:scale-105 active:scale-95"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current translate-x-0.5" />
          )}
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          aria-label="Next song"
          className="p-2.5 rounded-full text-[#A1A1AA] hover:text-white hover:bg-white/10 transition-all active:scale-90"
        >
          <SkipForward className="w-5 h-5 fill-current" />
        </button>
      </div>
    </div>
  );
}
