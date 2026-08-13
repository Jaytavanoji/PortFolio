"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import TextRevealBlur from "@/components/TextRevealBlur";
import {
  ArrowRight,
  GraduationCap,
  Database,
  Cpu,
  Code,
  Flame,
  FileCode,
  Workflow,
  Search,
  CheckCircle2,
  Mail,
  Linkedin,
  Github,
  Send,
  Loader2,
  AlertCircle,
  Copy,
  Check,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ImageText } from "@/components/ui/image-text";
import { FeatCard } from "@/components/ui/feat-card";
import { FooterSection } from "@/components/ui/footer-section";
import { GlareCard } from "@/components/ui/glare-card";
import CinematicBackground from "@/components/ui/CinematicBackground";

// Modular Cinematic Narrative Components
import CinematicScrollSection from "@/components/cinematic/CinematicScrollSection";
import AboutSection from "@/components/cinematic/AboutSection";
import EditorialSkillsSection from "@/components/cinematic/EditorialSkillsSection";
import ProjectsSection from "@/components/cinematic/ProjectsSection";
import SelectedProjectDetail from "@/components/cinematic/SelectedProjectDetail";
import AiExperimentsSection from "@/components/cinematic/AiExperimentsSection";
import { CrowdCanvas } from "@/components/ui/crowd-canvas";

// Locked Music Carousel & Player System
import { useAudio } from "@/context/AudioContext";
import DiagonalMusicCarousel from "@/components/music/DiagonalMusicCarousel";
import MusicControls from "@/components/music/MusicControls";

// ============================================================================
// 1. EXACT FRAME CONFIGURATION (Frames 1 to 150 inclusive = 150 frames @ 30fps = 5s)
// ============================================================================
const START_FRAME = 1;
const END_FRAME = 150;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1; // 150 frames

const LERP_FACTOR = 0.08;

const getFrameSrc = (frameNum: number): string => {
  const padded = String(frameNum).padStart(4, "0");
  return `/webp/frame_${padded}.webp`;
};

type DecodedDrawable = ImageBitmap | HTMLImageElement;

/* ──────────────────────────────────────────────────────────
   Academic Timeline Data & Widget for About Section
   ────────────────────────────────────────────────────────── */
interface TimelineEvent {
  title: string;
  detail: string;
  status: "completed" | "active" | "planned";
  time: string;
  icon: any;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    title: "B.Tech Computer Science & Engineering",
    detail: "D.Y. Patil International University, Akurdi, Pune",
    status: "active",
    time: "2024 - 2028",
    icon: GraduationCap,
  },
  {
    title: "System Architecture & API Design",
    detail: "Focused on modular backends, microservices, and databases",
    status: "completed",
    time: "Ongoing",
    icon: Database,
  },
  {
    title: "AI Workflows & Vector Search",
    detail: "Building production RAG systems and LLM pipelines",
    status: "completed",
    time: "Ongoing",
    icon: Cpu,
  },
];

function CardTimeline() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 gap-2">
      <div className="flex flex-col gap-2">
        {TIMELINE_EVENTS.map((evt) => (
          <div
            key={evt.title}
            className="flex items-start gap-2.5 p-2 rounded-xl bg-black/40 border border-white/5"
          >
            <div className="p-1.5 rounded-lg bg-[#6E1A2B]/10 border border-[#6E1A2B]/20 shrink-0 mt-0.5">
              <evt.icon className="w-3.5 h-3.5 text-[#8E2938]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-white tracking-wide truncate">
                {evt.title}
              </span>
              <span className="text-[8px] font-runtime text-[#8A8A8A] truncate">
                {evt.detail}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   SVG RAG Ingestion Pipeline Node Widget for Skills Section
   ────────────────────────────────────────────────────────── */
function CardRagPipeline() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-runtime text-[#8A8A8A]">VECTOR INGESTION PIPELINE</span>
        <span className="text-[8px] font-runtime text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
          QDRANT DISTRIBUTED
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2 items-center justify-center py-1">
        {[
          { name: "DOCS", icon: FileCode, status: "CHUNK" },
          { name: "EMBED", icon: Cpu, status: "384d" },
          { name: "INDEX", icon: Database, status: "HNSW" },
          { name: "QUERY", icon: Search, status: "HYBRID" },
        ].map((step) => (
          <div key={step.name} className="flex flex-col items-center p-2 rounded-xl bg-black/60 border border-white/5 text-center">
            <step.icon className="w-4 h-4 text-[#8E2938] mb-1" />
            <span className="text-[9px] font-bold text-white tracking-wider">{step.name}</span>
            <span className="text-[7px] font-runtime text-[#8A8A8A] mt-0.5">{step.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   MASTER PORTFOLIO WITH HIGH-DENSITY SCROLL-LOCKED SECTIONS
   ────────────────────────────────────────────────────────── */
export default function MasterCinematicScrollPortfolio() {
  // ── HERO CANVAS ENGINE (🔒 100% UNTOUCHED 150-frame @ 30fps) ──
  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const frameCacheRef = useRef<Map<number, DecodedDrawable>>(new Map());
  const isFrameDecodedRef = useRef<Set<number>>(new Set());

  const targetProgressRef = useRef(0);
  const targetFrameRef = useRef<number>(START_FRAME);
  const currentFrameRef = useRef<number>(START_FRAME);
  const isLoopRunningRef = useRef(false);
  const animationFrameIdRef = useRef<number | null>(null);

  const layoutMetricsRef = useRef({
    totalScrollable: 1,
    containerTop: 0,
  });

  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLowCore = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
      const isMobile = window.innerWidth <= 768;
      setIsLowEndDevice(isLowCore || isMobile);
    }
  }, []);

  const updateLayoutMetrics = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const displayH = window.innerHeight;
    const rect = container.getBoundingClientRect();
    const totalScrollable = Math.max(1, container.offsetHeight - displayH);
    const containerTop = rect.top + window.scrollY;

    layoutMetricsRef.current = { totalScrollable, containerTop };
  }, []);

  const renderCanvasFrame = useCallback(
    (frameNum: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const roundedFrame = Math.max(
        START_FRAME,
        Math.min(END_FRAME, Math.round(frameNum))
      );
      const img = frameCacheRef.current.get(roundedFrame);
      if (!img) return;

      const maxDpr = isLowEndDevice ? 1.0 : 1.25;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      const displayW = window.innerWidth;
      const displayH = window.innerHeight;
      const targetWidth = Math.floor(displayW * dpr);
      const targetHeight = Math.floor(displayH * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = isLowEndDevice ? "low" : "medium";

      const imgW = img.width;
      const imgH = img.height;
      const scale = Math.max(targetWidth / imgW, targetHeight / imgH);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const offsetX = (targetWidth - drawW) / 2;
      const offsetY = (targetHeight - drawH) / 2;

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    },
    [isLowEndDevice]
  );

  const decodeFrame = useCallback(async (frameNum: number): Promise<void> => {
    if (isFrameDecodedRef.current.has(frameNum)) return;
    const src = getFrameSrc(frameNum);
    try {
      if (
        typeof window !== "undefined" &&
        "createImageBitmap" in window &&
        typeof fetch !== "undefined"
      ) {
        const response = await fetch(src);
        const blob = await response.blob();
        const bitmap = await createImageBitmap(blob);
        frameCacheRef.current.set(frameNum, bitmap);
        isFrameDecodedRef.current.add(frameNum);
      } else {
        const img = new Image();
        img.src = src;
        await img.decode();
        frameCacheRef.current.set(frameNum, img);
        isFrameDecodedRef.current.add(frameNum);
      }
    } catch {
      const fallbackImg = new Image();
      fallbackImg.src = getFrameSrc(frameNum);
      frameCacheRef.current.set(frameNum, fallbackImg);
      isFrameDecodedRef.current.add(frameNum);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;
    decodeFrame(START_FRAME).then(() => {
      if (!isCancelled) {
        updateLayoutMetrics();
        renderCanvasFrame(START_FRAME);
      }
    });

    const CONCURRENCY = isLowEndDevice ? 3 : 6;
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
  }, [decodeFrame, isLowEndDevice, renderCanvasFrame, updateLayoutMetrics]);

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

  const handleScroll = useCallback(() => {
    const { totalScrollable, containerTop } = layoutMetricsRef.current;
    const scrolled = window.scrollY - containerTop;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

    targetProgressRef.current = progress;
    targetFrameRef.current = START_FRAME + progress * (END_FRAME - START_FRAME);

    startAnimationLoop();
  }, [startAnimationLoop]);

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

  // Audio Context for Locked Music Section
  const {
    tracks,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    progress,
    togglePlay,
    playTrack,
    nextTrack,
    prevTrack,
    seek,
  } = useAudio();

  const handleSelectTrack = useCallback(
    (index: number) => {
      playTrack(index);
    },
    [playTrack]
  );

  // Contact Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("jayshankartavanoji2020@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="relative w-full bg-[#050505] text-white selection:bg-[#6E1A2B]/30 selection:text-white">
      {/* ── 1. HERO SECTION (🔒 100% UNTOUCHED LANDING / HERO PAGE) ── */}
      <section id="hero" className="relative w-full bg-[#050505]">
        <main
          ref={containerRef}
          className="relative w-full bg-[#050505]"
          style={{ height: "750vh" }}
        >
          <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden bg-black flex flex-col justify-between">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover block z-0"
              aria-label="Fullscreen 150-frame 30fps cinematic scroll animation"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10"
              aria-hidden="true"
            />

            {/* Header Badge */}
            <div className="relative z-20 w-full px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between pointer-events-none">
              <div className="flex items-center px-4 py-2 bg-black border-2 border-white shadow-[4px_4px_0px_#6E1A2B] transition-all pointer-events-auto select-none">
                <span className="font-runtime text-xs sm:text-sm font-black tracking-[0.2em] uppercase text-white">
                  JAY TAVANOJI
                </span>
              </div>
            </div>

            {/* Middle Content */}
            <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-24 sm:pb-28">
              <div className="flex flex-col items-start max-w-2xl lg:max-w-4xl z-20">
                <span className="text-sm sm:text-base md:text-lg font-bold tracking-[0.25em] text-[#8E2938] uppercase mb-2">
                  Hey, I&apos;m
                </span>
                <div className="w-full">
                  <TextRevealBlur
                    prefix="BUILDING "
                    texts={["SOLUTIONS.", "BACKENDS.", "AI SYSTEMS.", "FAST APIS."]}
                    revealColor="#6E1A2B"
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

              <div className="flex flex-col items-start md:items-end text-left md:text-right max-w-sm">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
                  Great software should feel invisible.
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed">
                  I build practical software, backend systems, and AI-powered applications — turning ideas into useful products.
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="#projects"
                    className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#6E1A2B] hover:bg-[#5C1222] text-white text-xs font-semibold transition-all shadow-lg hover:scale-105"
                  >
                    <span>View My Work</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                  <a
                    href="#contact"
                    className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-black/40 hover:bg-black/80 border border-white/20 text-white text-xs font-medium transition-all backdrop-blur-md hover:border-white/40"
                  >
                    <span>Let&apos;s Connect</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>

      {/* ── 01. ABOUT SECTION (LIGHT THEME DEDICATED HEADER & CONTENT) ── */}
      <CinematicScrollSection 
        id="about" 
        pinned={true} 
        autoPan={true} 
        travelHeight="300vh" 
        watermarkText="ABOUT" 
        subtext="IDENTITY & PHILOSOPHY"
        glowRgb="220, 225, 230"
        accentHex="#1E293B"
        bgHex="#FAFAFA"
      >
        {() => <AboutSection />}
      </CinematicScrollSection>

      {/* ── 02. TECH STACK SECTION (DEDICATED SCROLL HEADER) ── */}
      <CinematicScrollSection 
        id="skills" 
        pinned={true} 
        autoPan={true} 
        travelHeight="300vh" 
        watermarkText="TECH STACK" 
        subtext="SYSTEMS & PIPELINES"
        glowRgb="0, 0, 0"
        accentHex="#CBD5E1"
        bgHex="#000000"
        fullWidth={true}
      >
        {() => <EditorialSkillsSection />}
      </CinematicScrollSection>

      {/* ── 03. PROJECTS SECTION (RESTORED 3D STACKING CARDS ANIMATION) ── */}
      <div id="projects">
        <ProjectsSection />
      </div>

      {/* ── 04. FEATURED PROJECT CASE STUDY (BLACK BG) ── */}
      <CinematicScrollSection 
        id="featured-project" 
        pinned={true} 
        autoPan={true} 
        travelHeight="300vh" 
        watermarkText="FEATURED PROJECT" 
        subtext="FEATURED ARCHITECTURE"
        glowRgb="0, 0, 0"
        accentHex="#CBD5E1"
        bgHex="#000000"
      >
        {() => <SelectedProjectDetail />}
      </CinematicScrollSection>

      {/* ── 05. EXPERIMENTS & AI LAB (WHITE BG DEDICATED HEADER & CONTENT) ── */}
      <CinematicScrollSection 
        id="ai-experiments" 
        pinned={true} 
        autoPan={true} 
        travelHeight="300vh" 
        watermarkText="EXPERIMENTS" 
        subtext="RESEARCH & PROTOTYPES"
        glowRgb="220, 220, 225"
        accentHex="#1E293B"
        bgHex="#FFFFFF"
      >
        {() => <AiExperimentsSection />}
      </CinematicScrollSection>

      {/* ── 06. MUSIC SECTION (PINNED LOCK EFFECT — 🔒 CAROUSEL SCENE) ── */}
      <CinematicScrollSection 
        id="music" 
        pinned={true} 
        autoPan={false} 
        travelHeight="300vh" 
        watermarkText="MUSIC" 
        glowRgb="0, 0, 0"
        accentHex="#E2E8F0"
        bgHex="#000000"
        hideHeaderLine={true}
        fullWidth={true}
      >
        {() => (
          <div className="relative w-full h-screen overflow-hidden">

            {/* ── Background layers ── */}
            {/* Animated Crowd Canvas Background */}
            <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} className="absolute bottom-0 h-full w-full opacity-25 pointer-events-none z-0 filter invert contrast-200" />

            {/* 2. Subtle grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px] z-0 pointer-events-none opacity-30" />

            {/* ── Carousel — full canvas, centered ── */}
            <div className="absolute inset-0 flex items-center justify-center z-10 -translate-y-10 sm:-translate-y-12">
              <DiagonalMusicCarousel
                tracks={tracks}
                activeIndex={currentTrackIndex}
                isPlaying={isPlaying}
                onSelectTrack={handleSelectTrack}
              />
            </div>

            {/* ── Controls — absolute bottom overlay ── */}
            <div className="absolute bottom-14 sm:bottom-20 left-0 right-0 flex justify-center z-20 px-4">
              <div className="w-full max-w-sm sm:max-w-md">
                <MusicControls
                  currentTrack={currentTrack}
                  isPlaying={isPlaying}
                  currentTime={currentTime}
                  duration={duration}
                  progress={progress}
                  onTogglePlay={togglePlay}
                  onNext={nextTrack}
                  onPrev={prevTrack}
                  onSeek={seek}
                />
              </div>
            </div>

          </div>
        )}
      </CinematicScrollSection>

      {/* ── 7. CONTACT SECTION & WEBSITE ENDING (LIGHT THEME) ── */}
      <CinematicScrollSection 
        id="contact" 
        pinned={true} 
        autoPan={true} 
        travelHeight="300vh" 
        watermarkText="C O N T A C T" 
        subtext="CONNECT & BUILD"
        glowRgb="220, 220, 225"
        accentHex="#1E293B"
        bgHex="#FFFFFF"
      >
        {() => (
          <div className="flex flex-col justify-between max-w-6xl mx-auto px-4 sm:px-8 w-full min-h-full py-12 text-neutral-900 font-runtime select-none bg-white">
            
            {/* ── SYMMETRICAL 2-COLUMN CONTACT GRID (6-COL + 6-COL) ── */}
            <div className="my-auto py-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left Side (6 Cols): Support Form Card */}
                <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-runtime text-neutral-500 font-bold tracking-widest uppercase">ENGINEERING SUPPORT</span>
                      <span className="p-2 rounded-xl bg-neutral-200 text-neutral-900 shadow-sm">
                        <Mail className="w-4 h-4" />
                      </span>
                    </div>

                    <h3 className="text-2xl font-deltha font-bold text-neutral-950 uppercase tracking-wider mb-6">
                      NEED ENGINEERING HELP?
                    </h3>

                    <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-runtime text-neutral-600 font-bold uppercase">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jay Tavanoji"
                          className="px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-xs focus:outline-none focus:border-neutral-900 transition-all placeholder:text-neutral-400"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-runtime text-neutral-600 font-bold uppercase">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@example.com"
                          className="px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-xs focus:outline-none focus:border-neutral-900 transition-all placeholder:text-neutral-400"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-runtime text-neutral-600 font-bold uppercase">Message *</label>
                        <textarea
                          required
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us what you're looking for—software roles, backend projects, or AI pipelines."
                          className="px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-xs focus:outline-none focus:border-neutral-900 transition-all placeholder:text-neutral-400 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-neutral-900 text-white font-runtime text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all disabled:opacity-50 mt-2 shadow-lg"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      {submitStatus === "success" && (
                        <span className="text-xs font-runtime text-emerald-600 text-center font-bold">
                          Message sent successfully!
                        </span>
                      )}
                    </form>
                  </div>
                </div>

                {/* Right Side (6 Cols): Ready to Build Panel */}
                <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-xl">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-deltha font-bold uppercase tracking-tight text-neutral-950 leading-tight mb-6">
                      READY TO BUILD SOMETHING EXTRAORDINARY?
                    </h2>

                    {/* Developer Lead Card */}
                    <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-300 flex items-center justify-center font-deltha font-bold text-neutral-900 text-sm">
                          JT
                        </div>
                        <div>
                          <span className="text-[10px] font-runtime text-neutral-500 font-bold tracking-widest uppercase block">SOFTWARE DEVELOPER</span>
                          <h4 className="font-deltha font-bold text-neutral-950 text-sm">Jay Tavanoji</h4>
                        </div>
                      </div>

                      <button
                        onClick={copyEmailToClipboard}
                        className="px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800 font-runtime text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedEmail ? "Copied" : "Copy Email"}</span>
                      </button>
                    </div>

                    {/* Contact Links & Email */}
                    <div className="space-y-4 mb-6 pt-4 border-t border-neutral-200">
                      <div>
                        <p className="text-xs text-neutral-500 font-runtime uppercase tracking-wider font-bold mb-1">Direct Email</p>
                        <a
                          href="mailto:jayshankartavanoji2020@gmail.com"
                          className="inline-flex items-center gap-2 font-runtime text-xs sm:text-sm font-bold text-neutral-900 hover:underline break-all"
                        >
                          <Mail className="w-4 h-4 text-neutral-900 flex-shrink-0" />
                          <span>jayshankartavanoji2020@gmail.com</span>
                        </a>
                      </div>

                      <div>
                        <p className="text-xs text-neutral-500 font-runtime uppercase tracking-wider font-bold mb-1">WhatsApp Direct</p>
                        <a
                          href="https://wa.me/918618507400?text=Hi%20Jay%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 text-white font-runtime text-xs font-bold hover:bg-neutral-800 transition-all shadow-md"
                        >
                          <span>Chat on WhatsApp</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <div>
                        <p className="text-xs text-neutral-500 font-runtime uppercase tracking-wider font-bold mb-1">Social Profiles</p>
                        <div className="flex items-center gap-2">
                          <a
                            href="https://github.com/Jaytavanoji"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white border border-neutral-300 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                          <a
                            href="https://www.linkedin.com/in/jay-tavanoji-4606b93b9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white border border-neutral-300 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sitemap & Copyright */}
                  <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 font-runtime text-xs text-neutral-500 font-medium">
                    <div className="flex items-center gap-3">
                      <a href="#about" className="hover:text-neutral-900 transition-colors">About</a>
                      <a href="#skills" className="hover:text-neutral-900 transition-colors">Tech Stack</a>
                      <a href="#projects" className="hover:text-neutral-900 transition-colors">Projects</a>
                      <a href="#experiments" className="hover:text-neutral-900 transition-colors">Experiments</a>
                    </div>
                    <div>
                      © {new Date().getFullYear()} Jay Tavanoji
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        )}
      </CinematicScrollSection>

      {/* ── 8. SOURCE-OF-TRUTH FOOTER SECTION ── */}
      <div className="w-full bg-white py-8">
        <FooterSection />
      </div>
    </div>
  );
}
