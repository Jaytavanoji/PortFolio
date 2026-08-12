"use client";

import React, { useCallback } from "react";
import { useAudio } from "@/context/AudioContext";
import DiagonalMusicCarousel from "@/components/music/DiagonalMusicCarousel";
import MusicControls from "@/components/music/MusicControls";
import { ImageText } from "@/components/ui/image-text";
import CinematicBackground from "@/components/ui/CinematicBackground";

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

  // Selecting any track in the carousel immediately animates it and starts playing
  const handleSelectTrack = useCallback(
    (index: number) => {
      playTrack(index);
    },
    [playTrack]
  );

  // Safely URL-encoded SVG string for the fluted glass effect
  const filterImageHref = "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' color-interpolation-filters='sRGB'>
      <g>
        <rect width='1' height='1' fill='black' />
        <rect width='1' height='1' fill='url(#red)' style='mix-blend-mode:screen' />
        <rect width='1' height='1' fill='url(#green)' style='mix-blend-mode:screen' />
        <rect width='1' height='1' fill='url(#yellow)' style='mix-blend-mode:screen' />
      </g>
      <defs>
        <radialGradient id='yellow' cx='0' cy='0' r='1' >
          <stop stop-color='yellow' />
          <stop stop-color='yellow' offset='1' stop-opacity='0' />
        </radialGradient>
        <radialGradient id='green' cx='1' cy='0' r='1' >
          <stop stop-color='green' />
          <stop stop-color='green' offset='1' stop-opacity='0' />
        </radialGradient>
        <radialGradient id='red' cx='0' cy='1' r='1' >
          <stop stop-color='red' />
          <stop stop-color='red' offset='1' stop-opacity='0' />
        </radialGradient>
      </defs>
    </svg>
  `);

  return (
    <main className="relative w-full h-[100dvh] max-h-[100dvh] overflow-hidden text-[#F5F5F5] flex flex-col justify-between items-center select-none pt-4 sm:pt-6 pb-24 sm:pb-28 px-4 sm:px-6 md:px-10 lg:px-12">
      <CinematicBackground variant="music" />

      {/* Displacement Filter Defs */}
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        colorInterpolationFilters="sRGB"
        style={{ position: "absolute", opacity: 0, height: 0, width: 0, pointerEvents: "none" }}
        aria-hidden="true"
        focusable="false"
      >
        <filter id="fluted" primitiveUnits="objectBoundingBox">
          <feImage
            x="0"
            y="0"
            result="image_0"
            crossOrigin="anonymous"
            href={filterImageHref}
            preserveAspectRatio="none meet"
            width=".03"
            height="1"
          />
          <feTile in="image_0" result="tile_0" />
          <feGaussianBlur stdDeviation=".0001" edgeMode="none" in="tile_0" result="bar_smoothness" x="0" y="0" />
          <feDisplacementMap scale=".08" xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" in2="bar_smoothness" result="displacement_0" />
        </filter>
      </svg>

      <div className="relative z-10 w-full max-w-[1400px] h-full flex flex-col justify-between items-center overflow-hidden">
        {/* ── TOP EDITORIAL HEADER (Fixed Compact Header) ── */}
        <header className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-3 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-3">
            <ImageText
              text="MUSIC"
              imageUrl="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop"
              direction="diagonal"
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase drop-shadow-[0_10px_20px_rgba(255,255,255,0.12)]"
            />
            <span className="text-[#A0A0A0] font-light text-sm sm:text-lg md:text-xl tracking-tight uppercase pb-0.5 sm:pb-1">
              ATMOSPHERIC SOUNDS
            </span>
          </div>
        </header>

        {/* ── CENTER: DIAGONAL MUSIC CAROUSEL (Scroll Wheel Active) ── */}
        <section
          aria-label="Diagonal Music Carousel"
          className="w-full flex-1 flex items-center justify-center overflow-visible min-h-0 py-2"
        >
          <DiagonalMusicCarousel
            tracks={tracks}
            activeIndex={currentTrackIndex}
            isPlaying={isPlaying}
            onSelectTrack={handleSelectTrack}
          />
        </section>

        {/* ── LOWER CENTER: PLAYER CONTROLS (Positioned Above Dock) ── */}
        <footer className="w-full flex justify-center shrink-0 pt-1 pb-1 z-20">
          <MusicControls
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            progress={progress}
            onTogglePlay={togglePlay}
            onNext={nextTrack}
            onPrev={prevTrack}
            onSeek={seek}
          />
        </footer>
      </div>
    </main>
  );
}
