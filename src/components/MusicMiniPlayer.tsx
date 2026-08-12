"use client";

import React, { useState } from "react";
import { useAudio } from "@/context/AudioContext";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import Link from "next/link";

export default function MusicMiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack, progress } = useAudio();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed top-5 right-5 sm:top-6 sm:right-8 z-50 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── CLEAN SQUARE MINIPLAYER CONTAINER ── */}
      <div
        className={`relative flex items-center bg-black/75 border border-white/15 backdrop-blur-2xl transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.6)] overflow-hidden ${
          isHovered
            ? "w-64 sm:w-72 h-14 sm:h-16 rounded-2xl border-white/30"
            : "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl"
        }`}
      >
        {/* Left Square Artwork Cover */}
        <div
          onClick={togglePlay}
          className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center cursor-pointer group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentTrack.artwork}
            alt={currentTrack.title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isPlaying ? "scale-105" : ""
            }`}
          />

          {/* Dark Overlay & Play/Pause Icon — Revealed Only When Expanded / Hovered */}
          {isHovered && (
            <>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                {/* Center Play / Pause Icon */}
                <div className="p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md shadow-lg transform transition-all group-hover:scale-105">
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                  )}
                </div>
              </div>

              {/* Pulsing Equalizer Bars */}
              <div className="absolute top-1.5 right-1.5 flex items-end gap-0.5 h-3 bg-black/70 px-1 py-0.5 rounded backdrop-blur-md pointer-events-none">
                {[0.8, 1, 0.5, 0.9].map((scale, i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-[#6E1A2B] rounded-full transition-all duration-300"
                    style={{
                      height: isPlaying ? `${scale * 100}%` : "30%",
                      animation: isPlaying
                        ? `vengeance-mini-eq ${0.6 + i * 0.15}s ease-in-out infinite alternate`
                        : "none",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Expanded Info & Controls (Revealed on Hover) */}
        <div
          className={`flex items-center justify-between flex-1 px-3.5 min-w-0 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Track Name + Artist Link to /music */}
          <Link
            href="/music"
            className="flex flex-col min-w-0 flex-1 pr-2 hover:opacity-80 transition-opacity"
            title="Open Music Hub"
          >
            <span className="text-xs font-bold text-white truncate hover:text-[#FF4D1F] transition-colors">
              {currentTrack.title}
            </span>
            <span className="text-[10px] font-mono text-[#8A8A8A] truncate uppercase tracking-wider">
              {currentTrack.artist}
            </span>
          </Link>

          {/* Transport Controls */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevTrack();
              }}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#A1A1AA] hover:text-white transition-colors"
              title="Previous"
            >
              <SkipBack className="w-3.5 h-3.5 fill-current" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextTrack();
              }}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#A1A1AA] hover:text-white transition-colors"
              title="Next"
            >
              <SkipForward className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
          <div
            className="h-full bg-white/60 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes vengeance-mini-eq {
          0% {
            transform: scaleY(0.3);
          }
          100% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
}
