"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface WaveTextProps {
  title: string;
  progress?: MotionValue<number>;
  glowRgb?: string;     // Color code for ambient glow
  accentHex?: string;   // Color code for text accent
  bgHex?: string;       // Background base color (e.g. "#050505")
  textColorHex?: string; // Explicit text color override
  className?: string;
}

export default function WaveText({ 
  title, 
  progress, 
  glowRgb = "110, 26, 43",
  bgHex = "#050505",
  textColorHex,
  className = "" 
}: WaveTextProps) {
  // Fallback static value if progress is not provided
  const fallbackProgress = useTransform(() => 0);
  const activeProgress = progress || fallbackProgress;

  // Format display title to uppercase, remove extra spaces
  const displayTitle = title
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();

  // Dynamically adjust font size for long titles (e.g. FEATURED PROJECT) to fit comfortably on screen
  const isVeryLong = displayTitle.length > 12;
  const isLong = displayTitle.length > 8;
  const fontSizeClass = isVeryLong
    ? "text-[7.5vw] sm:text-[6.5vw] md:text-[5.5vw] lg:text-[4.8vw]"
    : isLong
    ? "text-[9.5vw] sm:text-[8.5vw] md:text-[7vw]"
    : "text-[13vw] sm:text-[11vw] md:text-[9.5vw]";

  // Heading Zoom and Opacity Mappings
  const scale = useTransform(activeProgress, [0, 0.35], [1, 2.5]);
  const textOpacity = useTransform(activeProgress, [0, 0.25, 0.32], [1, 1, 0]);

  // Determine actual text color: white (#FFFFFF) if bg is dark/black, black (#000000) if bg is light/white
  const isDarkBg = bgHex === "#000000" || bgHex === "#050505" || bgHex === "#0C0C0C" || bgHex === "#060607" || (bgHex && bgHex.toLowerCase().startsWith("#0"));
  const textColor = textColorHex || (isDarkBg ? "#FFFFFF" : "#000000");

  return (
    <div 
      style={{ backgroundColor: bgHex }}
      className={`relative w-full h-screen overflow-hidden select-none flex items-center justify-center ${className}`}
    >
      {/* Background Tweak 1: Static Radial Dark Vignette */}
      <div 
        style={{
          background: `radial-gradient(circle at center, rgba(0,0,0,0) 30%, ${bgHex} 100%)`
        }}
        className="absolute inset-0 z-10 pointer-events-none" 
      />

      {/* Background Tweak 2: Animated Center Glow */}
      <motion.div 
        animate={{ 
          opacity: [0.08, 0.16, 0.08],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          background: `radial-gradient(circle at center, rgba(${glowRgb}, 0.18) 0%, transparent 60%)`
        }}
        className="absolute inset-0 z-0 pointer-events-none" 
      />

      {/* Background Tweak 3: Clean Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] z-0 pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center text-center px-4 max-w-6xl w-full z-20">
        {/* Massive Deltha Uppercase Heading without text shadow */}
        <motion.h1 
          style={{ 
            fontFamily: 'var(--font-deltha), "Deltha", sans-serif',
            color: textColor,
            scale,
            opacity: textOpacity,
            textShadow: "none",
          }}
          className={`font-deltha font-black tracking-[-0.04em] leading-[0.8] select-none relative whitespace-nowrap drop-shadow-none ${fontSizeClass}`}
        >
          {displayTitle}
        </motion.h1>
      </div>
    </div>
  );
}
