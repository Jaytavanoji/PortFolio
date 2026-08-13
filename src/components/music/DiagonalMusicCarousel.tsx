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
  const activeIndexRef = useRef(activeIndex);

  // Always sync activeIndexRef with activeIndex prop
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Smooth wheel handler with quick response lock for clean track increments
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // Prevent default page scroll while hovering/scrolling over the music carousel
      e.preventDefault();
      e.stopPropagation();

      if (isScrollingRef.current) return;

      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

      if (Math.abs(delta) > 3) {
        isScrollingRef.current = true;
        const currentIdx = activeIndexRef.current;

        if (delta > 0) {
          // Scroll down / right -> Next Track
          const nextIndex = (currentIdx + 1) % tracks.length;
          onSelectTrack(nextIndex);
        } else {
          // Scroll up / left -> Previous Track
          const prevIndex = (currentIdx - 1 + tracks.length) % tracks.length;
          onSelectTrack(prevIndex);
        }

        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 220);
      }
    },
    [tracks.length, onSelectTrack]
  );

  // No-op or cleanup wheel listener refs to disable scroll-to-browse
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

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
      className="relative w-full max-w-5xl h-[360px] sm:h-[420px] md:h-[480px] flex flex-col items-center justify-center select-none overflow-visible touch-none cursor-grab active:cursor-grabbing"
    >
      {/* Ambient Crimson Glow behind active artwork */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-[#F43F5E]/15 rounded-full blur-3xl pointer-events-none transition-all duration-700" />

      {/* Side Quick Navigation Arrow Badges */}
      <button
        type="button"
        onClick={() => onSelectTrack((activeIndex - 1 + tracks.length) % tracks.length)}
        aria-label="Previous song"
        className="absolute left-2 sm:left-8 z-40 p-2.5 sm:p-3 rounded-full bg-black/60 border border-white/10 hover:border-white/30 text-white/70 hover:text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        type="button"
        onClick={() => onSelectTrack((activeIndex + 1) % tracks.length)}
        aria-label="Next song"
        className="absolute right-2 sm:right-8 z-40 p-2.5 sm:p-3 rounded-full bg-black/50 border border-white/10 hover:border-white/30 text-white/70 hover:text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* ── SPATIAL DIAGONAL CAROUSEL TRACKS ── */}
      <div className="relative w-full h-full flex items-center justify-center">
        {tracks.map((track, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;

          // Spatial diagonal transformation calculations - scaled wider for full screen
          const xOffset = offset * 210; // Horizontal spacing
          const yOffset = offset * 38;  // Vertical shift
          const rotation = offset * -6;  // Spatial tilt
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
                  "relative rounded-2xl overflow-hidden border transition-all duration-500 bg-black/60",
                  isActive
                    ? "w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[340px] md:h-[340px] border-white/25 shadow-[0_18px_40px_rgba(0,0,0,0.85),0_0_28px_rgba(244,63,94,0.25)]"
                    : "w-[150px] h-[150px] sm:w-[190px] sm:h-[190px] md:w-[210px] md:h-[210px] border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.55)]"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={track.artwork}
                  alt={`${track.title} artwork`}
                  className={cn(
                    "w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out",
                    isActive ? "scale-100" : "scale-105 grayscale-[30%]"
                  )}
                  loading="eager"
                  draggable={false}
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Inactive Hover Indicator */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-4 h-4 fill-current translate-x-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Inactive Track Title Hint (Small & Compact) */}
              {!isActive && (
                <div className="mt-2 text-center max-w-[140px] sm:max-w-[170px] truncate pointer-events-none">
                  <span className="text-[11px] font-semibold text-white/70 block truncate">
                    {track.title}
                  </span>
                  <span className="text-[9px] font-mono text-[#8A8A8A] block truncate uppercase">
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
