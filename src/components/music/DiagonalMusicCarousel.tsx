"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { motion, PanInfo } from "framer-motion";
import { Track } from "@/data/musicTracks";
import { Play, Radio, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiagonalMusicCarouselProps {
  tracks: Track[];
  activeIndex: number;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
}

export default function DiagonalMusicCarousel({
  tracks,
  activeIndex,
  isPlaying,
  onSelectTrack,
}: DiagonalMusicCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll handler with debounce lock for clean 1-track increments
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      if (isScrollingRef.current) return;

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

      if (Math.abs(delta) > 15) {
        isScrollingRef.current = true;

        if (delta > 0) {
          // Scroll down / right -> Next Track
          const nextIndex = (activeIndex + 1) % tracks.length;
          onSelectTrack(nextIndex);
        } else {
          // Scroll up / left -> Previous Track
          const prevIndex = (activeIndex - 1 + tracks.length) % tracks.length;
          onSelectTrack(prevIndex);
        }

        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 320);
      }
    },
    [activeIndex, tracks.length, onSelectTrack]
  );

  // Attach non-passive wheel listener to the container for responsive scroll control
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [handleWheel]);

  // Keyboard navigation listener (Arrow Left/Right, Up/Down)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        onSelectTrack((activeIndex + 1) % tracks.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        onSelectTrack((activeIndex - 1 + tracks.length) % tracks.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, tracks.length, onSelectTrack]);

  // Handle Drag/Swipe End
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold || info.offset.y < -swipeThreshold) {
      // Swiped Left / Up -> Next Track
      onSelectTrack((activeIndex + 1) % tracks.length);
    } else if (info.offset.x > swipeThreshold || info.offset.y > swipeThreshold) {
      // Swiped Right / Down -> Previous Track
      onSelectTrack((activeIndex - 1 + tracks.length) % tracks.length);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl h-[340px] sm:h-[400px] md:h-[440px] flex flex-col items-center justify-center select-none overflow-visible touch-none cursor-grab active:cursor-grabbing"
    >
      {/* Ambient Crimson Glow behind active artwork */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-[#FF4D1F]/15 rounded-full blur-3xl pointer-events-none transition-all duration-700" />

      {/* Side Quick Navigation Arrow Badges */}
      <button
        type="button"
        onClick={() => onSelectTrack((activeIndex - 1 + tracks.length) % tracks.length)}
        aria-label="Previous song"
        className="absolute left-2 sm:left-6 z-40 p-2 sm:p-3 rounded-full bg-black/50 border border-white/10 hover:border-white/30 text-white/70 hover:text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        type="button"
        onClick={() => onSelectTrack((activeIndex + 1) % tracks.length)}
        aria-label="Next song"
        className="absolute right-2 sm:right-6 z-40 p-2 sm:p-3 rounded-full bg-black/50 border border-white/10 hover:border-white/30 text-white/70 hover:text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* ── SPATIAL DIAGONAL CAROUSEL TRACKS ── */}
      <div className="relative w-full h-full flex items-center justify-center">
        {tracks.map((track, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;

          // Spatial diagonal transformation calculations
          const xOffset = offset * 145; // Horizontal diagonal spacing
          const yOffset = offset * 36; // Vertical diagonal offset
          const rotation = offset * -6; // Spatial tilt
          const scale = isActive ? 1 : Math.max(0.72, 1 - Math.abs(offset) * 0.14);
          const opacity = isActive ? 1 : Math.max(0.35, 1 - Math.abs(offset) * 0.35);
          const zIndex = isActive ? 30 : 20 - Math.abs(offset);

          return (
            <motion.div
              key={track.id}
              onClick={() => onSelectTrack(index)}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={false}
              animate={{
                x: xOffset,
                y: yOffset,
                rotateZ: rotation,
                scale: scale,
                opacity: opacity,
                zIndex: zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
                bounce: 0.16,
              }}
              style={{
                transformOrigin: "center center",
                willChange: "transform, opacity",
              }}
              className={cn(
                "absolute cursor-pointer transition-shadow group flex flex-col items-center",
                isActive ? "pointer-events-auto" : "pointer-events-auto hover:opacity-75"
              )}
            >
              {/* Album Artwork Card */}
              <div
                className={cn(
                  "relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 bg-black/60",
                  isActive
                    ? "w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[330px] md:h-[330px] border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,77,31,0.2)]"
                    : "w-[170px] h-[170px] sm:w-[210px] sm:h-[210px] md:w-[230px] md:h-[230px] border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={track.artwork}
                  alt={`${track.title} artwork`}
                  className={cn(
                    "w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out",
                    isActive ? "scale-100" : "scale-105 grayscale-[40%]"
                  )}
                  loading="eager"
                  draggable={false}
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Inactive Hover Indicator */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                  </div>
                )}

              </div>

              {/* Inactive Track Title Hint */}
              {!isActive && (
                <div className="mt-2.5 text-center max-w-[170px] sm:max-w-[200px] truncate pointer-events-none">
                  <span className="text-xs font-semibold text-white/80 block truncate">
                    {track.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#8A8A8A] block truncate uppercase">
                    {track.artist}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
