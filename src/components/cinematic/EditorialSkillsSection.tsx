"use client";

import React from "react";
import { ShieldCheck, Check, Code2, ArrowRight } from "lucide-react";

export default function EditorialSkillsSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 px-4 sm:px-8 lg:px-12 bg-[#000000] text-white select-none font-runtime min-h-screen flex flex-col justify-center">
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Header Badge Row */}
        <div className="flex items-center justify-end mb-6">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs text-neutral-300 bg-white/5 border border-white/10 rounded-full px-3 py-1 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Production Certified Architecture
          </span>
        </div>

        {/* Three feature mockups */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: BUILDING WITH */}
          <div className="relative rounded-2xl border border-white/10 bg-neutral-950 ring-1 ring-inset ring-white/5 overflow-hidden flex flex-col justify-between p-5 sm:p-6 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-200 font-mono">
                  BUILDING WITH
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5 font-mono">
                  <Check className="w-3 h-3" />
                  Core Stack
                </span>
              </div>

              <ul className="space-y-2 text-xs font-runtime">
                {["Python", "FastAPI", "REST APIs", "PostgreSQL", "SQL", "Git & GitHub"].map((tech) => (
                  <li key={tech} className="flex items-center justify-between rounded-lg px-3 py-2 bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                    <span className="font-semibold text-white">{tech}</span>
                    <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">Active</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
              <span>Proven in Production</span>
              <span className="text-emerald-400 font-bold">Sub-20ms SLAs</span>
            </div>
          </div>

          {/* Card 2: CURRENTLY LEARNING */}
          <div className="relative rounded-2xl border border-white/10 bg-neutral-950 ring-1 ring-inset ring-white/5 overflow-hidden flex flex-col justify-between shadow-2xl">
            <div>
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-200 font-mono">
                  CURRENTLY LEARNING
                </span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  Active Deep Dive
                </span>
              </div>

              {/* Split view code preview */}
              <div className="relative h-60">
                <div className="absolute inset-y-0 left-0 w-full bg-black/90 p-4 font-mono text-[11px] leading-relaxed">
                  <div className="rounded-lg bg-neutral-900/90 border border-white/10 h-full p-3.5 overflow-hidden text-neutral-300">
                    <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-white/10 text-[10px] text-neutral-400">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 font-mono text-white/60">rag_pipeline.java</span>
                    </div>
                    <pre className="text-[10px] text-emerald-300 leading-normal">
<code>{`// Java & Spring Boot RAG Engine
@Service
public class VectorRAGService {
  @Autowired
  private FAISSVectorStore store;

  public List<Document> query() {
    return store.similaritySearch();
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-3.5 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>Java · Spring Boot · Node.js · TypeScript · RAG</span>
            </div>
          </div>

          {/* Card 3: EXPLORING */}
          <div className="relative rounded-2xl border border-white/10 bg-neutral-950 ring-1 ring-inset ring-white/5 overflow-hidden flex flex-col justify-between shadow-2xl">
            <div>
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-200 font-mono">
                  EXPLORING
                </span>
                <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full">
                  Research &amp; R&amp;D
                </span>
              </div>

              <div className="relative h-60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/22848efd-ec1e-4b8e-9232-4701ae5cb3c8_800w.jpg"
                  alt="AI Exploration"
                  className="absolute inset-0 h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 to-pink-500/20 mix-blend-overlay" />

                {/* floating HUD */}
                <div className="absolute right-4 top-4 w-36 sm:w-44 rounded-xl bg-neutral-900/80 border border-white/10 backdrop-blur p-3 shadow-md">
                  <div className="flex items-center gap-2 text-xs font-medium text-white">
                    <Code2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="truncate font-mono text-[11px]">AI &amp; LLM Apps</span>
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="h-1.5 w-full max-w-28 rounded bg-sky-400/50" />
                    <div className="h-1.5 w-full max-w-24 rounded bg-white/20" />
                    <div className="h-1.5 w-full max-w-20 rounded bg-white/10" />
                  </div>
                </div>

                {/* dock controls */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex items-center gap-2">
                  <div className="rounded-xl bg-neutral-900/80 border border-white/10 backdrop-blur px-2.5 py-1.5 flex items-center gap-1.5">
                    <span className="text-[10px] text-white rounded-lg bg-white/10 border border-white/10 px-2 py-0.5 font-mono">⌘</span>
                    <span className="text-[10px] text-neutral-300 hidden sm:inline font-mono">command</span>
                  </div>
                  <div className="rounded-xl bg-neutral-900/80 border border-white/10 backdrop-blur px-2 py-1.5 flex items-center gap-1">
                    <span className="text-[10px] text-white rounded-lg bg-white/10 border border-white/10 px-1.5 py-0.5 font-mono">↑</span>
                    <span className="text-[10px] text-white rounded-lg bg-white/10 border border-white/10 px-1.5 py-0.5 font-mono">↓</span>
                    <span className="text-[10px] text-white rounded-lg bg-white/10 border border-white/10 px-1.5 py-0.5 font-mono">→</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-3.5 border-t border-white/10 flex items-center gap-2 text-xs text-neutral-400 font-mono truncate">
              <span>AI Dev · LLM Apps · Vector Search · Embedded</span>
            </div>
          </div>

        </div>

        {/* Bottom 3 Columns matching the page content */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
          <div>
            <h4 className="text-base font-semibold tracking-tight text-white font-deltha uppercase">
              BUILDING WITH
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-runtime leading-relaxed">
              Python, FastAPI, REST APIs, PostgreSQL, SQL, Git &amp; GitHub for robust production systems.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold tracking-tight text-white font-deltha uppercase">
              CURRENTLY LEARNING
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-runtime leading-relaxed">
              Java, Spring Boot, Node.js, TypeScript &amp; Retrieval-Augmented Generation (RAG) architectures.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold tracking-tight text-white font-deltha uppercase">
              EXPLORING
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-runtime leading-relaxed">
              AI-Assisted Development, LLM Applications, Vector Search, Embedded Systems &amp; Backend Architecture.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-100 hover:text-white transition-colors group font-mono"
          >
            <span>Explore full system architecture</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
