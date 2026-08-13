"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";
import { Plus } from "lucide-react";

interface AiExperimentsSectionProps {
  progress?: MotionValue<number>;
}

export default function AiExperimentsSection({ progress }: AiExperimentsSectionProps = {}) {
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
        <span className="text-[#6F2735] font-bold">experiments</span>
      </motion.div>

      {/* ── 2. LOCATION & ORIGIN BADGE ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center gap-1.5 mb-8 text-center"
      >
        <div className="p-1 rounded bg-[#6F2735]/10 border border-[#6F2735]/30">
          <Plus className="w-3.5 h-3.5 text-[#6F2735]" />
        </div>
        <span className="font-mono text-xs sm:text-sm text-[#A1A1AA] tracking-wider">
          Experimental Lab · Vector Benchmarks · Live Telemetry
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#6F2735] to-transparent mt-3" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-4xl text-center px-4 my-6"
      >
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase">
          we prototype next-generation vector retrieval engines, hybrid search models, and real-time streaming telemetry.
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
          Live telemetry benchmarks and experimental AI pipeline evaluations compiled across Jay Tavanoji&apos;s vector research clusters.
        </p>
        <p className="text-[11px] font-mono text-[#6F2735]">
          1,420 QPS Vector Throughput · 185ms TTFT LLM Stream
        </p>
      </motion.div>

      {/* ── 5. CURVED WINDING ROADMAP / PROCESS PATH FOR AI EXPERIMENTS ── */}
      <div className="relative w-full max-w-4xl my-20 flex flex-col items-center">
        
        {/* Animated Process Label */}
        <div className="flex items-center gap-2 mb-16 self-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6F2735] animate-pulse" />
          <span className="font-mono text-base italic font-bold text-[#6F2735]">telemetry metrics.</span>
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
            stroke="#6F2735"
            strokeWidth="2"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0.3 }}
            whileInView={{ pathLength: 1, opacity: 0.7 }}
            viewport={{ once: false }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </svg>

        {/* Node 01: Vector Search QPS */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md self-start ml-2 sm:ml-12 my-10 p-6 rounded-2xl bg-black/90 border border-white/15 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#6F2735]">01.</span>
            <span className="text-[10px] font-mono text-[#8A8A8A] uppercase">QDRANT DISTRIBUTED</span>
          </div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6F2735]" />
            vector search throughput
          </h3>
          <p className="text-xs text-[#A1A1AA] leading-relaxed mt-3">
            HNSW cosine index vector retrieval processing 1,420 high-frequency queries per second across 384-dimensional dense embeddings.
          </p>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#6F2735]">
            <span>1,420 QPS</span>
            <span>HNSW 384d Cosine</span>
          </div>
        </motion.div>

        {/* Node 02: LLM Inference Latency */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 w-full max-w-md self-end mr-2 sm:mr-12 my-10 p-6 rounded-2xl bg-black/90 border border-[#6F2735]/40 shadow-[0_0_30px_rgba(245,158,11,0.15)] backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#6F2735]">02.</span>
            <span className="text-[10px] font-mono text-[#8A8A8A] uppercase">STREAMING PIPELINE</span>
          </div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full border-2 border-[#6F2735]" />
            llm inference latency
          </h3>
          <p className="text-xs text-[#A1A1AA] leading-relaxed mt-3">
            FastAPI async token chunk streaming providing 185ms time-to-first-token (TTFT) synthesis for interactive RAG queries.
          </p>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#6F2735]">
            <span>185ms TTFT</span>
            <span>FastAPI Async Stream</span>
          </div>
        </motion.div>

        {/* Node 03: API Router P99 */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 w-full max-w-md self-start ml-2 sm:ml-12 my-10 p-6 rounded-2xl bg-black/90 border border-white/15 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#6F2735]">03.</span>
            <span className="text-[10px] font-mono text-[#8A8A8A] uppercase">FASTAPI ROUTER</span>
          </div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full border-2 border-[#6F2735]" />
            api router p99 threshold
          </h3>
          <p className="text-xs text-[#A1A1AA] leading-relaxed mt-3">
            Stress-tested non-blocking ASGI event loops maintaining sub-42ms latency SLAs under 5,000 concurrent socket connections.
          </p>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#6F2735]">
            <span>P99 &lt; 42ms</span>
            <span>5k Concurrent Sockets</span>
          </div>
        </motion.div>

        {/* Node 04: Database Pool Resilience */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 w-full max-w-md self-end mr-2 sm:mr-12 my-10 p-6 rounded-2xl bg-black/90 border border-white/15 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xl font-bold italic text-[#6F2735]">04.</span>
            <span className="text-[10px] font-mono text-[#8A8A8A] uppercase">SHARDED POSTGRES</span>
          </div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6F2735]" />
            database pool resilience
          </h3>
          <p className="text-xs text-[#A1A1AA] leading-relaxed mt-3">
            Automatic failover connection pooling with PgBouncer, continuous health checks, and 99.99% availability SLAs.
          </p>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#6F2735]">
            <span>99.99% Uptime</span>
            <span>Auto Failover</span>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
