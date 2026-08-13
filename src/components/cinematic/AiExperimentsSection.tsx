"use client";

import React from "react";
import { motion } from "framer-motion";

const experimentsData = [
  {
    number: "1",
    title: "FAISS Vector RAG Engine",
    metric: "1,420 QPS · Sub-20ms Search",
    desc: "High-throughput semantic search benchmarking FAISS vector indexing across 100,000+ legal & government documents with dense embeddings.",
    rotation: "rotate-[-1.5deg]",
    margin: "",
  },
  {
    number: "2",
    title: "Groq LLaMA Telemetry",
    metric: "185ms TTFT · Streaming",
    desc: "Real-time LLM token stream benchmark utilizing Groq LPU hardware acceleration for ultra-low latency contextual response synthesis.",
    rotation: "rotate-[1.2deg]",
    margin: "mt-4 md:mt-0",
  },
  {
    number: "3",
    title: "YOLOv8 ANPR Pipeline",
    metric: "60 FPS · 99.4% Precision",
    desc: "Real-time vehicle license plate detection and optical character recognition pipeline processing HD camera streams with low overhead.",
    rotation: "rotate-[-1.8deg]",
    margin: "",
  },
  {
    number: "4",
    title: "AWS Serverless Cluster",
    metric: "99.99% Uptime · Microservices",
    desc: "Event-driven cloud architecture utilizing AWS Lambda, DynamoDB, and S3 for scalable zero-idle cost backend automation.",
    rotation: "rotate-[1.5deg]",
    margin: "mt-4 md:mt-0",
  },
];

export default function AiExperimentsSection() {
  return (
    <section className="w-full bg-[#FFFFFF] py-10 px-4 sm:px-6 font-runtime overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* ── 4 PLAYFUL TILTED EXPERIMENT CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-6 items-stretch">
          {experimentsData.map((exp, index) => (
            <motion.div
              key={exp.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white p-6 sm:p-8 rounded-[16px] min-h-[380px] flex flex-col justify-between transform ${exp.rotation} hover:rotate-0 transition-transform duration-300 shadow-[0_0_0_8px_rgba(240,240,240,0.8),12px_16px_16px_rgba(0,0,0,0.08)] border border-neutral-200 ${exp.margin}`}
            >
              <div>
                <span className="text-5xl font-bold text-black opacity-10 block mb-4 leading-none font-mono">
                  {exp.number}
                </span>
                <span className="text-xs font-bold font-mono text-neutral-500 uppercase tracking-wider block mb-2">
                  {exp.metric}
                </span>
                <h3 className="text-xl font-bold font-deltha text-black mb-3 tracking-[-0.04em] uppercase">
                  {exp.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-xs sm:text-sm">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
