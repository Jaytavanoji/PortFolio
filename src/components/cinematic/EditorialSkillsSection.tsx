"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";
import { Plus } from "lucide-react";

interface EditorialSkillsSectionProps {
  progress?: MotionValue<number>;
}

export default function EditorialSkillsSection({ progress }: EditorialSkillsSectionProps = {}) {
  return (
    <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 py-12 flex flex-col items-center select-none text-white">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-1.5 font-mono text-sm tracking-wider uppercase mb-6"
      >
        <span className="text-[#8A8A8A]">main /</span>
        <span className="text-[#7A2E3B] font-bold">tech-stack</span>
      </motion.div>

      {/* ── 2. LOCATION & ORIGIN BADGE ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center gap-1.5 mb-8 text-center"
      >
        <div className="p-1 rounded bg-[#7A2E3B]/10 border border-[#7A2E3B]/30">
          <Plus className="w-3.5 h-3.5 text-[#7A2E3B]" />
        </div>
        <span className="font-mono text-xs sm:text-sm text-[#A1A1AA] tracking-wider">
          System Architecture · Microservices · Vector RAG
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#7A2E3B] to-transparent mt-3" />
      </motion.div>

      {/* ── 3. PRIMARY EDITORIAL MANIFESTO STATEMENT ── */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-4xl text-center px-4 my-6"
      >
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase">
          we build scale-safe backends, async microservices, sharded postgresql databases, and high-frequency vector rag pipelines.
        </h2>
      </motion.div>

      {/* ── 4. SUBTEXT PARAGRAPH BLOCK ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-2xl text-center sm:text-right text-xs sm:text-sm font-light text-[#A1A1AA] leading-relaxed px-4 my-6 flex flex-col gap-3 self-center sm:self-end"
      >
        <p>
          Using modern software engineering practices, I craft non-blocking FastAPI APIs, Qdrant vector retrieval indexes, Redis caching queues, and Dockerized microservice architecture built to withstand high concurrency and tight latency SLAs.
        </p>
        <p className="text-[11px] font-mono text-[#7A2E3B]">
          P99 Latency &lt; 45ms · 98.4% Vector Recall · 99.99% Uptime SLA
        </p>
      </motion.div>

      {/* ── 5. CURVED WINDING ROADMAP / PROCESS PATH FOR TECH STACK ── */}
      <div className="relative w-full max-w-4xl my-20 flex flex-col items-center">
        
        {/* Animated Process Label */}
        <div className="flex items-center gap-2 mb-16 self-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7A2E3B] animate-pulse" />
          <span className="font-mono text-base italic font-bold text-[#7A2E3B]">stack modules.</span>
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
            stroke="#7A2E3B"
            strokeWidth="2"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0.3 }}
            whileInView={{ pathLength: 1, opacity: 0.7 }}
            viewport={{ once: false }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </svg>

        {/* Stack Module 01: Backend & Microservices */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md self-start ml-2 sm:ml-12 my-10 p-6 rounded-2xl bg-black/90 border border-white/15 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#7A2E3B]">01.</span>
            <span className="text-[10px] font-mono text-[#8A8A8A] uppercase">MODULE ONE</span>
          </div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7A2E3B]" />
            backend & microservices
          </h3>
          <p className="text-xs text-[#A1A1AA] leading-relaxed mt-3">
            FastAPI async routers, Python 3.12 runtime, Pydantic v2 data validation, Uvicorn ASGI server, and automated OpenAPI spec generation.
          </p>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#7A2E3B]">
            <span>FastAPI / Python 3.12</span>
            <span>P99 &lt; 45ms</span>
          </div>
        </motion.div>

        {/* Stack Module 02: Database & Memory Caching */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 w-full max-w-md self-end mr-2 sm:mr-12 my-10 p-6 rounded-2xl bg-black/90 border border-[#7A2E3B]/40 shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#7A2E3B]">02.</span>
            <span className="text-[10px] font-mono text-[#8A8A8A] uppercase">MODULE TWO</span>
          </div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full border-2 border-[#7A2E3B]" />
            database & memory cache
          </h3>
          <p className="text-xs text-[#A1A1AA] leading-relaxed mt-3">
            Sharded PostgreSQL relational storage, PgBouncer connection pooling, Redis in-memory caching layers, and pub/sub message queues.
          </p>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#7A2E3B]">
            <span>PostgreSQL / Redis</span>
            <span>99.99% Uptime</span>
          </div>
        </motion.div>

        {/* Stack Module 03: AI & Vector RAG Search */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 w-full max-w-md self-start ml-2 sm:ml-12 my-10 p-6 rounded-2xl bg-black/90 border border-white/15 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#7A2E3B]">03.</span>
            <span className="text-[10px] font-mono text-[#8A8A8A] uppercase">MODULE THREE</span>
          </div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full border-2 border-[#7A2E3B]" />
            ai & vector rag search
          </h3>
          <p className="text-xs text-[#A1A1AA] leading-relaxed mt-3">
            Qdrant vector database, HNSW cosine index embeddings, 384-dimensional dense vectors, hybrid keyword-semantic search, and LLM streaming.
          </p>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#7A2E3B]">
            <span>Qdrant 384d Cosine</span>
            <span>98.4% Recall</span>
          </div>
        </motion.div>

        {/* Stack Module 04: Infrastructure & Frontend Engineering */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 w-full max-w-md self-end mr-2 sm:mr-12 my-10 p-6 rounded-2xl bg-black/90 border border-white/15 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#7A2E3B]">04.</span>
            <span className="text-[10px] font-mono text-[#8A8A8A] uppercase">MODULE FOUR</span>
          </div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7A2E3B]" />
            infrastructure & canvas UI
          </h3>
          <p className="text-xs text-[#A1A1AA] leading-relaxed mt-3">
            Docker multi-stage container builds, CI/CD automated test verification, Next.js 14 App Router, and Framer Motion 60fps canvas engines.
          </p>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#7A2E3B]">
            <span>Docker / Next.js 14</span>
            <span>60 FPS Canvas</span>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
