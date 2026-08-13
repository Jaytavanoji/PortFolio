"use client";

import React from "react";
import { motion } from "framer-motion";

interface LargeTypographyTransitionProps {
  word: string;
  subtext?: string;
}

export default function LargeTypographyTransition({
  word,
  subtext,
}: LargeTypographyTransitionProps) {
  return (
    <div className="relative w-full py-16 sm:py-24 overflow-hidden flex flex-col items-center justify-center pointer-events-none select-none">
      {/* Background Ambient Glow */}
      <div className="absolute w-[400px] h-[200px] bg-[#6E1A2B]/5 blur-[120px] rounded-full" />

      {/* Large Editorial Watermark Typography */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/10 to-transparent drop-shadow-sm">
          {word}
        </span>

        {subtext && (
          <span className="mt-2 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#6E1A2B]/80">
            {subtext}
          </span>
        )}
      </motion.div>
    </div>
  );
}
