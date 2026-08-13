"use client";

import React from "react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

export default function VelorahHeroPreview() {
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl select-none"
      style={{ backgroundColor: "hsl(201 100% 13%)" }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none" />

      {/* Nav Row */}
      <div className="relative z-10 flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
        <span className="font-serif text-sm sm:text-base md:text-lg tracking-tight text-white font-normal">
          RegiNova<sup className="text-[0.5em]">®</sup>
        </span>

        <div className="hidden md:flex items-center gap-4 text-[9px] lg:text-[10px] text-white/60 font-runtime">
          <span className="text-white font-medium">Overview</span>
          <span className="hover:text-white transition-colors cursor-pointer">Architecture</span>
          <span className="hover:text-white transition-colors cursor-pointer">Benchmarks</span>
          <span className="hover:text-white transition-colors cursor-pointer">FAISS Vector</span>
          <span className="hover:text-white transition-colors cursor-pointer">GitHub</span>
        </div>

        <div className="liquid-glass rounded-full px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] text-white font-runtime font-medium">
          Begin Journey
        </div>
      </div>

      {/* Hero Block */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 sm:px-4 pt-3 sm:pt-5 md:pt-7 pb-6 h-[calc(100%-60px)]">
        <h1 className="font-serif font-normal leading-[0.95] tracking-[-0.03em] text-lg sm:text-2xl md:text-3xl lg:text-4xl max-w-[90%] text-white animate-fade-rise">
          Where <em className="not-italic text-white/55">intelligence</em> meets{" "}
          <em className="not-italic text-white/55">vector retrieval.</em>
        </h1>

        <p className="animate-fade-rise-delay text-white/60 text-[9px] sm:text-[11px] md:text-xs leading-relaxed max-w-[80%] sm:max-w-sm md:max-w-md mt-2 sm:mt-3 md:mt-4 font-runtime">
          Jay Tavanoji&apos;s flagship AI platform for government document analysis, RAG pipeline automation, and sub-20ms FAISS vector searches.
        </p>

        <div className="animate-fade-rise-delay-2 liquid-glass rounded-full px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-[9px] sm:text-[10px] text-white mt-3 sm:mt-4 md:mt-5 font-runtime font-medium cursor-pointer hover:bg-white/20 transition-all">
          Begin Journey
        </div>
      </div>
    </div>
  );
}
