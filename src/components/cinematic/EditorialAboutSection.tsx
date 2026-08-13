"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { Plus } from "lucide-react";

interface EditorialAboutSectionProps {
  progress?: MotionValue<number>;
}

export default function EditorialAboutSection({ progress }: EditorialAboutSectionProps) {
  // Fallback static value if progress is not provided
  const fallbackProgress = useTransform(() => 0.5);
  const activeProgress = progress || fallbackProgress;

  // ── SCENE 01 — INTRODUCTION (0.00 -> 0.33) ──
  const s1Opacity = useTransform(activeProgress, [0.0, 0.08, 0.28, 0.38], [0, 1, 1, 0]);
  const s1Scale = useTransform(activeProgress, [0.0, 0.08, 0.28, 0.38], [0.97, 1, 1, 0.96]);
  const s1Y = useTransform(activeProgress, [0.0, 0.08, 0.28, 0.38], [25, 0, 0, -25]);
  const s1RotateX = useTransform(activeProgress, [0.0, 0.08, 0.28, 0.38], [-1, 0, 0, 1]);
  const s1PointerEvents = useTransform(activeProgress, (v) => (v < 0.33 ? "auto" : "none"));

  // ── SCENE 02 — DEVELOPER PROFILE (0.33 -> 0.66) ──
  const s2Opacity = useTransform(activeProgress, [0.30, 0.38, 0.60, 0.70], [0, 1, 1, 0]);
  const s2Scale = useTransform(activeProgress, [0.30, 0.38, 0.60, 0.70], [0.96, 1, 1, 0.96]);
  const s2Y = useTransform(activeProgress, [0.30, 0.38, 0.60, 0.70], [30, 0, 0, -30]);
  const s2RotateX = useTransform(activeProgress, [0.30, 0.38, 0.60, 0.70], [-1, 0, 0, 1]);
  const s2PointerEvents = useTransform(activeProgress, (v) => (v >= 0.33 && v < 0.66 ? "auto" : "none"));

  // ── SCENE 03 — ENGINEERING JOURNEY (0.66 -> 1.00) ──
  const s3Opacity = useTransform(activeProgress, [0.63, 0.70, 0.96, 1.00], [0, 1, 1, 0.6]);
  const s3Scale = useTransform(activeProgress, [0.63, 0.70, 0.96, 1.00], [0.96, 1, 1, 0.97]);
  const s3Y = useTransform(activeProgress, [0.63, 0.70, 0.96, 1.00], [30, 0, 0, -20]);
  const s3PointerEvents = useTransform(activeProgress, (v) => (v >= 0.66 ? "auto" : "none"));

  // Timeline Progressions & Path Length
  const timelinePathLength = useTransform(activeProgress, [0.66, 0.95], [0, 1]);
  const stg1Opacity = useTransform(activeProgress, [0.66, 0.72, 0.95], [1, 1, 0.8]);
  const stg2Opacity = useTransform(activeProgress, [0.66, 0.74, 0.80, 0.95], [0.35, 1, 1, 0.8]);
  const stg3Opacity = useTransform(activeProgress, [0.74, 0.82, 0.88, 0.95], [0.35, 1, 1, 0.8]);
  const stg4Opacity = useTransform(activeProgress, [0.82, 0.90, 0.96], [0.35, 1, 1]);

  // Final opportunity statement reveal
  const finalStatementOpacity = useTransform(activeProgress, [0.92, 0.97], [0, 1]);
  const finalStatementY = useTransform(activeProgress, [0.92, 0.97], [15, 0]);

  // Environmental typography bridge into SKILLS
  const bridgeOpacity = useTransform(activeProgress, [0.95, 1.0], [0, 0.4]);
  const bridgeY = useTransform(activeProgress, [0.95, 1.0], [30, 0]);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden text-[#F8FAFC] font-sans">
      
      {/* ── SCENE 01 — INTRODUCTION (0.00 -> 0.33) ── */}
      <motion.div
        style={{
          opacity: s1Opacity,
          scale: s1Scale,
          y: s1Y,
          rotateX: s1RotateX,
          pointerEvents: s1PointerEvents as any,
        }}
        className="absolute inset-0 flex flex-col items-center justify-between py-6 px-4 max-w-5xl mx-auto z-10"
      >


        {/* Focal Introduction Statement */}
        <div className="flex flex-col items-center text-center my-auto max-w-4xl px-2">
          <h2 className="text-[clamp(1.2rem,2.8vw,2.5rem)] font-extrabold text-[#F8FAFC] tracking-tight leading-tight uppercase max-w-3xl">
            &ldquo;I build practical software, learn continuously, and enjoy understanding how systems work.&rdquo;
          </h2>
        </div>

        {/* Supporting DSA Copy */}
        <div className="w-full max-w-2xl text-center px-4">
          <p className="text-xs sm:text-sm font-light text-[#94A3B8] leading-relaxed">
            I&apos;m an aspiring software developer focused on building practical solutions and continuously improving my problem-solving skills through Data Structures and Algorithms.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 font-mono text-[10px] text-[#C0C0C0]">
            <Plus className="w-3 h-3 text-[#C0C0C0]" />
            <span>Problem-Solving Fundamentals · DSA Exploration</span>
          </div>
        </div>
      </motion.div>


      {/* ── SCENE 02 — DEVELOPER PROFILE (0.33 -> 0.66) ── */}
      <motion.div
        style={{
          opacity: s2Opacity,
          scale: s2Scale,
          y: s2Y,
          rotateX: s2RotateX,
          pointerEvents: s2PointerEvents as any,
        }}
        className="absolute inset-0 flex flex-col items-center justify-between py-6 px-4 max-w-5xl mx-auto z-10"
      >


        {/* Primary Headline & Metadata Grid */}
        <div className="flex flex-col items-center text-center my-auto max-w-4xl w-full">
          
          <h2 className="text-[clamp(2.2rem,5.5vw,4.8rem)] font-black tracking-tighter uppercase text-[#F8FAFC] leading-none mb-4">
            ASPIRING SOFTWARE DEVELOPER
          </h2>

          {/* Structured Visual Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-2xl my-3 font-mono text-[11px]">
            <div className="p-2.5 rounded-xl bg-[#121418] border border-white/15 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0]" />
              <span className="text-[#F8FAFC] font-bold tracking-wider">BACKEND</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#121418] border border-white/15 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0]" />
              <span className="text-[#F8FAFC] font-bold tracking-wider">AI / AUTOMATION</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#121418] border border-white/15 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0]" />
              <span className="text-[#F8FAFC] font-bold tracking-wider">DSA</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#121418] border border-white/15 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0]" />
              <span className="text-[#F8FAFC] font-bold tracking-wider">SYSTEMS</span>
            </div>
          </div>

          {/* Supporting Technical Narrative */}
          <p className="text-xs sm:text-sm font-light text-[#94A3B8] leading-relaxed max-w-2xl my-3 px-2">
            Recently, I&apos;ve expanded beyond Python by working with Java (OOP) and Spring Boot, where I&apos;ve built backend systems and gained hands-on experience in structuring scalable applications. What sets me apart is my ability to adapt quickly and build using new technologies, along with my interest in both software and Embedded Systems, helping me understand how code interacts beyond the screen.
          </p>

          {/* Micro-tech Annotations */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-2xl mt-2 font-mono text-[10px]">
            {["Python", "Java", "Spring Boot", "FastAPI", "REST APIs", "PostgreSQL", "MongoDB", "RAG", "API Integration"].map((tech) => (
              <span key={tech} className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-[#F8FAFC]/80">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase">
          SCROLL TO EXPLORE ROADMAP & JOURNEY
        </div>
      </motion.div>


      {/* ── SCENE 03 — ENGINEERING JOURNEY (0.66 -> 1.00) ── */}
      <motion.div
        style={{
          opacity: s3Opacity,
          scale: s3Scale,
          y: s3Y,
          pointerEvents: s3PointerEvents as any,
        }}
        className="absolute inset-0 flex flex-col items-center justify-between py-6 px-4 max-w-5xl mx-auto z-10"
      >
        {/* Top Header */}
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase mb-1">
            <span className="text-[#94A3B8]">main /</span>
            <span className="text-[#C0C0C0] font-bold">roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#F8FAFC] uppercase tracking-tight">
            ENGINEERING JOURNEY
          </h2>
        </div>

        {/* 4-Stage Progressive Timeline Layout */}
        <div className="relative w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto">
          
          {/* Subtle SVG Path Connector */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden sm:block overflow-visible" viewBox="0 0 800 350">
            <motion.path
              d="M 200,80 L 600,80 L 600,260 L 200,260"
              fill="none"
              stroke="#C0C0C0"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              style={{ pathLength: timelinePathLength, opacity: 0.4 }}
            />
          </svg>

          {/* Stage 01 */}
          <motion.div style={{ opacity: stg1Opacity }} className="p-4 rounded-xl bg-[#121418] border border-white/15 backdrop-blur-md relative z-10">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-base font-bold italic text-[#C0C0C0]">01 — FOUNDATION</span>
            </div>
            <p className="text-xs text-[#F8FAFC]/90 font-medium">Python · Data Structures & Algorithms · Problem Solving</p>
            <p className="text-[10px] text-[#94A3B8] mt-1.5 leading-relaxed">
              Strengthening core algorithmic thinking, dynamic programming, space-time efficiency, and object-oriented programming foundations.
            </p>
          </motion.div>

          {/* Stage 02 */}
          <motion.div style={{ opacity: stg2Opacity }} className="p-4 rounded-xl bg-[#121418] border border-[#C0C0C0]/50 backdrop-blur-md relative z-10">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-base font-bold italic text-[#C0C0C0]">02 — BACKEND</span>
            </div>
            <p className="text-xs text-[#F8FAFC]/90 font-medium">Java / OOP · Spring Boot · FastAPI · REST APIs</p>
            <p className="text-[10px] text-[#94A3B8] mt-1.5 leading-relaxed">
              Building robust backend architectures, dependency injection, RESTful controllers, asynchronous request routing, and clean code principles.
            </p>
          </motion.div>

          {/* Stage 03 */}
          <motion.div style={{ opacity: stg3Opacity }} className="p-4 rounded-xl bg-[#121418] border border-white/15 backdrop-blur-md relative z-10">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-base font-bold italic text-[#C0C0C0]">03 — SYSTEMS</span>
            </div>
            <p className="text-xs text-[#F8FAFC]/90 font-medium">Databases · API Integration · Authentication · Architecture</p>
            <p className="text-[10px] text-[#94A3B8] mt-1.5 leading-relaxed">
              Designing relational & NoSQL schemas (PostgreSQL, MongoDB), connection pooling, JWT authentication, and scalable API gateways.
            </p>
          </motion.div>

          {/* Stage 04 */}
          <motion.div style={{ opacity: stg4Opacity }} className="p-4 rounded-xl bg-[#121418] border border-white/15 backdrop-blur-md relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-base font-bold italic text-[#C0C0C0]">04 — EXPLORATION</span>
            </div>
            <p className="text-xs text-[#F8FAFC]/90 font-medium">AI Workflows · RAG · Embedded Systems · Emerging Tech</p>
            <p className="text-[10px] text-[#94A3B8] mt-1.5 leading-relaxed">
              Exploring vector retrieval pipelines, Qdrant indexing, LLM orchestration, and hardware-software interaction beyond the screen.
            </p>
          </motion.div>

        </div>

        {/* Final Opportunity Statement */}
        <motion.div
          style={{ opacity: finalStatementOpacity, y: finalStatementY }}
          className="w-full max-w-2xl text-center px-2 py-2 rounded-xl bg-white/5 border border-white/20 my-1"
        >
          <p className="text-xs font-mono text-[#F8FAFC] leading-relaxed">
            &ldquo;Currently building, learning, and looking for opportunities to apply my skills, learn from experienced developers, and grow in a challenging environment.&rdquo;
          </p>
        </motion.div>
      </motion.div>



    </div>
  );
}
