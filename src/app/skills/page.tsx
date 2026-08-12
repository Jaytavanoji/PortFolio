"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Database,
  Cpu,
  Layers,
  Wrench,
  Globe,
  Settings,
  Circle,
  FileCode,
  CheckCircle2,
  Workflow,
  Search,
  Radio,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlareCard } from "@/components/ui/glare-card";
import { ImageText } from "@/components/ui/image-text";
import { FeatCard } from "@/components/ui/feat-card";
import CinematicBackground from "@/components/ui/CinematicBackground";

/* ──────────────────────────────────────────────────────────
   Card 1: RAG Search Ingestion (SVG Node Ingestion Pipeline)
   ────────────────────────────────────────────────────────── */
type PipelineStep = "chunk" | "embed" | "index" | "query";

const PIPELINE_NODES = [
  { id: "DOCS", x: 45, y: 80, icon: FileCode, label: "DOCS" },
  { id: "EMBED", x: 120, y: 80, icon: Workflow, label: "EMBED" },
  { id: "VEC", x: 195, y: 80, icon: Database, label: "VECTOR" },
  { id: "LLM", x: 270, y: 80, icon: Cpu, label: "INFERENCE" },
];

function CardRagPipeline() {
  const [activeStep, setActiveStep] = useState<PipelineStep>("chunk");

  useEffect(() => {
    const steps: PipelineStep[] = ["chunk", "embed", "index", "query"];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % steps.length;
      setActiveStep(steps[idx]);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const getPathStyle = (stepName: PipelineStep) => {
    return activeStep === stepName
      ? "text-[#6E1A2B] drop-shadow-[0_0_8px_rgba(110,26,43,0.8)]"
      : "text-white/5";
  };

  return (
    <div className="w-full h-full relative overflow-hidden select-none bg-neutral-950/40 rounded-xl flex items-center justify-center p-2">
      {/* grid background */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <pattern id="skills-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.75" fill="#ffffff" fillOpacity="0.05" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#skills-dots)" />
      </svg>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 320 160"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* Base Connections */}
        <path d="M 45 80 L 120 80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <path d="M 120 80 L 195 80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <path d="M 195 80 L 270 80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        {/* Animated flow overlays */}
        <motion.path
          d="M 45 80 L 120 80"
          fill="none"
          stroke="currentColor"
          className={getPathStyle("chunk")}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: activeStep === "chunk" ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d="M 120 80 L 195 80"
          fill="none"
          stroke="currentColor"
          className={getPathStyle("embed")}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: activeStep === "embed" ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d="M 195 80 L 270 80"
          fill="none"
          stroke="currentColor"
          className={getPathStyle("index")}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: activeStep === "index" ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />

        {PIPELINE_NODES.map((node) => {
          const NodeIcon = node.icon;
          const isActive =
            (node.id === "DOCS" && activeStep === "chunk") ||
            (node.id === "EMBED" && activeStep === "embed") ||
            (node.id === "VEC" && activeStep === "index") ||
            (node.id === "LLM" && activeStep === "query");

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
   Card 2: Backend Competency Metrics (Calls & Latency Monitors)
   ────────────────────────────────────────────────────────── */
interface SkillMetric {
  name: string;
  rating: string;
  latency: string;
  icon: any;
  barColor: string;
  borderColor: string;
}

const BACKEND_METRICS: SkillMetric[] = [
  { name: "FastAPI", rating: "9.5", latency: "12ms", icon: Terminal, barColor: "from-sky-400 to-sky-600", borderColor: "border-sky-600" },
  { name: "PostgreSQL", rating: "9.0", latency: "45ms", icon: Database, barColor: "from-emerald-400 to-emerald-600", borderColor: "border-emerald-600" },
  { name: "Java OOP", rating: "8.5", latency: "8ms", icon: Layers, barColor: "from-amber-400 to-amber-600", borderColor: "border-amber-600" },
  { name: "RAG Systems", rating: "8.8", latency: "120ms", icon: Cpu, barColor: "from-violet-400 to-violet-600", borderColor: "border-violet-600" },
];

function CardSkillsMetrics() {
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div className="grid grid-cols-2 gap-2.5 w-full">
        {BACKEND_METRICS.map((item, i) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.name}
              className="relative rounded-xl border border-white/5 bg-black/50 p-2.5 group hover:border-[#FF4D1F]/40 transition-all duration-300"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center text-white border transition-transform duration-300 bg-gradient-to-b from-white/10 to-white/5 border-white/10 group-hover:scale-105"
                  )}
                >
                  <Icon className="w-4 h-4 text-[#FF4D1F]" />
                </div>

                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-[11px] font-mono font-bold text-white leading-none">
                    {item.rating}
                  </span>
                  <span className="text-[7px] font-mono text-[#8A8A8A] uppercase tracking-wider leading-none">
                    Rating
                  </span>
                </div>
              </div>

              <div className="mt-2.5 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-semibold text-white truncate max-w-[55px]">
                    {item.name}
                  </span>
                  <span className="text-[7.5px] font-mono text-[#8A8A8A] tabular-nums">
                    {item.latency}
                  </span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative shadow-inner">
                  <motion.div
                    className={cn("absolute left-0 top-0 bottom-0 rounded-full bg-[#FF4D1F]")}
                    initial={{ width: "0%" }}
                    animate={{ width: `${parseFloat(item.rating) * 10}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Card 3: Storage namespaces (List with status meters)
   ────────────────────────────────────────────────────────── */
const STORAGE_NAMESPACES = [
  { name: "PostgreSQL", score: "8.5", fill: 85 },
  { name: "MongoDB", score: "6.5", fill: 65 },
  { name: "MySQL", score: "7.2", fill: 72 },
  { name: "FAISS Index", score: "8.0", fill: 80 },
];

function CardStorageNamespaces() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % STORAGE_NAMESPACES.length);
    }, 2100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 py-2.5 px-3 bg-neutral-950/20">
      <div className="flex flex-col gap-2.5">
        {STORAGE_NAMESPACES.map((ns, i) => {
          const isActive = i === activeIdx;

          return (
            <div key={ns.name} className="flex items-center gap-3">
              <div className="w-4 flex items-center justify-center shrink-0">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    isActive ? "bg-[#FF4D1F] scale-125" : "bg-white/10 scale-100"
                  )}
                />
              </div>

              <span
                className={cn(
                  "text-[10px] font-mono w-20 shrink-0 transition-colors",
                  isActive ? "text-white font-bold" : "text-[#8A8A8A]"
                )}
              >
                {ns.name}
              </span>

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

              <span className="text-[9px] font-mono text-[#8A8A8A] w-12 text-right shrink-0">
                {ns.score}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Card 4: Live Compiler Activity Logs (Terminal Feed)
   ────────────────────────────────────────────────────────── */
interface LogEntry {
  service: string;
  log: string;
  status: "active" | "success" | "idle";
  latency: string;
}

const TERMINAL_LOGS: LogEntry[] = [
  { service: "FastAPI", log: "ASGI hot reload compiled modules", status: "success", latency: "14ms" },
  { service: "FAISS Vector", log: "Created database index cluster", status: "success", latency: "240ms" },
  { service: "Postgres", log: "Established transaction pool connection", status: "success", latency: "8ms" },
  { service: "Groq LLM", log: "API inference completed token payload", status: "active", latency: "420ms" },
  { service: "Spring Boot", log: "Gradle daemon initialized context", status: "idle", latency: "—" },
];

function CardTerminalLogs() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TERMINAL_LOGS.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const getSlot = (i: number) => {
    const N = TERMINAL_LOGS.length;
    let rel = i - activeIdx;
    if (rel > Math.floor(N / 2)) rel -= N;
    if (rel < -Math.floor(N / 2)) rel += N;
    return rel;
  };

  const Y: Record<string, number> = { "-2": -65, "-1": -34, "0": 0, "1": 34, "2": 65 };

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden py-4 px-2">
      {TERMINAL_LOGS.map((item, i) => {
        const slot = getSlot(i);
        const abs = Math.abs(slot);
        const isActive = slot === 0;
        const isVisible = abs <= 2;

        const yOffset = Y[String(slot)] ?? (slot < 0 ? -120 : 120);
        const scale = isActive ? 1 : abs === 1 ? 0.92 : 0.84;
        const opacity = isActive ? 1 : abs === 1 ? 0.6 : 0.3;
        const zIndex = isActive ? 30 : abs === 1 ? 20 : 10;

        return (
          <motion.div
            key={item.service}
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
                <Terminal className={isActive ? "w-4 h-4" : "w-3 h-3"} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "font-mono font-bold leading-none truncate",
                      isActive ? "text-xs text-white" : "text-[10px] text-white/50"
                    )}
                  >
                    {item.service}
                  </span>
                  <span
                    className={cn(
                      "font-mono uppercase tracking-wider text-[7px] px-1.5 py-0.5 rounded-full border",
                      item.status === "active"
                        ? "bg-[#FF4D1F]/15 border-[#FF4D1F]/40 text-[#FF4D1F]"
                        : item.status === "success"
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-white/5 border-white/10 text-white/40"
                    )}
                  >
                    {item.status}
                  </span>
                </div>
                {isActive && (
                  <p className="text-[10px] text-[#A1A1AA] truncate mt-1 leading-snug">
                    {item.log}
                  </p>
                )}
              </div>
              {isActive && (
                <span className="text-[10px] font-mono text-[#8A8A8A] shrink-0 font-medium">
                  {item.latency}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {TERMINAL_LOGS.map((_, i) => (
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
   MAIN SKILLS PAGE BENTO GRID BUILDER
   ────────────────────────────────────────────────────────── */
export default function SkillsPage() {
  return (
    <div className="relative w-full min-h-screen text-[#F5F5F5] pb-32 pt-12 sm:pt-20 px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col items-center overflow-hidden">
      <CinematicBackground variant="skills" />

      <div className="relative z-10 w-full max-w-[1800px] flex flex-col gap-12 sm:gap-16">
        {/* ── TOP EDITORIAL HEADER ── */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-3">
            <ImageText
              text="SKILLS"
              imageUrl="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop"
              direction="diagonal"
              className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tight uppercase drop-shadow-[0_10px_20px_rgba(255,255,255,0.12)]"
            />
            <span className="text-[#A1A1AA] font-light text-lg sm:text-2xl md:text-3xl tracking-tight uppercase pb-0.5 sm:pb-1">
              WHAT I BUILD WITH
            </span>
          </div>
        </header>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full">
          {/* Bento Card 1: Main Introduction Card */}
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
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-[0.95] text-white">
                  CURATED CAPABILITIES
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#FF4D1F]">
                    ENGINEERED WITH RIGOR.
                  </span>
                </h2>
                <p className="text-[#A1A1AA] text-xs sm:text-sm font-light leading-relaxed mt-2">
                  I study the engineering rules of backend components, async web APIs, database index constraints, and document extraction. My core values involve creating practical, high-throughput pipelines that work predictably under stress.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <Link
                  href="/projects"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF4D1F] hover:bg-[#E63E12] text-white text-[11px] font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105"
                >
                  <span>Browse Selected Work</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </GlareCard>
          </motion.div>

          {/* Bento Card 2: Core Competencies Metrics */}
          <FeatCard
            title="Core Competencies"
            description="High-throughput systems, latency, and rating metrics."
            className="lg:col-span-1 min-h-[280px]"
          >
            <CardSkillsMetrics />
          </FeatCard>

          {/* Bento Card 3: RAG Ingestion Pipeline */}
          <FeatCard
            title="Document RAG Pipeline"
            description="Asynchronous document chunking, indexing, and neural query flow."
            className="lg:col-span-1 min-h-[280px]"
          >
            <CardRagPipeline />
          </FeatCard>

          {/* Bento Card 4: Terminal Activity Monitor */}
          <FeatCard
            title="Compilation Logs"
            description="Simulated local server hot reloads, compilation tasks, and latency targets."
            className="lg:col-span-1 min-h-[280px]"
          >
            <CardTerminalLogs />
          </FeatCard>

          {/* Bento Card 5: Storage Namespaces */}
          <FeatCard
            title="Relational & NoSQL"
            description="Competency distributions across PostgreSQL, MongoDB, MySQL, and vector storage."
            className="lg:col-span-1 min-h-[280px]"
          >
            <CardStorageNamespaces />
          </FeatCard>

          {/* Bento Card 6: API Benchmark Metrics */}
          <FeatCard
            title="API Benchmarks"
            description="Throughput, latency percentile targets, and live endpoint performance telemetry."
            className="lg:col-span-2 min-h-[220px]"
          >
            <div className="w-full h-full flex flex-col justify-between p-3.5 gap-3">
              <div className="grid grid-cols-4 gap-2 flex-1">
                {[
                  { label: "P50", value: "12ms", sub: "MEDIAN", color: "text-emerald-400" },
                  { label: "P95", value: "48ms", sub: "PERCENTILE", color: "text-yellow-400" },
                  { label: "P99", value: "85ms", sub: "WORST 1%", color: "text-orange-400" },
                  { label: "RPS", value: "4.2k", sub: "REQ/SEC", color: "text-[#FF4D1F]" },
                ].map((m) => (
                  <div key={m.label} className="flex flex-col items-center p-2.5 rounded-xl bg-black/50 border border-white/5">
                    <span className="text-[8px] font-mono text-[#8A8A8A]">{m.label}</span>
                    <span className={`text-xl font-mono font-bold ${m.color} mt-0.5`}>{m.value}</span>
                    <span className="text-[7px] font-mono text-[#8A8A8A] mt-0.5">{m.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </FeatCard>

          {/* Bento Card 7: DevOps & CI/CD */}
          <FeatCard
            title="DevOps & CI/CD"
            description="Automated testing, containerization, and deployment pipeline stages."
            className="lg:col-span-1 min-h-[220px]"
          >
            <div className="w-full h-full flex flex-col justify-between p-3.5 gap-2">
              {[
                { stage: "GIT PUSH", status: "TRIGGERED", color: "bg-blue-400" },
                { stage: "LINT + TESTS", status: "PASSED", color: "bg-emerald-400" },
                { stage: "DOCKER BUILD", status: "COMPLETE", color: "bg-emerald-400" },
                { stage: "DEPLOY", status: "LIVE", color: "bg-[#FF4D1F]" },
              ].map((step) => (
                <div key={step.stage} className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/5">
                  <span className="text-[8px] font-mono text-[#8A8A8A] tracking-wider">{step.stage}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${step.color} animate-pulse`} />
                    <span className="text-[8px] font-mono text-white">{step.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </FeatCard>
        </div>
      </div>
    </div>
  );
}
