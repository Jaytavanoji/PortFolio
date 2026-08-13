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
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ImageText } from "@/components/ui/image-text";
import { FeatCard } from "@/components/ui/feat-card";
import { GlareCard } from "@/components/ui/glare-card";
import CinematicBackground from "@/components/ui/CinematicBackground";

// Modular Cinematic Narrative Components
import CinematicScrollSection from "@/components/cinematic/CinematicScrollSection";
import EditorialAboutSection from "@/components/cinematic/EditorialAboutSection";
import EditorialSkillsSection from "@/components/cinematic/EditorialSkillsSection";
import StickyProjectsShowcase from "@/components/cinematic/StickyProjectsShowcase";
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
              <span className="text-[8px] font-mono text-[#8A8A8A] truncate">
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
        <span className="text-[9px] font-mono text-[#8A8A8A]">VECTOR INGESTION PIPELINE</span>
        <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
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
            <span className="text-[7px] font-mono text-[#8A8A8A] mt-0.5">{step.status}</span>
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
                <span className="font-mono text-xs sm:text-sm font-black tracking-[0.2em] uppercase text-white">
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

      {/* ── 2. ABOUT SECTION (PINNED LOCK EFFECT) ── */}
      <CinematicScrollSection 
        id="about" 
        pinned={true} 
        travelHeight="450vh" 
        watermarkText="A B O U T" 
        subtext="IDENTITY & ARCHITECTURE"
        glowRgb="200, 200, 200"
        accentHex="#C0C0C0"
        bgHex="#090A0C"
      >
        {(progress) => <EditorialAboutSection progress={progress} />}
      </CinematicScrollSection>

      {/* ── 3. SKILLS SECTION (PINNED LOCK EFFECT) ── */}
      <CinematicScrollSection 
        id="skills" 
        pinned={true} 
        autoPan={true} 
        travelHeight="400vh" 
        watermarkText="tech-stack" 
        subtext="SYSTEMS & PIPELINES"
        glowRgb="160, 174, 192"
        accentHex="#94A3B8"
        bgHex="#08090B"
      >
        {(progress) => <EditorialSkillsSection progress={progress} />}
      </CinematicScrollSection>

      {/* ── 4. PROJECTS SECTION (PINNED LOCK EFFECT) ── */}
      <CinematicScrollSection 
        id="projects" 
        pinned={true} 
        autoPan={true} 
        travelHeight="450vh" 
        watermarkText="P R O J E C T S" 
        subtext="CASE STUDIES & PRODUCTS"
        glowRgb="226, 232, 240"
        accentHex="#E2E8F0"
        bgHex="#050505"
      >
        {(progress) => <StickyProjectsShowcase progress={progress} />}
      </CinematicScrollSection>

      {/* ── 5. AI / EXPERIMENTS SECTION (PINNED LOCK EFFECT) ── */}
      <CinematicScrollSection 
        id="ai-experiments" 
        pinned={true} 
        autoPan={true} 
        travelHeight="400vh" 
        watermarkText="E X P E R I M E N T S" 
        subtext="RESEARCH & PROTOTYPES"
        glowRgb="148, 163, 184"
        accentHex="#CBD5E1"
        bgHex="#060709"
      >
        {() => <AiExperimentsSection />}
      </CinematicScrollSection>

      {/* ── 6. MUSIC SECTION (PINNED LOCK EFFECT — 🔒 CAROUSEL SCENE) ── */}
      <CinematicScrollSection 
        id="music" 
        pinned={true} 
        autoPan={false} 
        travelHeight="400vh" 
        watermarkText="music" 
        glowRgb="200, 210, 220"
        accentHex="#E2E8F0"
        bgHex="#060607"
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

            {/* ── Chapter label — absolute top-left ── */}
            <div className="absolute top-6 left-8 sm:left-12 flex flex-col items-start z-20 select-none">
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.35em] text-[#CBD5E1]/60">05</span>
              <span className="font-sans text-lg sm:text-xl font-black tracking-widest text-[#E2E8F0] leading-none mt-1">MUSIC</span>
            </div>

            {/* ── Carousel — full canvas, centered ── */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <DiagonalMusicCarousel
                tracks={tracks}
                activeIndex={currentTrackIndex}
                isPlaying={isPlaying}
                onSelectTrack={handleSelectTrack}
              />
            </div>

            {/* ── Controls — absolute bottom overlay ── */}
            <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center z-20 px-4">
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

      {/* ── 7. CONTACT SECTION & WEBSITE ENDING (PINNED LOCK EFFECT) ── */}
      <CinematicScrollSection 
        id="contact" 
        pinned={true} 
        autoPan={true} 
        travelHeight="350vh" 
        watermarkText="C O N T A C T" 
        subtext="CONNECT & BUILD"
        glowRgb="180, 180, 180"
        accentHex="#CBD5E1"
        bgHex="#050505"
      >
        {() => (
          <div className="flex flex-col gap-8 max-w-[1400px] mx-auto px-4 w-full h-full justify-center">
            <div className="flex items-center gap-1.5 font-mono text-sm tracking-wider uppercase mb-2">
              <span className="text-[#CBD5E1]">main /</span>
              <span className="text-[#CBD5E1] font-bold">get in touch</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <GlareCard className="p-8 flex flex-col justify-between min-h-[360px] bg-[#14161B] text-white border border-white/20 shadow-2xl shadow-black/60">
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-black text-white">Direct Transmission</h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    Available for software engineering roles, backend architecture, and AI pipeline collaborations.
                  </p>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/20">
                    <Mail className="w-4 h-4 text-[#8E2938]" />
                    <span className="text-xs font-mono text-white select-all">
                      jayshankartavanoji2020@gmail.com
                    </span>
                    <button
                      onClick={copyEmailToClipboard}
                      className="ml-auto p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-white/15">
                  <a
                    href="https://github.com/Jaytavanoji"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-mono text-[#CBD5E1] hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/jaytavanoji"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-mono text-[#CBD5E1] hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </GlareCard>

              <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 p-8 rounded-2xl bg-[#14161B] border border-white/20 shadow-2xl shadow-black/60">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-[#CBD5E1] uppercase">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="px-4 py-2.5 rounded-xl bg-black/5 border border-white/15 text-white text-xs focus:outline-none focus:border-[#94A3B8] transition-all placeholder:text-[#CBD5E1]/50"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-[#CBD5E1] uppercase">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@domain.com"
                    className="px-4 py-2.5 rounded-xl bg-black/5 border border-white/15 text-white text-xs focus:outline-none focus:border-[#94A3B8] transition-all placeholder:text-[#CBD5E1]/50"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-[#CBD5E1] uppercase">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message..."
                    className="px-4 py-2.5 rounded-xl bg-black/5 border border-white/15 text-white text-xs focus:outline-none focus:border-[#94A3B8] transition-all placeholder:text-[#CBD5E1]/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#334155] hover:bg-[#475569] border border-white/20 text-white shadow-lg text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 mt-2"
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
                  <span className="text-xs font-mono text-emerald-400 text-center">
                    Message sent successfully!
                  </span>
                )}
                {submitStatus === "error" && (
                  <span className="text-xs font-mono text-red-400 text-center">
                    Failed to send message. Please try again.
                  </span>
                )}
              </form>
            </div>

            {/* Thorough Website Ending Copyright & Footer Line */}
            <div className="w-full pt-12 mt-12 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 font-mono text-xs text-[#CBD5E1]">
              <div>
                <span className="text-white font-bold">Jay Shankar Tavanoji</span> · Creative Engineering Portfolio
              </div>
              <div className="text-[11px] text-[#CBD5E1]">
                © {new Date().getFullYear()} All Rights Reserved · Built with Next.js 14 & Framer Motion
              </div>
            </div>
          </div>
        )}
      </CinematicScrollSection>
    </div>
  );
}
