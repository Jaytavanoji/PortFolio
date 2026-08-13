"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, MotionValue, useTransform, motion } from "framer-motion";
import WaveText from "../ui/wave-text";

interface CinematicScrollSectionProps {
  id: string;
  travelHeight?: string;
  watermarkText: string;
  subtext?: string;
  pinned?: boolean;
  autoPan?: boolean;
  glowRgb?: string;     // Color code for ambient glow (e.g. "110, 26, 43")
  accentHex?: string;   // Color code for text accent (e.g. "#6E1A2B")
  bgHex?: string;       // Background base color (e.g. "#050505")
  textColorHex?: string; // Color code for header heading text
  hideHeaderLine?: boolean; // Hides the top watermark line overlay
  fullWidth?: boolean;      // Spans 100% full viewport width without side margins
  children: (progress: MotionValue<number>) => React.ReactNode;
}

export default function CinematicScrollSection({
  id,
  travelHeight = "300vh",
  watermarkText,
  subtext,
  pinned = false,
  autoPan = false,
  glowRgb = "110, 26, 43",
  accentHex = "#6E1A2B",
  bgHex = "#050505",
  textColorHex,
  hideHeaderLine = true,
  fullWidth = false,
  children,
}: CinematicScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Measure normalized scroll progress (0 -> 1) through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Remap progress: 0 -> 0.3 is intro, 0.3 -> 1.0 is content
  const childProgress = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  // Panning progress: delays vertical scroll panning until 0.45 scroll progress, letting the content settle
  const panProgress = useTransform(scrollYProgress, [0.45, 1], [0, 1]);

  // Intro animations: instantly visible at scroll start, fades out from 0.25 to 0.35
  const introOpacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const pointerEvents = useTransform(scrollYProgress, (p) => (p > 0.3 ? "none" : "auto") as any);
  const display = useTransform(scrollYProgress, (p) => (p > 0.38 ? "none" : "block") as any);

  // Content fade-in
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const headerOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 0.6]);

  useEffect(() => {
    if (!autoPan) return;
    const updateRange = () => {
      if (contentRef.current && stageRef.current) {
        const cHeight = contentRef.current.scrollHeight;
        const sHeight = stageRef.current.clientHeight;
        setScrollRange(Math.max(0, cHeight - sHeight));
      }
    };
    const timer = setTimeout(updateRange, 100);
    const ro = new ResizeObserver(updateRange);
    if (contentRef.current) ro.observe(contentRef.current);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, [autoPan]);

  const y = useTransform(panProgress, [0, 1], [0, -scrollRange]);

  if (pinned) {
    return (
      <section
        id={id}
        ref={containerRef}
        style={{ 
          height: travelHeight, 
          backgroundColor: bgHex 
        }}
        className="relative w-full"
      >
        {/* Pinned 100vh Viewport Stage */}
        <div 
          style={{ 
            backgroundColor: bgHex 
          }}
          className={`sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between select-none ${fullWidth ? "p-0" : "py-6 px-4 sm:px-8"}`}
        >
          {/* Subtle Top Header Line */}
          {!hideHeaderLine && (
            <motion.div 
              style={{ opacity: headerOpacity }}
              className="w-full flex items-center justify-between px-2 sm:px-6 pb-4 border-b border-white/5 z-20 relative"
            >
              <span 
                style={{ color: accentHex }}
                className="font-mono text-xs font-bold tracking-[0.3em] uppercase"
              >
                {watermarkText}
              </span>
              {subtext && (
                <span className="font-mono text-[10px] text-[#8A8A8A] tracking-[0.2em] uppercase hidden sm:inline">
                  {subtext}
                </span>
              )}
            </motion.div>
          )}

          {/* Background Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] z-0 pointer-events-none" />

          {/* 3D Wave Text Title Intro Scene */}
          <motion.div
            style={{ opacity: introOpacity, pointerEvents, display }}
            className="absolute inset-0 z-40"
          >
            <WaveText 
              title={watermarkText} 
              progress={scrollYProgress} 
              glowRgb={glowRgb}
              accentHex={accentHex}
              bgHex={bgHex}
              textColorHex={textColorHex}
            />
          </motion.div>

          {/* Main Pinned Canvas Stage (Content) */}
          <motion.div 
            style={{ opacity: contentOpacity }}
            ref={stageRef} 
            className={`relative z-10 w-full h-full ${fullWidth ? "max-w-none" : "max-w-[1600px] mx-auto"} ${autoPan ? "pt-12 overflow-visible" : "flex items-center justify-center"}`}
          >
            {autoPan ? (
              <motion.div ref={contentRef} style={{ y }} className="w-full pb-32">
                {children(childProgress)}
              </motion.div>
            ) : (
              children(childProgress)
            )}
          </motion.div>

        </div>
      </section>
    );
  }

  return (
    <section 
      id={id} 
      style={{ backgroundColor: bgHex }}
      className="relative w-full py-20"
    >
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] z-0 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">{children(scrollYProgress)}</div>
    </section>
  );
}
