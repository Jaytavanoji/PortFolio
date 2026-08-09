"use client";

import React, { useState } from "react";
import { useAudio } from "@/context/AudioContext";
import { Radio, Headphones, Disc, Play, Pause, SkipBack, SkipForward, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const EQ_BARS = [0, 1, 2, 3];
const EQ_KEYFRAMES =
  "@keyframes vengeance-eq{0%,100%{transform:scaleY(0.28)}50%{transform:scaleY(1)}}";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPage() {
  const {
    tracks,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    progress,
    togglePlay,
    playTrack,
    nextTrack,
    prevTrack,
    seek,
  } = useAudio();

  const [collapsed, setCollapsed] = useState(false);

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!Number.isFinite(duration) || duration === 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    seek(Math.min(Math.max(ratio, 0), 1) * duration);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050608] text-[#F5F5F5] pb-32 pt-12 sm:pt-20 px-4 sm:px-8 md:px-14 flex flex-col items-center overflow-hidden">
      <style>{EQ_KEYFRAMES}</style>

      {/* ── ATMOSPHERIC HERO-FRAME MATCHED AMBIENT GLOWS ── */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,_rgba(28,34,56,0.5),_transparent_65%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,77,31,0.06),_transparent_45%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#030305]/70 to-[#020203]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-12 sm:gap-16">
        {/* ── TOP EDITORIAL HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-white">
              MUSIC
            </h1>
          </div>
          <span className="text-xs font-mono tracking-widest uppercase text-[#8A8A8A]">
            Atmospheric Sounds · Continuous Global Playback
          </span>
        </div>

        {/* ── HERO PLAYER SHOWCASE CONTAINER ── */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {/* Ambient Crimson Glow behind Player */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF4D1F]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center gap-2 text-center z-10">
            <div className="flex items-center gap-2 text-[#FF4D1F] text-xs font-mono font-bold tracking-widest uppercase">
              <Headphones className="w-4 h-4" />
              <span>INTERACTIVE AUDIO ENGINE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Curated Sounds for Deep Focus & Building
            </h2>
            <p className="text-xs sm:text-sm text-[#8A8A8A] font-light max-w-md">
              Music plays continuously as you browse across pages. Click any featured song to switch tracks.
            </p>
          </div>

          {/* ── AZUKI STYLE GLASSMORPHIC MUSIC PLAYER (Connected to Global Audio) ── */}
          <div className="pt-6 pb-2 z-10 flex justify-center w-full">
            <div
              className={cn(
                "relative select-none text-white transition-[width] duration-700 ease-out shadow-2xl",
                collapsed ? "w-[188px]" : "w-[min(420px,90vw)]"
              )}
            >
              {/* Collapse / expand toggle */}
              <button
                type="button"
                onClick={() => setCollapsed((c) => !c)}
                aria-label={collapsed ? "Expand player" : "Collapse player"}
                aria-expanded={!collapsed}
                className="absolute -right-3 -top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
              >
                {collapsed ? <Plus className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
              </button>

              {/* Floating avatar */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentTrack.artwork}
                alt={`${currentTrack.title} artwork`}
                className="absolute -top-5 left-0 z-20 h-20 w-20 rounded-xl object-cover shadow-lg shadow-black/30 ring-1 ring-white/20"
              />

              {/* Player bar */}
              <div className="relative flex h-[70px] items-center gap-3 overflow-hidden rounded-xl border border-white/15 bg-white/15 pl-24 pr-5 backdrop-blur-md">
                {/* Equalizer */}
                <div className="flex h-8 shrink-0 items-end gap-[3px]" aria-hidden="true">
                  {EQ_BARS.map((bar) => (
                    <span
                      key={bar}
                      className="block w-[3px] rounded-full"
                      style={{
                        height: "100%",
                        background: "#FF4D1F",
                        transformOrigin: "bottom",
                        animation: `vengeance-eq ${0.9 + bar * 0.18}s ease-in-out infinite`,
                        animationPlayState: isPlaying ? "running" : "paused",
                        transform: isPlaying ? undefined : "scaleY(0.28)",
                      }}
                    />
                  ))}
                </div>

                {/* Track info + controls, hidden while collapsed */}
                <div
                  className={cn(
                    "flex min-w-0 flex-1 items-center gap-3 transition-opacity duration-300",
                    collapsed ? "pointer-events-none opacity-0" : "opacity-100"
                  )}
                  style={{ transitionDelay: collapsed ? "0s" : "0.35s" }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold uppercase tracking-wide">
                      {currentTrack.title}
                    </div>
                    <div className="truncate text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
                      {currentTrack.artist}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={prevTrack}
                      aria-label="Previous track"
                      className="rounded-full p-1.5 opacity-80 transition hover:bg-white/10 hover:opacity-100"
                    >
                      <SkipBack className="h-4 w-4 fill-current" />
                    </button>
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause" : "Play"}
                      className="rounded-full p-1.5 opacity-90 transition hover:bg-white/10 hover:opacity-100"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5 fill-current" />
                      ) : (
                        <Play className="h-5 w-5 fill-current" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={nextTrack}
                      aria-label="Next track"
                      className="rounded-full p-1.5 opacity-80 transition hover:bg-white/10 hover:opacity-100"
                    >
                      <SkipForward className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                </div>

                {/* Seekable progress bar */}
                {!collapsed && (
                  <div
                    role="slider"
                    aria-label="Seek"
                    aria-valuemin={0}
                    aria-valuemax={Math.round(duration) || 0}
                    aria-valuenow={Math.round(currentTime)}
                    aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                    tabIndex={0}
                    onClick={handleSeek}
                    className="group absolute inset-x-0 bottom-0 flex h-3 cursor-pointer items-end"
                  >
                    <div className="relative h-[3px] w-full bg-white/15">
                      <div
                        className="absolute inset-y-0 left-0 transition-[width] duration-100 ease-linear"
                        style={{ width: `${progress}%`, background: "#FF4D1F" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── CURATED CODING SESSIONS PLAYLIST ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Disc className="w-4 h-4 text-[#FF4D1F]" />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                FEATURED SESSIONS (CLICK TO PLAY)
              </span>
            </div>
            <span className="text-xs font-mono text-[#8A8A8A]">
              {tracks.length} TRACKS
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {tracks.map((t, idx) => {
              const isSelected = idx === currentTrackIndex;
              return (
                <div
                  key={t.id}
                  onClick={() => playTrack(idx)}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer group ${
                    isSelected
                      ? "bg-white/[0.06] border-[#FF4D1F]/60 shadow-[0_0_25px_rgba(255,77,31,0.2)]"
                      : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/25"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 flex items-center justify-center font-mono text-xs text-[#8A8A8A]">
                      {isSelected && isPlaying ? (
                        <Radio className="w-4 h-4 text-[#FF4D1F] animate-pulse" />
                      ) : (
                        <span className="group-hover:hidden">0{idx + 1}</span>
                      )}
                      {!(isSelected && isPlaying) && (
                        <Play className="w-4 h-4 text-[#FF4D1F] hidden group-hover:block fill-current" />
                      )}
                    </div>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.artwork}
                      alt={t.title}
                      className="w-10 h-10 rounded-lg object-cover border border-white/15"
                    />

                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-bold transition-colors ${
                          isSelected
                            ? "text-[#FF4D1F]"
                            : "text-white group-hover:text-[#FF4D1F]"
                        }`}
                      >
                        {t.title}
                      </span>
                      <span className="text-xs text-[#8A8A8A] font-light">
                        {t.artist}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-[#8A8A8A]">
                    <span className="hidden sm:inline">{t.genre}</span>
                    <span className="text-white/80">{t.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
