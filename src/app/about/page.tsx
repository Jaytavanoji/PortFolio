"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Cpu,
  Database,
  Terminal,
  Code,
  Flame,
  CheckCircle,
  FileCode,
  Workflow,
  ArrowRight,
  GitBranch,
  Globe,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlareCard } from "@/components/ui/glare-card";
import { ImageText } from "@/components/ui/image-text";
import { FeatCard } from "@/components/ui/feat-card";
import CinematicBackground from "@/components/ui/CinematicBackground";

/* ──────────────────────────────────────────────────────────
   Card 1: Academic Timeline (Infinite Stacked Activity Feed)
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
    title: "AI Agents & RAG Integration",
    detail: "Building context-aware document search pipelines",
    status: "completed",
    time: "Current",
    icon: Cpu,
  },
  {
    title: "Data Structures & OOP Principles",
    detail: "Mastering Java OOP paradigms and high-performance algorithms",
    status: "completed",
    time: "Continuous",
    icon: Code,
  },
  {
    title: "Production System Deployment",
    detail: "Deploying secure, production-grade applications",
    status: "planned",
    time: "Future",
    icon: Flame,
  },
];

function CardTimeline() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TIMELINE_EVENTS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const getSlot = (i: number) => {
    const N = TIMELINE_EVENTS.length;
    let rel = i - activeIdx;
    if (rel > Math.floor(N / 2)) rel -= N;
    if (rel < -Math.floor(N / 2)) rel += N;
    return rel;
  };

  const Y: Record<string, number> = { "-2": -65, "-1": -34, "0": 0, "1": 34, "2": 65 };

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden py-4 px-2">
      {TIMELINE_EVENTS.map((item, i) => {
        const slot = getSlot(i);
        const abs = Math.abs(slot);
        const isActive = slot === 0;
        const isVisible = abs <= 2;

        const yOffset = Y[String(slot)] ?? (slot < 0 ? -120 : 120);
        const scale = isActive ? 1 : abs === 1 ? 0.92 : 0.84;
        const opacity = isActive ? 1 : abs === 1 ? 0.6 : 0.3;
        const zIndex = isActive ? 30 : abs === 1 ? 20 : 10;

        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            className="absolute left-0 right-0 mx-auto px-2"
            style={{ zIndex }}
            animate={{
              y: isVisible ? yOffset : slot < 0 ? -140 : 140,
              scale,
              opacity: isVisible ? opacity : 0,
            }}
            transition={{
              y: { type: "spring", stiffness: 450, damping: 32 },
              scale: { type: "spring", stiffness: 450, damping: 32 },
              opacity: { duration: 0.2 },
            }}
          >
            <div
              className={cn(
                "w-full rounded-xl border flex items-center gap-2.5 transition-all duration-300",
                isActive
                  ? "px-3.5 py-3 bg-[#0d0d12]/90 border-white/20 shadow-lg shadow-black/40"
                  : "px-3 py-2 bg-[#09090b]/55 border-white/5"
              )}
            >
              <div
                className={cn(
                  "shrink-0 rounded-lg flex items-center justify-center text-white border transition-all duration-300",
                  isActive
                    ? "w-8 h-8 bg-[#FF4D1F]/20 border-[#FF4D1F]"
                    : "w-6 h-6 bg-white/5 border-white/10 text-white/60"
                )}
              >
                <Icon className={isActive ? "w-4 h-4" : "w-3 h-3"} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "font-mono font-bold leading-none truncate",
                      isActive ? "text-xs text-white" : "text-[10px] text-white/50"
                    )}
                  >
                    {item.title}
                  </span>
                  <span
                    className={cn(
                      "font-mono uppercase tracking-wider text-[7px] px-1.5 py-0.5 rounded-full border",
                      item.status === "active"
                        ? "bg-[#FF4D1F]/15 border-[#FF4D1F]/40 text-[#FF4D1F]"
                        : item.status === "completed"
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-white/5 border-white/10 text-white/40"
                    )}
                  >
                    {item.status}
                  </span>
                </div>
                {isActive && (
                  <p className="text-[10px] text-[#A1A1AA] truncate mt-1 leading-snug">
                    {item.detail}
                  </p>
                )}
              </div>
              {isActive && (
                <span className="text-[10px] font-mono text-[#8A8A8A] shrink-0 font-medium">
                  {item.time}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Progress dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {TIMELINE_EVENTS.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full bg-[#FF4D1F]"
            animate={{
              width: i === activeIdx ? 12 : 4,
              opacity: i === activeIdx ? 0.9 : 0.25,
            }}
            style={{ height: 3 }}
            transition={{ duration: 0.35 }}
          />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Card 2: Pipeline Development (Live SVG Nodes Routing)
   ────────────────────────────────────────────────────────── */
type DevStep = "compile" | "analyze" | "test" | "deploy";

const NODES_CFG = [
  { id: "SRC", x: 45, y: 80, icon: FileCode, label: "SOURCE" },
  { id: "PROC", x: 120, y: 80, icon: Workflow, label: "PROCESS" },
  { id: "TEST", x: 195, y: 80, icon: CheckCircle, label: "TEST" },
  { id: "REMOTE", x: 270, y: 80, icon: GitBranch, label: "REMOTE" },
];

function CardPipeline() {
  const [step, setStep] = useState<DevStep>("compile");

  useEffect(() => {
    const steps: DevStep[] = ["compile", "analyze", "test", "deploy"];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % steps.length;
      setStep(steps[idx]);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const getPathClass = (activeFor: DevStep) => {
    return step === activeFor
      ? "text-[#FF4D1F] drop-shadow-[0_0_8px_#FF4D1F]"
      : "text-white/5";
  };

  return (
    <div className="w-full h-full relative overflow-hidden select-none bg-neutral-950/40 rounded-xl flex items-center justify-center p-2">
      {/* clean dotted background grid */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <pattern id="bento-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.75" fill="#ffffff" fillOpacity="0.05" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bento-dots)" />
      </svg>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 320 160"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* Base Connections */}
        <path d="M 45 80 L 120 80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <path d="M 120 80 L 195 80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <path d="M 195 80 L 270 80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Animated paths */}
        <motion.path
          d="M 45 80 L 120 80"
          fill="none"
          stroke="currentColor"
          className={getPathClass("compile")}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: step === "compile" ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d="M 120 80 L 195 80"
          fill="none"
          stroke="currentColor"
          className={getPathClass("analyze")}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: step === "analyze" ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d="M 195 80 L 270 80"
          fill="none"
          stroke="currentColor"
          className={getPathClass("test")}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: step === "test" ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />

        {NODES_CFG.map((node) => {
          const NodeIcon = node.icon;
          const isActive =
            (node.id === "SRC" && step === "compile") ||
            (node.id === "PROC" && step === "analyze") ||
            (node.id === "TEST" && step === "test") ||
            (node.id === "REMOTE" && step === "deploy");

          return (
            <foreignObject
              key={node.id}
              x={node.x - 24}
              y={node.y - 28}
              width={48}
              height={56}
              className="overflow-visible"
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-500",
                    isActive
                      ? "bg-[#FF4D1F] border-[#FF4D1F] text-white shadow-[0_0_15px_rgba(255,77,31,0.4)]"
                      : "bg-black/60 border-white/10 text-[#8A8A8A]"
                  )}
                >
                  <NodeIcon className="w-4.5 h-4.5" />
                </div>
                <span className="text-[7.5px] font-mono tracking-wider font-bold text-white/50">
                  {node.label}
                </span>
              </div>
            </foreignObject>
          );
        })}
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Card 3: Technology Namespace (Hit counters & Fill bars)
   ────────────────────────────────────────────────────────── */
const NAMESPACES = [
  { name: "FastAPI", fill: 90, hits: "9.0/10" },
  { name: "Spring Boot", fill: 75, hits: "7.5/10" },
  { name: "PostgreSQL", fill: 80, hits: "8.0/10" },
  { name: "FAISS Vector", fill: 70, hits: "7.0/10" },
];

function CardNamespace() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % NAMESPACES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 py-2.5 px-3 bg-neutral-950/20">
      <div className="flex flex-col gap-2.5">
        {NAMESPACES.map((ns, i) => {
          const isActive = i === activeIdx;

          return (
            <div key={ns.name} className="flex items-center gap-3">
              {/* Active dot */}
              <div className="w-4 flex items-center justify-center shrink-0">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    isActive ? "bg-[#FF4D1F] scale-125" : "bg-white/10 scale-100"
                  )}
                />
              </div>

              {/* Title */}
              <span
                className={cn(
                  "text-[10px] font-mono w-20 shrink-0 transition-colors",
                  isActive ? "text-white font-bold" : "text-[#8A8A8A]"
                )}
              >
                {ns.name}
              </span>

              {/* Progress bar with scan effect */}
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden relative shadow-inner">
                <motion.div
                  className={cn(
                    "absolute left-0 top-0 bottom-0 rounded-full",
                    isActive ? "bg-[#FF4D1F]" : "bg-white/20"
                  )}
                  initial={{ width: "0%" }}
                  animate={{ width: `${ns.fill}%` }}
                  transition={{ duration: 0.8 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Score / stats */}
              <span className="text-[9px] font-mono text-[#8A8A8A] w-12 text-right shrink-0">
                {ns.hits}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Card 4: Focus Area Sparklines (Metric usage monitors)
   ────────────────────────────────────────────────────────── */
function CardFocusMonitor() {
  const points1 = [10, 24, 18, 38, 30, 48];
  const points2 = [35, 15, 45, 20, 52, 40];

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev === 0 ? 1 : 0));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 py-2 px-3">
      <div className="flex gap-3 flex-1 items-center justify-between">
        {[
          { label: "BACKEND DEV", value: "92%", points: points1 },
          { label: "AI INTEGRATION", value: "85%", points: points2 },
        ].map((m, i) => {
          const isActive = i === activeIdx;

          return (
            <motion.div
              key={m.label}
              animate={{
                y: isActive ? -4 : 0,
                borderColor: isActive ? "rgba(255,77,31,0.35)" : "rgba(255,255,255,0.05)",
              }}
              className="flex-1 p-3 rounded-xl bg-black/60 border border-white/5 flex items-center justify-between gap-3 backdrop-blur-md"
            >
              <div className="flex flex-col">
                <span className="text-[8px] font-mono text-[#8A8A8A] uppercase tracking-wider">
                  {m.label}
                </span>
                <span className="text-base font-bold font-mono text-white mt-1">
                  {m.value}
                </span>
              </div>

              {/* Sparkline */}
              <svg className="w-16 h-8 overflow-visible" viewBox="0 0 64 32">
                <path
                  d={m.points
                    .map((val, idx) => `${idx === 0 ? "M" : "L"} ${idx * 12.8} ${32 - val}`)
                    .join(" ")}
                  fill="none"
                  stroke={isActive ? "#FF4D1F" : "#8A8A8A"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {m.points.map((val, idx) => (
                  <circle
                    key={idx}
                    cx={idx * 12.8}
                    cy={32 - val}
                    r="1.5"
                    fill="black"
                    stroke={isActive ? "#FF4D1F" : "#8A8A8A"}
                    strokeWidth="1"
                  />
                ))}
              </svg>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function CardSystemArch() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 gap-2">
      <div className="flex items-center justify-between text-[9px] font-mono text-[#8A8A8A]">
        <span>SYSTEM ARCHITECTURE BLUEPRINT</span>
        <span className="text-[#FF4D1F] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D1F] animate-pulse" />
          LIVE ROUTING
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2 items-center justify-center py-1">
        {[
          { name: "CLIENT", icon: Globe, status: "200 OK" },
          { name: "FASTAPI", icon: Cpu, status: "ASYNC" },
          { name: "REDIS", icon: Zap, status: "CACHE" },
          { name: "POSTGRES", icon: Database, status: "SHARDED" },
        ].map((step) => (
          <div key={step.name} className="flex flex-col items-center p-2 rounded-xl bg-black/60 border border-white/5 text-center">
            <step.icon className="w-4 h-4 text-[#FF4D1F] mb-1" />
            <span className="text-[9px] font-bold text-white tracking-wider">{step.name}</span>
            <span className="text-[7px] font-mono text-[#8A8A8A] mt-0.5">{step.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardEngineeringSLA() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 gap-2">
      <div className="grid grid-cols-2 gap-2 flex-1 items-center">
        <div className="flex flex-col p-2.5 rounded-xl bg-black/50 border border-white/5">
          <span className="text-[8px] font-mono text-[#8A8A8A]">P99 LATENCY</span>
          <span className="text-lg font-mono font-bold text-white mt-0.5">&lt; 85ms</span>
          <span className="text-[7px] font-mono text-[#FF4D1F]">STRESS TESTED</span>
        </div>
        <div className="flex flex-col p-2.5 rounded-xl bg-black/50 border border-white/5">
          <span className="text-[8px] font-mono text-[#8A8A8A]">UPTIME TARGET</span>
          <span className="text-lg font-mono font-bold text-white mt-0.5">99.99%</span>
          <span className="text-[7px] font-mono text-emerald-400">FAILSAFE ROUTING</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN ABOUT PAGE BENTO GRID BUILDER
   ────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen text-[#F5F5F5] pb-32 pt-12 sm:pt-20 px-4 sm:px-8 md:px-14 flex flex-col items-center overflow-hidden">
      <CinematicBackground />

      <div className="relative z-10 w-full max-w-[1380px] flex flex-col gap-12 sm:gap-16">
        {/* ── TOP EDITORIAL HEADER ── */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-3">
            <ImageText
              text="ABOUT"
              imageUrl="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop"
              direction="diagonal"
              className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tight uppercase drop-shadow-[0_10px_20px_rgba(255,255,255,0.12)]"
            />
            <span className="text-[#A1A1AA] font-light text-lg sm:text-2xl md:text-3xl tracking-tight uppercase pb-0.5 sm:pb-1">
              ME
            </span>
          </div>
        </header>

        {/* ── BENTO GRID LAYOUT ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full">
          {/* Bento Card 1: Biography / Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.018, y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-2 min-h-[280px] w-full h-full"
          >
            <GlareCard className="p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF4D1F]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col gap-3.5 max-w-3xl">
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[0.95] text-white">
                  I BUILD BACKENDS
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#FF4D1F]">
                    THAT ARE SCALE SAFE.
                  </span>
                </h2>
                <p className="text-[#A1A1AA] text-xs sm:text-sm font-light leading-relaxed mt-2">
                  I’m <strong className="text-white font-medium">Jay Shankar Tavanoji</strong>, a Computer Science Engineering student focused on robust backend systems, reliable APIs, and AI workflows. I enjoy solving algorithmic challenges and turning complex ideas into production-ready software that feels responsive and intuitive.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-6">
                <Link
                  href="/projects"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF4D1F] hover:bg-[#E63E12] text-white text-[11px] font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105"
                >
                  <span>Projects</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[11px] font-bold uppercase tracking-wider transition-all backdrop-blur-md"
                >
                  <span>Get In Touch</span>
                </Link>
              </div>
            </GlareCard>
          </motion.div>

          {/* Bento Card 2: Academic Journey (Timeline Feed) */}
          <FeatCard
            title="Academic Roadmap"
            description="Milestones, focus area expansions, and timeline trajectory."
            className="lg:col-span-1 min-h-[280px]"
          >
            <CardTimeline />
          </FeatCard>

          {/* Bento Card 3: Code Workflow Pipeline */}
          <FeatCard
            title="Development Pipeline"
            description="Continuous verification, processing, and remote validation stages."
            className="lg:col-span-1 min-h-[280px]"
          >
            <CardPipeline />
          </FeatCard>

          {/* Bento Card 4: Focus Area Sparklines */}
          <FeatCard
            title="Workload Indicators"
            description="Real-time division of development efforts and execution focus."
            className="lg:col-span-1 min-h-[280px]"
          >
            <CardFocusMonitor />
          </FeatCard>

          {/* Bento Card 5: Technology Namespace */}
          <FeatCard
            title="Core Namespaces"
            description="Key competencies, framework usage rates, and database expertise."
            className="lg:col-span-1 min-h-[280px]"
          >
            <CardNamespace />
          </FeatCard>

          {/* Bento Card 6: System Architecture Node Diagram */}
          <FeatCard
            title="System Architecture"
            description="Distributed service nodes, async gateway, caching and database layer."
            className="lg:col-span-2 min-h-[220px]"
          >
            <CardSystemArch />
          </FeatCard>

          {/* Bento Card 7: Engineering SLA & Benchmarks */}
          <FeatCard
            title="Engineering Standards"
            description="Operational SLA targets, P99 latency thresholds, and uptime metrics."
            className="lg:col-span-1 min-h-[220px]"
          >
            <CardEngineeringSLA />
          </FeatCard>
        </div>
      </div>
    </div>
  );
}
