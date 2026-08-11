"use client";

import React, { useEffect, useRef, useCallback } from "react";
import TextRevealBlur from "@/components/TextRevealBlur";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// ============================================================================
// 1. EXACT FRAME CONFIGURATION (Frames 1 to 151 inclusive = 151 frames @ 50fps)
// ============================================================================
const START_FRAME = 1;
const END_FRAME = 151;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1; // 151 frames

// Configurable smoothing factor (0.08 provides silky, 50fps buttery Apple-grade momentum decay)
const LERP_FACTOR = 0.08;

// Path mapping: Zero-overhead WebP frame assets
const getFrameSrc = (frameNum: number): string => {
  const padded = String(frameNum).padStart(6, "0");
  return `/webp/frame_${padded}.webp`;
};

type DecodedDrawable = ImageBitmap | HTMLImageElement;

export default function IsolatedCinematicHeroPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ============================================================================
  // 5 & 6. PRELOAD & DECODED FRAME CACHE (Never decode during scroll)
  // ============================================================================
  const frameCacheRef = useRef<Map<number, DecodedDrawable>>(new Map());
  const isFrameDecodedRef = useRef<Set<number>>(new Set());

  // ============================================================================
  // 2, 9 & 11. HIGH-FREQUENCY ANIMATION REFS (Outside React render cycle)
  // ============================================================================
  const targetProgressRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(START_FRAME);
  const currentFrameRef = useRef<number>(START_FRAME);
  const lastRenderedFrameRef = useRef<number>(-1);
  const animationFrameIdRef = useRef<number | null>(null);

  // ============================================================================
  // 10. CACHED VIEWPORT & LAYOUT METRICS (Zero DOM measurements inside RAF)
  // ============================================================================
  const layoutMetricsRef = useRef<{
    totalScrollable: number;
    containerTop: number;
    clientWidth: number;
    clientHeight: number;
    dpr: number;
  }>({
    totalScrollable: 1,
    containerTop: 0,
    clientWidth: 1920,
    clientHeight: 1080,
    dpr: 1,
  });

  // Resolve requested frame or nearest available decoded frame from in-memory cache
  const getDecodedFrame = useCallback((frameNum: number): DecodedDrawable | null => {
    const direct = frameCacheRef.current.get(frameNum);
    if (direct) return direct;

    // Outward search for closest decoded frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = frameNum - offset;
      const next = frameNum + offset;
      if (prev >= START_FRAME && frameCacheRef.current.has(prev)) {
        return frameCacheRef.current.get(prev)!;
      }
      if (next <= END_FRAME && frameCacheRef.current.has(next)) {
        return frameCacheRef.current.get(next)!;
      }
    }
    return null;
  }, []);

  // ============================================================================
  // 4 & 7. HARDWARE CANVAS RENDERING (Draws decoded bitmaps with sub-frame blending)
  // ============================================================================
  const renderCanvasFrame = useCallback(
    (frameFloat: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
      if (!ctx) return;

      const clampedFloat = Math.max(START_FRAME, Math.min(END_FRAME, frameFloat));
      const baseFrame = Math.floor(clampedFloat);
      const nextFrame = Math.min(END_FRAME, baseFrame + 1);
      const fraction = clampedFloat - baseFrame;

      const drawableBase = getDecodedFrame(baseFrame);
      if (!drawableBase) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = drawableBase.width;
      const ih = drawableBase.height;

      if (!iw || !ih) return;

      // High-precision aspect-ratio cover math
      const scale = Math.max(cw / iw, ch / ih);
      const drawW = Math.ceil(iw * scale);
      const drawH = Math.ceil(ih * scale);
      const offsetX = Math.floor((cw - drawW) / 2);
      const offsetY = Math.floor((ch - drawH) / 2);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Base frame draw
      ctx.globalAlpha = 1.0;
      ctx.drawImage(drawableBase, 0, 0, iw, ih, offsetX, offsetY, drawW, drawH);

      // Sub-frame smooth alpha cross-blend for silky continuous video feel
      if (fraction > 0.03 && nextFrame !== baseFrame) {
        const drawableNext = getDecodedFrame(nextFrame);
        if (drawableNext) {
          ctx.globalAlpha = fraction;
          ctx.drawImage(drawableNext, 0, 0, iw, ih, offsetX, offsetY, drawW, drawH);
          ctx.globalAlpha = 1.0;
        }
      }

      lastRenderedFrameRef.current = Math.round(clampedFloat);
    },
    [getDecodedFrame]
  );

  // ============================================================================
  // 10 & 12. VIEWPORT & CANVAS RESOLUTION SYNC (Capped DPR for locked 60fps)
  // ============================================================================
  const updateLayoutMetrics = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const displayW = window.innerWidth;
    const displayH = window.innerHeight;
    // Cap DPR at 1.5 to guarantee buttery 60fps rendering even on 4K Retina screens
    const dpr = Math.min(1.5, Math.max(1, window.devicePixelRatio || 1));

    const rect = container.getBoundingClientRect();
    const totalScrollable = Math.max(1, container.offsetHeight - displayH);
    const containerTop = rect.top + window.scrollY;

    layoutMetricsRef.current = {
      totalScrollable,
      containerTop,
      clientWidth: displayW,
      clientHeight: displayH,
      dpr,
    };

    const physicalW = Math.round(displayW * dpr);
    const physicalH = Math.round(displayH * dpr);

    if (canvas.width !== physicalW || canvas.height !== physicalH) {
      canvas.width = physicalW;
      canvas.height = physicalH;
      canvas.style.width = `${displayW}px`;
      canvas.style.height = `${displayH}px`;

      const activeFrame =
        lastRenderedFrameRef.current >= START_FRAME
          ? lastRenderedFrameRef.current
          : START_FRAME;
      renderCanvasFrame(activeFrame);
    }
  }, [renderCanvasFrame]);

  // ============================================================================
  // 5 & 6. ASYNC PRELOADER & IMAGEBITMAP DECODER (Frames 7 to 84)
  // ============================================================================
  useEffect(() => {
    let isCancelled = false;

    // Helper: decode image via createImageBitmap with HTMLImageElement fallback
    const decodeFrame = async (frameNum: number): Promise<void> => {
      try {
        const src = getFrameSrc(frameNum);
        if (typeof window !== "undefined" && "createImageBitmap" in window && typeof fetch !== "undefined") {
          const response = await fetch(src);
          const blob = await response.blob();
          if (isCancelled) return;
          const bitmap = await createImageBitmap(blob);
          if (isCancelled) return;
          frameCacheRef.current.set(frameNum, bitmap);
          isFrameDecodedRef.current.add(frameNum);
        } else {
          const img = new Image();
          img.src = src;
          await img.decode();
          if (isCancelled) return;
          frameCacheRef.current.set(frameNum, img);
          isFrameDecodedRef.current.add(frameNum);
        }

        // If this decoded frame is currently targeted and not yet rendered, render immediately
        const currentTarget = Math.round(currentFrameRef.current);
        if (currentTarget === frameNum && lastRenderedFrameRef.current !== frameNum) {
          renderCanvasFrame(frameNum);
        }
      } catch {
        // Fallback for decode error: standard Image load
        const fallbackImg = new Image();
        fallbackImg.src = getFrameSrc(frameNum);
        fallbackImg.onload = () => {
          if (!isCancelled) {
            frameCacheRef.current.set(frameNum, fallbackImg);
            isFrameDecodedRef.current.add(frameNum);
            if (Math.round(currentFrameRef.current) === frameNum) {
              renderCanvasFrame(frameNum);
            }
          }
        };
      }
    };

    // 1. Instantly decode Frame 7 for First Contentful Paint
    decodeFrame(START_FRAME).then(() => {
      if (!isCancelled) {
        updateLayoutMetrics();
        renderCanvasFrame(START_FRAME);
      }
    });

    // 2. Concurrently preload all remaining frames (8 to 84)
    const CONCURRENCY = 12;
    let nextFrame = START_FRAME + 1;
    let activeWorkers = 0;

    const worker = () => {
      if (isCancelled) return;
      while (activeWorkers < CONCURRENCY && nextFrame <= END_FRAME) {
        const f = nextFrame++;
        activeWorkers++;
        decodeFrame(f).finally(() => {
          activeWorkers--;
          worker();
        });
      }
    };

    worker();

    return () => {
      isCancelled = true;
    };
  }, [renderCanvasFrame, updateLayoutMetrics]);

  // ============================================================================
  // 3 & 9. HIGH-PERFORMANCE SCROLL LISTENER (Updates ONLY targetFrameRef)
  // ============================================================================
  const handleScroll = useCallback(() => {
    const { totalScrollable, containerTop } = layoutMetricsRef.current;
    const scrolled = window.scrollY - containerTop;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

    targetProgressRef.current = progress;
    // Map progress 0.0 -> 7, 1.0 -> 84 as float
    targetFrameRef.current = START_FRAME + progress * (END_FRAME - START_FRAME);
  }, []);

  // ============================================================================
  // 2, 3, 7 & 8. SINGLE REQUESTANIMATIONFRAME SMOOTH INTERPOLATION LOOP
  // ============================================================================
  useEffect(() => {
    const renderLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // Smoothly approach targetFrame without noticeable input lag
      if (Math.abs(diff) > 0.0001) {
        currentFrameRef.current += diff * LERP_FACTOR;
      } else {
        currentFrameRef.current = target;
      }

      // Continuous sub-frame rendering for buttery fluid video motion
      if (Math.abs(diff) > 0.0001 || Math.abs(currentFrameRef.current - lastRenderedFrameRef.current) > 0.01) {
        renderCanvasFrame(currentFrameRef.current);
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [renderCanvasFrame]);

  // ============================================================================
  // EVENT LISTENERS (Resize & Passive Scroll)
  // ============================================================================
  useEffect(() => {
    updateLayoutMetrics();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateLayoutMetrics, { passive: true });
    window.addEventListener("orientationchange", updateLayoutMetrics, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateLayoutMetrics);
      window.removeEventListener("orientationchange", updateLayoutMetrics);
    };
  }, [handleScroll, updateLayoutMetrics]);

  return (
    <div className="relative w-full bg-[#050505] text-white selection:bg-[#FF4D1F]/30 selection:text-white">
      {/* ── ISOLATED FULLSCREEN 78-FRAME HERO SCROLL CONTAINER (Frames 7 to 84) ── */}
      <main
        ref={containerRef}
        className="relative w-full bg-[#050505]"
        style={{ height: "1000vh" }} // Calibrated travel distance for 151 frames @ 50fps smooth scrub
      >
        {/* Sticky Fullscreen 100vw x 100svh Canvas Stage */}
        <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden bg-black flex flex-col justify-between">
          {/* Fullscreen 78-Frame Hardware Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover block z-0"
            aria-label="Fullscreen 78-frame cinematic scroll animation"
          />

          {/* Ambient Vignette for Depth & Contrast */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10"
            aria-hidden="true"
          />

          {/* ── TOP HEADER: BRUTALIST THEMED JAY TAVANOJI BRAND BADGE ── */}
          <div className="relative z-20 w-full px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between pointer-events-none">
            <div className="flex items-center px-4 py-2 bg-black border-2 border-white shadow-[4px_4px_0px_#FF4D1F] transition-all pointer-events-auto select-none">
              <span className="font-mono text-xs sm:text-sm font-black tracking-[0.2em] uppercase text-white">
                JAY TAVANOJI
              </span>
            </div>
          </div>

          {/* ── HERO MIDDLE LAYER: Left Title + Right "Great Software Should Feel Invisible" ── */}
          <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-24 sm:pb-28">
            {/* Left Column: Eyebrow + Liquid Blob Text Reveal Headline */}
            <div className="flex flex-col items-start max-w-2xl lg:max-w-4xl z-20">
              <span className="text-sm sm:text-base md:text-lg font-bold tracking-[0.25em] text-[#FF4D1F] uppercase mb-2">
                Hey, I&apos;m
              </span>
              <div className="w-full">
                <TextRevealBlur
                  prefix="BUILDING "
                  texts={["SOLUTIONS.", "BACKENDS.", "AI SYSTEMS.", "FAST APIS."]}
                  revealColor="#FF4D1F"
                  wipeColor="#FFFFFF"
                  blobSize={14}
                  font={{
                    fontSize: "clamp(3.2rem, 7.5vw, 6.8rem)",
                    fontWeight: 900,
                    lineHeight: "0.92",
                    letterSpacing: "-0.035em",
                    fontFamily: "var(--font-instrument-sans), var(--font-inter), sans-serif",
                    textAlign: "left",
                  }}
                  transition={{
                    type: "tween",
                    duration: 0.55,
                    delay: 1.6,
                    ease: "easeOut",
                    staggerChildren: 0.06,
                  }}
                />
              </div>
              <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-[#A1A1AA] font-semibold tracking-wide drop-shadow-md">
                Software Developer · Backend Engineer · AI Explorer
              </p>
            </div>

            {/* Right Column: "Great software should feel invisible." Section */}
            <div className="flex flex-col items-start md:items-end text-left md:text-right max-w-sm">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
                Great software should feel invisible.
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed">
                I build practical software, backend systems, and AI-powered applications — turning ideas into useful products.
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center gap-3">
                <Link
                  href="/projects"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#FF4D1F] hover:bg-[#E63E12] text-white text-xs font-semibold transition-all shadow-lg hover:scale-105"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-black/40 hover:bg-black/80 border border-white/20 text-white text-xs font-medium transition-all backdrop-blur-md hover:border-white/40"
                >
                  <span>Let&apos;s Connect</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
