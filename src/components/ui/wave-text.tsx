'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface WaveTextProps {
  title: string;
  progress?: MotionValue<number>;
  glowRgb?: string;     // Color code for ambient glow (e.g. "110, 26, 43")
  accentHex?: string;   // Color code for text accent (e.g. "#6E1A2B")
  bgHex?: string;       // Background base color (e.g. "#050505")
  className?: string;
}

export default function WaveText({ 
  title, 
  progress, 
  glowRgb = "110, 26, 43",
  accentHex = "#6E1A2B",
  bgHex = "#050505",
  className = "" 
}: WaveTextProps) {
    // Fallback static value if progress is not provided
    const fallbackProgress = useTransform(() => 0);
    const activeProgress = progress || fallbackProgress;

    // Format display title to uppercase, remove extra spaces
    const displayTitle = title
      .toUpperCase()
      .replace(/\s+/g, ' ')
      .trim();

    // Dynamically adjust font size for long titles (like EXPERIMENTS or TECH-STACK) to fit in one line
    const isLong = displayTitle.length > 8;
    const fontSizeClass = isLong
      ? "text-[11vw] sm:text-[10vw] md:text-[8.5vw]"
      : "text-[14vw] sm:text-[12vw] md:text-[11vw]";

    // Heading Zoom and Opacity Mappings
    const scale = useTransform(activeProgress, [0, 0.35], [1, 2.5]);
    const textOpacity = useTransform(activeProgress, [0, 0.25, 0.32], [1, 1, 0]);

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

            {/* Background Tweak 2: Animated Center Glow (Section Specific Accent) */}
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
                {/* Massive Condensed Uppercase Heading with Zoom-in Scroll Animation */}
                <motion.h1 
                  style={{ 
                    fontFamily: 'var(--font-big-shoulders-display), sans-serif',
                    scale,
                    opacity: textOpacity
                  }}
                  className={`font-black tracking-[-0.04em] leading-[0.8] text-white select-none relative mix-blend-difference drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] whitespace-nowrap ${fontSizeClass}`}
                >
                    {displayTitle}
                </motion.h1>
            </div>
        </div>
    );
}
