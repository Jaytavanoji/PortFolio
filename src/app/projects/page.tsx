"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Layers,
  Database,
  Cpu,
  CheckCircle2,
  Workflow,
  Search,
  Radio,
  Clock,
  ArrowRight,
  ShieldAlert,
  Sliders,
  ExternalLink,
  Github,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlareCard } from "@/components/ui/glare-card";
import { ImageText } from "@/components/ui/image-text";
import { FeatCard } from "@/components/ui/feat-card";
import CinematicBackground from "@/components/ui/CinematicBackground";


/* ──────────────────────────────────────────────────────────
   Project 1: LifeDashboard 2.0 (Microservices Metrics)
   ────────────────────────────────────────────────────────── */
function LifeDashboardWidget() {
  const [finances, setFinances] = useState(1420);
  const [tasksCompleted, setTasksCompleted] = useState(8);
  const [screenTime, setScreenTime] = useState(2.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setFinances((prev) => prev + Math.floor(Math.random() * 5) - 2);
      setScreenTime((prev) => Math.max(1, +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 select-none">
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-black/50 border border-white/5 rounded-xl p-2 flex flex-col justify-between">
          <span className="text-[7.5px] font-mono text-[#8A8A8A] uppercase tracking-wider">
            Habit Yield
          </span>
          <span className="text-sm font-bold font-mono text-white mt-1">94%</span>
        </div>
        <div className="bg-black/50 border border-white/5 rounded-xl p-2 flex flex-col justify-between">
          <span className="text-[7.5px] font-mono text-[#8A8A8A] uppercase tracking-wider">
            API Latency
          </span>
          <span className="text-sm font-bold font-mono text-emerald-400 mt-1">14ms</span>
        </div>
        <div className="bg-black/50 border border-white/5 rounded-xl p-2 flex flex-col justify-between">
          <span className="text-[7.5px] font-mono text-[#8A8A8A] uppercase tracking-wider">
            Active Nodes
          </span>
          <span className="text-sm font-bold font-mono text-[#6E1A2B] mt-1">5 / 5</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-1.5 mt-3">
        <div className="flex items-center justify-between text-[9px] font-mono text-white/70">
          <span>Groq Agent Pipeline</span>
          <span className="text-emerald-400">Idle (Awaiting Task)</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative shadow-inner">
          <div className="absolute left-0 top-0 bottom-0 rounded-full bg-[#6E1A2B] w-[88%]" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Project 2: RegiNova AI (Interactive RAG Search)
   ────────────────────────────────────────────────────────── */
const MOCK_QUERIES = [
  { term: "vector embeddings auth module", hits: 34, t: "0.2s" },
  { term: "API rate limiting configuration", hits: 18, t: "1.1s" },
  { term: "Redis cache invalidation patterns", hits: 56, t: "2.4s" },
  { term: "Q3 roadmap — agent features", hits: 9, t: "0.8s" },
];

function RegiNovaWidget() {
  const [activeQueryIdx, setActiveQueryIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQueryIdx((prev) => (prev + 1) % MOCK_QUERIES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const active = MOCK_QUERIES[activeQueryIdx];

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 select-none">
      <div className="flex items-center gap-2 bg-black/60 border border-white/5 rounded-xl px-2.5 py-1.5">
        <Search className="w-3.5 h-3.5 text-[#6E1A2B]" />
        <span className="text-[10px] font-mono text-white/80 truncate flex-1">{active.term}</span>
      </div>

      <div className="flex gap-2.5 mt-3 flex-1 items-end">
        {[0, 1, 2, 3].map((offset) => {
          const item =
            MOCK_QUERIES[
              (activeQueryIdx - offset + MOCK_QUERIES.length) % MOCK_QUERIES.length
            ];
          return (
            <motion.div
              key={item.term}
              className="flex-1 rounded-lg border border-white/5 bg-black/30 p-1.5 flex flex-col justify-between min-h-[55px]"
              animate={{
                opacity: offset === 0 ? 1 : 0.4,
                scale: offset === 0 ? 1 : 0.95,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-[7.5px] font-mono text-[#8A8A8A] uppercase">HITS</span>
              <span className="text-xs font-bold font-mono text-white mt-0.5">{item.hits}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Project 3: ANPR Smart Doc (Computer Vision Pipeline Node)
   ────────────────────────────────────────────────────────── */
const CV_PIPELINE = [
  { label: "Capture", status: "completed" },
  { label: "Locate", status: "completed" },
  { label: "Segment", status: "active" },
  { label: "Inference", status: "planned" },
];

function CardCvPipeline() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % CV_PIPELINE.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden select-none bg-neutral-950/40 rounded-xl flex items-center justify-center p-2">
      <svg className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <pattern id="proj-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.75" fill="#ffffff" fillOpacity="0.05" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#proj-dots)" />
      </svg>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 320 160"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <path d="M 45 80 L 120 80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <path d="M 120 80 L 195 80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <path d="M 195 80 L 270 80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        {/* Highlighted Flow path */}
        <motion.path
          d="M 45 80 L 120 80"
          fill="none"
          stroke="#6E1A2B"
          strokeWidth="1.5"
          animate={{ pathLength: activeStep >= 1 ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d="M 120 80 L 195 80"
          fill="none"
          stroke="#6E1A2B"
          strokeWidth="1.5"
          animate={{ pathLength: activeStep >= 2 ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d="M 195 80 L 270 80"
          fill="none"
          stroke="#6E1A2B"
          strokeWidth="1.5"
          animate={{ pathLength: activeStep >= 3 ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />

        {CV_PIPELINE.map((step, idx) => {
          const isActive = idx === activeStep;
          return (
            <foreignObject
              key={step.label}
              x={idx * 75 + 45 - 24}
              y={52}
              width={48}
              height={56}
              className="overflow-visible"
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-500",
                    isActive
                      ? "bg-[#6E1A2B] border-[#6E1A2B] text-white shadow-[0_0_15px_rgba(110,26,43,0.4)]"
                      : "bg-black/60 border-white/10 text-[#8A8A8A]"
                  )}
                >
                  <span className="text-[9px] font-mono font-bold text-white">{idx + 1}</span>
                </div>
                <span className="text-[7px] font-mono tracking-wider font-bold text-white/50 uppercase">
                  {step.label}
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
   Project 4: ML Failure Predictor (Sparkline graph style)
   ────────────────────────────────────────────────────────── */
function CardMlPredictor() {
  const accuracyPoints = [15, 28, 48, 62, 78, 88, 92];
  const lossPoints = [85, 72, 54, 38, 24, 14, 8];

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 select-none">
      <div className="flex gap-2">
        <div className="flex-1 bg-black/50 border border-white/5 rounded-xl p-2.5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[7.5px] font-mono text-[#8A8A8A] uppercase">Accuracy</span>
            <span className="text-xs font-bold font-mono text-emerald-400 mt-0.5">92.4%</span>
          </div>

          <svg className="w-12 h-6 overflow-visible" viewBox="0 0 64 32">
            <path
              d={accuracyPoints
                .map((val, idx) => `${idx === 0 ? "M" : "L"} ${idx * 10.6} ${32 - val / 3}`)
                .join(" ")}
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="flex-1 bg-black/50 border border-white/5 rounded-xl p-2.5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[7.5px] font-mono text-[#8A8A8A] uppercase">Loss</span>
            <span className="text-xs font-bold font-mono text-rose-400 mt-0.5">0.082</span>
          </div>

          <svg className="w-12 h-6 overflow-visible" viewBox="0 0 64 32">
            <path
              d={lossPoints
                .map((val, idx) => `${idx === 0 ? "M" : "L"} ${idx * 10.6} ${32 - val / 3}`)
                .join(" ")}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-between text-[8px] font-mono text-white/50 mt-4 border-t border-white/5 pt-2">
        <span>Epoch: 150 / 150</span>
        <span>Validation Split: 0.2</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Project 5: Interactive 3D Portfolio
   ────────────────────────────────────────────────────────── */
function CardCurrentPortfolioWidget() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 gap-2 select-none">
      <div className="grid grid-cols-2 gap-2 flex-1">
        <div className="flex flex-col justify-between p-2.5 rounded-xl bg-black/50 border border-white/5">
          <span className="text-[7.5px] font-mono text-[#8A8A8A] uppercase tracking-wider">HERO PIPELINE</span>
          <span className="text-xs font-bold font-mono text-emerald-400 mt-0.5">60 FPS LERP</span>
          <span className="text-[7px] font-mono text-[#8A8A8A]">151 FRAMES CANVAS</span>
        </div>
        <div className="flex flex-col justify-between p-2.5 rounded-xl bg-black/50 border border-white/5">
          <span className="text-[7.5px] font-mono text-[#8A8A8A] uppercase tracking-wider">SHADERS</span>
          <span className="text-xs font-bold font-mono text-[#6E1A2B] mt-0.5">FLUTED GLASS</span>
          <span className="text-[7px] font-mono text-[#8A8A8A]">BURGUNDY WEBGL</span>
        </div>
      </div>
      <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/5">
        <span className="text-[8px] font-mono text-[#8A8A8A] tracking-wider">STACK</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8px] font-mono text-white">NEXT.JS 14 · THREE.JS · TAILWIND</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN PROJECTS PAGE BENTO GRID BUILDER
   ────────────────────────────────────────────────────────── */
export default function ProjectsPage() {
  return (
    <div className="relative w-full min-h-screen text-[#F5F5F5] pb-32 pt-12 sm:pt-20 px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col items-center overflow-hidden">
      <CinematicBackground variant="projects" />

      <div className="relative z-10 w-full max-w-[1800px] flex flex-col gap-12 sm:gap-16">
        {/* ── TOP EDITORIAL HEADER ── */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-3">
            <ImageText
              text="PROJECTS"
              imageUrl="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop"
              direction="diagonal"
              className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tight uppercase drop-shadow-[0_10px_20px_rgba(255,255,255,0.12)]"
            />
            <span className="text-[#A1A1AA] font-light text-lg sm:text-2xl md:text-3xl tracking-tight uppercase pb-0.5 sm:pb-1">
              SYSTEM BUILDS
            </span>
          </div>
        </header>

        {/* ── PROJECTS BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
          {/* Project 1: LifeDashboard 2.0 */}
          <FeatCard
            title="LifeDashboard 2.0"
            category="Personal Life OS · Backend / AI"
            status="Active Development"
            description="A modular, multi-service life operating system unifying habit metrics, wellness scores, and finances into a centralized FastAPI backend."
            githubUrl="https://github.com/Jaytavanoji"
          >
            <LifeDashboardWidget />
          </FeatCard>

          {/* Project 2: RegiNova */}
          <FeatCard
            title="RegiNova"
            category="AI · Document Search & RAG"
            status="Featured Project"
            description="An AI government/corporate document intel platform designed for semantic vector similarity queries and text chunk summaries."
            githubUrl="https://github.com/Jaytavanoji"
          >
            <RegiNovaWidget />
          </FeatCard>

          {/* Project 3: ANPR Smart Doc */}
          <FeatCard
            title="Smart CV Document OCR"
            category="Computer Vision · Pipeline Automation"
            status="Completed Prototype"
            description="Real-time automated computer vision workflow for contour detection, pre-processing, and Character OCR mapping."
            githubUrl="https://github.com/Jaytavanoji"
          >
            <CardCvPipeline />
          </FeatCard>

          {/* Project 4: ML Failure Predictor */}
          <FeatCard
            title="ML Failure Predictor"
            category="Machine Learning · QA Intelligence"
            status="Research Project"
            description="A software quality predictive classifier parsing historical code churn and regression test parameters to predict test fail pathways."
            githubUrl="https://github.com/Jaytavanoji"
          >
            <CardMlPredictor />
          </FeatCard>

          {/* Project 5: Interactive 3D Portfolio */}
          <FeatCard
            title="Interactive 3D Portfolio"
            category="Frontend Engineering · WebGL & Interactive"
            status="Featured Live System"
            description="Next.js 14 interactive portfolio featuring 60fps frame-sequence canvas scrubbing, WebGL fluted glass shader backgrounds, spatial audio controls, and dynamic bento grid layouts."
            githubUrl="https://github.com/Jaytavanoji"
          >
            <CardCurrentPortfolioWidget />
          </FeatCard>

          {/* Project 6: SentinelShield Auth Proxy */}
          <FeatCard
            title="SentinelShield Auth Proxy"
            category="Security · Zero-Trust Architecture"
            status="Prototype"
            description="A zero-trust JWT security proxy enforcing strict auth chains, request signing, IP reputation scoring, and automated threat quarantine."
            githubUrl="https://github.com/Jaytavanoji"
          >
            <div className="w-full h-full flex flex-col justify-between p-3.5 gap-2">
              <div className="grid grid-cols-2 gap-2 flex-1">
                <div className="flex flex-col p-2.5 rounded-xl bg-black/50 border border-white/5">
                  <span className="text-[7px] font-mono text-[#8A8A8A]">THREATS BLOCKED</span>
                  <span className="text-xl font-mono font-bold text-[#6E1A2B] mt-0.5">1,842</span>
                  <span className="text-[7px] font-mono text-[#8A8A8A]">LAST 24H</span>
                </div>
                <div className="flex flex-col p-2.5 rounded-xl bg-black/50 border border-white/5">
                  <span className="text-[7px] font-mono text-[#8A8A8A]">AUTH PASS RATE</span>
                  <span className="text-xl font-mono font-bold text-emerald-400 mt-0.5">99.7%</span>
                  <span className="text-[7px] font-mono text-[#8A8A8A]">RS256 JWT</span>
                </div>
              </div>
            </div>
          </FeatCard>
        </div>
      </div>
    </div>
  );
}
