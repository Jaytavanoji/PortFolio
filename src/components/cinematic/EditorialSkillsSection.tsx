"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";
import { Plus } from "lucide-react";

interface EditorialSkillsSectionProps {
  progress?: MotionValue<number>;
}

export default function EditorialSkillsSection({ progress }: EditorialSkillsSectionProps = {}) {
  return (
    <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 py-12 flex flex-col items-center select-none text-[#F8FAFC]">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-1.5 font-mono text-sm tracking-wider uppercase mb-6"
      >
        <span className="text-[#CBD5E1]">main /</span>
        <span className="text-[#CBD5E1] font-bold">tech-stack</span>
      </motion.div>

      {/* ── 2. LOCATION & ORIGIN BADGE ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center gap-1.5 mb-8 text-center"
      >
        <div className="p-1 rounded bg-[#627A82]/10 border border-[#627A82]/30">
          <Plus className="w-3.5 h-3.5 text-[#CBD5E1]" />
        </div>
        <span className="font-mono text-xs sm:text-sm text-[#CBD5E1] tracking-wider">
          System Architecture · Microservices · Vector RAG
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#94A3B8] to-transparent mt-3" />
      </motion.div>

      {/* ── 3. PRIMARY EDITORIAL MANIFESTO STATEMENT ── */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-4xl text-center px-4 my-6"
      >
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] tracking-tight leading-tight uppercase">
          we build scale-safe backends, async microservices, sharded postgresql databases, and high-frequency vector rag pipelines.
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
          Using modern software engineering practices, I craft non-blocking FastAPI APIs, Qdrant vector retrieval indexes, Redis caching queues, and Dockerized microservice architecture built to withstand high concurrency and tight latency SLAs.
        </p>
        <p className="text-[11px] font-mono text-[#CBD5E1]">
          P99 Latency &lt; 45ms · 98.4% Vector Recall · 99.99% Uptime SLA
        </p>
      </motion.div>

      {/* ── 5. CURVED WINDING ROADMAP / PROCESS PATH FOR TECH STACK ── */}
      <div className="relative w-full max-w-4xl my-20 flex flex-col items-center">
        
        {/* Animated Process Label */}
        <div className="flex items-center gap-2 mb-16 self-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#627A82] animate-pulse" />
          <span className="font-mono text-base italic font-bold text-[#CBD5E1]">stack modules.</span>
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
            stroke="#627A82"
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
          className="relative z-10 w-full max-w-xl self-start ml-2 sm:ml-12 my-10 p-6 rounded-2xl bg-[#14161B] border border-white/20 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#CBD5E1]">01.</span>
            <span className="text-[10px] font-mono text-[#CBD5E1] uppercase">MODULE ONE</span>
          </div>
          <h3 className="text-base font-bold text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#627A82]" />
            backend & microservices
          </h3>
          <p className="text-xs text-[#CBD5E1] leading-relaxed mt-3">
            FastAPI async routers, Python 3.12 runtime, Pydantic v2 data validation, Uvicorn ASGI server, and automated OpenAPI spec generation.
          </p>
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between font-mono text-[10px] text-[#CBD5E1]">
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
          className="relative z-10 w-full max-w-xl self-end mr-2 sm:mr-12 my-10 p-6 rounded-2xl bg-[#14161B] border border-[#627A82]/40 shadow-[0_0_30px_rgba(98,122,130,0.15)] backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#CBD5E1]">02.</span>
            <span className="text-[10px] font-mono text-[#CBD5E1] uppercase">MODULE TWO</span>
          </div>
          <h3 className="text-base font-bold text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full border-2 border-[#94A3B8]" />
            database & memory cache
          </h3>
          <p className="text-xs text-[#CBD5E1] leading-relaxed mt-3">
            Sharded PostgreSQL relational storage, PgBouncer connection pooling, Redis in-memory caching layers, and pub/sub message queues.
          </p>
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between font-mono text-[10px] text-[#CBD5E1]">
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
          className="relative z-10 w-full max-w-xl self-start ml-2 sm:ml-12 my-10 p-6 rounded-2xl bg-[#14161B] border border-white/20 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#CBD5E1]">03.</span>
            <span className="text-[10px] font-mono text-[#CBD5E1] uppercase">MODULE THREE</span>
          </div>
          <h3 className="text-base font-bold text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full border-2 border-[#94A3B8]" />
            ai & vector rag search
          </h3>
          <p className="text-xs text-[#CBD5E1] leading-relaxed mt-3">
            Qdrant vector database, HNSW cosine index embeddings, 384-dimensional dense vectors, hybrid keyword-semantic search, and LLM streaming.
          </p>
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between font-mono text-[10px] text-[#CBD5E1]">
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
          className="relative z-10 w-full max-w-xl self-end mr-2 sm:mr-12 my-10 p-6 rounded-2xl bg-[#14161B] border border-white/20 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#CBD5E1]">04.</span>
            <span className="text-[10px] font-mono text-[#CBD5E1] uppercase">MODULE FOUR</span>
          </div>
          <h3 className="text-base font-bold text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#627A82]" />
            infrastructure & canvas UI
          </h3>
          <p className="text-xs text-[#CBD5E1] leading-relaxed mt-3">
            Docker multi-stage container builds, CI/CD automated test verification, Next.js 14 App Router, and Framer Motion 60fps canvas engines.
          </p>
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between font-mono text-[10px] text-[#CBD5E1]">
            <span>Docker / Next.js 14</span>
            <span>60 FPS Canvas</span>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
