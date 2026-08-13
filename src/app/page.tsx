"use client";

import React, { useEffect, useRef, useCallback } from "react";
import TextRevealBlur from "@/components/TextRevealBlur";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// ============================================================================
// 1. EXACT FRAME CONFIGURATION (Frames 1 to 240 inclusive = 240 frames)
// ============================================================================
const START_FRAME = 1;
const END_FRAME = 240;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1; // 240 frames

// Configurable smoothing factor for Lenis momentum interpolation
const LERP_FACTOR = 0.08;

// Path mapping: Zero-overhead 240-frame WebP assets (frame_0001.webp to frame_0240.webp)
const getFrameSrc = (frameNum: number): string => {
  const padded = String(frameNum).padStart(4, "0");
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

  // ============================================================================
  // LOW-END DEVICE & HARDWARE CONCURRENCY DETECTION
  // ============================================================================
  const isLowEndDevice = useCallback((): boolean => {
    if (typeof window === "undefined") return false;
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4;
    return cores <= 4 || memory <= 4;
  }, []);

  // Track if RAF loop is active or sleeping
  const isLoopRunningRef = useRef<boolean>(false);
  const needsResizeRedrawRef = useRef<boolean>(false);

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
  // 4 & 7. HARDWARE CANVAS RENDERING (Zero redundant redraws, adaptive blending)
  // ============================================================================
  const renderCanvasFrame = useCallback(
    (frameFloat: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const roundedFrame = Math.round(frameFloat);
      // Redundant draw guard: Skip if exact frame was already rendered and no resize occurred
      if (roundedFrame === lastRenderedFrameRef.current && !needsResizeRedrawRef.current) {
        return;
      }
      needsResizeRedrawRef.current = false;

      const ctx = canvas.getContext("2d", { alpha: false });
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

      const lowEnd = isLowEndDevice();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = lowEnd ? "low" : "medium";

      // Base frame draw (Primary GPU rasterization)
      ctx.drawImage(drawableBase, 0, 0, iw, ih, offsetX, offsetY, drawW, drawH);

      // Sub-frame cross-blend only on non-constrained GPUs to eliminate duplicate drawImage work on low-end hardware
      if (!lowEnd && fraction > 0.2 && fraction < 0.8 && nextFrame !== baseFrame) {
        const drawableNext = getDecodedFrame(nextFrame);
        if (drawableNext) {
          ctx.globalAlpha = fraction;
          ctx.drawImage(drawableNext, 0, 0, iw, ih, offsetX, offsetY, drawW, drawH);
          ctx.globalAlpha = 1.0;
        }
      }

      lastRenderedFrameRef.current = roundedFrame;
    },
    [getDecodedFrame, isLowEndDevice]
  );

  // ============================================================================
  // 10 & 12. VIEWPORT & CANVAS RESOLUTION SYNC (Adaptive DPR cap for zero CPU choke)
  // ============================================================================
  const updateLayoutMetrics = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const displayW = window.innerWidth;
    const displayH = window.innerHeight;
    
    // Adaptive DPR cap: 1.0 for low-end / quad-core CPU systems, max 1.25 for high-end GPUs
    const maxDpr = isLowEndDevice() ? 1.0 : 1.25;
    const dpr = Math.min(maxDpr, Math.max(1, window.devicePixelRatio || 1));

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
      needsResizeRedrawRef.current = true;

      const activeFrame =
        lastRenderedFrameRef.current >= START_FRAME
          ? lastRenderedFrameRef.current
          : START_FRAME;
      renderCanvasFrame(activeFrame);
    }
  }, [isLowEndDevice, renderCanvasFrame]);

  // ============================================================================
  // 5 & 6. SMART ASYNC PRELOADER & IMAGEBITMAP DECODER (Controlled Concurrency)
  // ============================================================================
  useEffect(() => {
    let isCancelled = false;

    const decodeFrame = async (frameNum: number): Promise<void> => {
      if (frameCacheRef.current.has(frameNum)) return;
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

        const currentTarget = Math.round(currentFrameRef.current);
        if (currentTarget === frameNum) {
          renderCanvasFrame(frameNum);
        }
      } catch {
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

    // 1. Instantly decode Frame 1 for immediate First Contentful Paint
    decodeFrame(START_FRAME).then(() => {
      if (!isCancelled) {
        updateLayoutMetrics();
        renderCanvasFrame(START_FRAME);
      }
    });

    // 2. Controlled queue concurrency: 3 workers for low-end devices, 6 workers for high-end
    const CONCURRENCY = isLowEndDevice() ? 3 : 6;
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
  }, [isLowEndDevice, renderCanvasFrame, updateLayoutMetrics]);

  // ============================================================================
  // ON-DEMAND RAF ANIMATION LOOP (Sleeps when settled, 0% idle CPU)
  // ============================================================================
  const startAnimationLoop = useCallback(() => {
    if (isLoopRunningRef.current) return;
    isLoopRunningRef.current = true;

    const loop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0005) {
        currentFrameRef.current += diff * LERP_FACTOR;
        renderCanvasFrame(currentFrameRef.current);
        animationFrameIdRef.current = requestAnimationFrame(loop);
      } else {
        currentFrameRef.current = target;
        renderCanvasFrame(currentFrameRef.current);
        isLoopRunningRef.current = false;
        animationFrameIdRef.current = null;
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);
  }, [renderCanvasFrame]);

  // ============================================================================
  // 3 & 9. HIGH-PERFORMANCE SCROLL LISTENER (Updates targetFrameRef & wakes RAF)
  // ============================================================================
  const handleScroll = useCallback(() => {
    const { totalScrollable, containerTop } = layoutMetricsRef.current;
    const scrolled = window.scrollY - containerTop;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

    targetProgressRef.current = progress;
    targetFrameRef.current = START_FRAME + progress * (END_FRAME - START_FRAME);

    startAnimationLoop();
  }, [startAnimationLoop]);

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
        style={{ height: "1200vh" }} // Calibrated travel distance for 240 frames smooth Lenis scrub
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
