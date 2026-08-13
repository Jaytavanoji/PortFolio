"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";
import { Plus, Github, ExternalLink } from "lucide-react";

interface StickyProjectsShowcaseProps {
  progress?: MotionValue<number>;
}

export default function StickyProjectsShowcase({ progress }: StickyProjectsShowcaseProps = {}) {
  return (
    <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 py-12 flex flex-col items-center select-none text-white font-extrabold">
      
      {/* ── 1. BREADCRUMB HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-1.5 font-mono text-sm tracking-wider uppercase mb-6"
      >
        <span className="text-[#CBD5E1]">main /</span>
        <span className="text-[#E2E8F0] font-bold">selected projects</span>
      </motion.div>

      {/* ── 2. LOCATION & ORIGIN BADGE ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center gap-1.5 mb-8 text-center"
      >
        <div className="p-1 rounded bg-[#E2E8F0]/10 border border-[#E2E8F0]/30">
          <Plus className="w-3.5 h-3.5 text-[#E2E8F0]" />
        </div>
        <span className="font-mono text-xs sm:text-sm text-[#CBD5E1] tracking-wider">
          Case Studies · Full-Stack Products · Vector RAG
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#E2E8F0] to-transparent mt-3" />
      </motion.div>

      {/* ── 3. PRIMARY EDITORIAL MANIFESTO STATEMENT ── */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-4xl text-center px-4 my-6"
      >
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white font-extrabold tracking-tight leading-tight uppercase">
          we design, deploy, and scale high-impact software applications, developer tools, and intelligent integrations.
        </h2>
      </motion.div>

      {/* ── 4. SUBTEXT PARAGRAPH BLOCK ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-2xl text-center sm:text-right text-xs sm:text-sm font-light text-[#CBD5E1] leading-relaxed px-4 my-6 flex flex-col gap-3 self-center sm:self-end"
      >
        <p>
          A curated collection of production software engineering projects, backend microservices, and AI RAG systems designed, engineered, and deployed by Jay Tavanoji.
        </p>
        <p className="text-[11px] font-mono text-[#E2E8F0]">
          5 Production Repositories · Open-Source Codebases
        </p>
      </motion.div>

      {/* ── 5. CURVED WINDING ROADMAP / PROCESS PATH FOR PROJECTS ── */}
      <div className="relative w-full max-w-4xl my-20 flex flex-col items-center">
        
        {/* Animated Process Label */}
        <div className="flex items-center gap-2 mb-16 self-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0] animate-pulse" />
          <span className="font-mono text-base italic font-bold text-[#E2E8F0]">project showcase.</span>
        </div>

        {/* Continuous SVG Winding Path Overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M 450,20 C 550,100 600,160 480,240 C 350,320 250,380 320,480 C 400,580 550,620 450,760"
            stroke="#E2E8F0"
            strokeWidth="2"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0.3 }}
            whileInView={{ pathLength: 1, opacity: 0.7 }}
            viewport={{ once: false }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </svg>

        {/* Project 01: LifeDashboard 2.0 */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-xl self-start ml-2 sm:ml-12 my-10 p-6 rounded-2xl bg-[#14161B] border border-white/20 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#E2E8F0]">01.</span>
            <span className="text-[10px] font-mono text-[#CBD5E1] uppercase">BACKEND / AI</span>
          </div>
          <h3 className="text-base font-bold text-white font-extrabold uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E2E8F0]" />
            LifeDashboard 2.0
          </h3>
          <p className="text-xs text-[#CBD5E1] leading-relaxed mt-3">
            Personal Life OS & FastAPI backend microservice ecosystem for high-frequency habit tracking, automated workflows, and sharded PostgreSQL data storage.
          </p>
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between font-mono text-[10px]">
            <span className="text-[#CBD5E1]">Python / FastAPI / Redis</span>
            <a href="https://github.com/Jaytavanoji/LifeDashboard" target="_blank" rel="noopener noreferrer" className="text-[#E2E8F0] flex items-center gap-1 hover:underline">
              <Github className="w-3 h-3" /> Code
            </a>
          </div>
        </motion.div>

        {/* Project 02: RegiNova AI */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 w-full max-w-xl self-end mr-2 sm:mr-12 my-10 p-6 rounded-2xl bg-[#14161B] border border-[#E2E8F0]/40 shadow-[0_0_30px_rgba(163,49,63,0.15)] backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#E2E8F0]">02.</span>
            <span className="text-[10px] font-mono text-[#CBD5E1] uppercase">AI / VECTOR RAG</span>
          </div>
          <h3 className="text-base font-bold text-white font-extrabold uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full border-2 border-[#E2E8F0]" />
            RegiNova AI
          </h3>
          <p className="text-xs text-[#CBD5E1] leading-relaxed mt-3">
            RAG Document Search & Legal Tech platform using Qdrant vector database, hybrid sparse-dense embeddings, HNSW index cosine scoring, and streaming responses.
          </p>
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between font-mono text-[10px]">
            <span className="text-[#CBD5E1]">Qdrant / OpenAI / TypeScript</span>
            <a href="https://github.com/Jaytavanoji/RegiNova-AI" target="_blank" rel="noopener noreferrer" className="text-[#E2E8F0] flex items-center gap-1 hover:underline">
              <Github className="w-3 h-3" /> Code
            </a>
          </div>
        </motion.div>

        {/* Project 03: Smart CV OCR */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 w-full max-w-xl self-start ml-2 sm:ml-12 my-10 p-6 rounded-2xl bg-[#14161B] border border-white/20 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#E2E8F0]">03.</span>
            <span className="text-[10px] font-mono text-[#CBD5E1] uppercase">COMPUTER VISION</span>
          </div>
          <h3 className="text-base font-bold text-white font-extrabold uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full border-2 border-[#E2E8F0]" />
            Smart CV Document OCR
          </h3>
          <p className="text-xs text-[#CBD5E1] leading-relaxed mt-3">
            Automated resume parser leveraging LayoutLM and OpenCV for structural layout parsing, bounding box extraction, and JSON serialization.
          </p>
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between font-mono text-[10px]">
            <span className="text-[#CBD5E1]">LayoutLM / OpenCV / PyTorch</span>
            <a href="https://github.com/Jaytavanoji/Smart-CV-OCR" target="_blank" rel="noopener noreferrer" className="text-[#E2E8F0] flex items-center gap-1 hover:underline">
              <Github className="w-3 h-3" /> Code
            </a>
          </div>
        </motion.div>

        {/* Project 04: Microservice Gateway */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 w-full max-w-xl self-end mr-2 sm:mr-12 my-10 p-6 rounded-2xl bg-[#14161B] border border-white/20 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#E2E8F0]">04.</span>
            <span className="text-[10px] font-mono text-[#CBD5E1] uppercase">INFRASTRUCTURE</span>
          </div>
          <h3 className="text-base font-bold text-white font-extrabold uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E2E8F0]" />
            Async Microservice API Gateway
          </h3>
          <p className="text-xs text-[#CBD5E1] leading-relaxed mt-3">
            High-throughput traffic dispatcher featuring token-bucket rate limiting, JWT authentication, connection pooling, and Docker containerization.
          </p>
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between font-mono text-[10px]">
            <span className="text-[#CBD5E1]">Docker / Redis / Uvicorn</span>
            <a href="https://github.com/Jaytavanoji" target="_blank" rel="noopener noreferrer" className="text-[#E2E8F0] flex items-center gap-1 hover:underline">
              <Github className="w-3 h-3" /> Code
            </a>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
