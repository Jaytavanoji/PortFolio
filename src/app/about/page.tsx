"use client";

import React from "react";
import { ArrowRight, GraduationCap, MapPin, Code2, Cpu, Database, Flame } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#050608] text-[#F5F5F5] pb-32 pt-12 sm:pt-20 px-4 sm:px-8 md:px-14 flex flex-col items-center overflow-hidden">
      {/* ── ATMOSPHERIC HERO-FRAME MATCHED AMBIENT GLOWS ── */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,_rgba(28,34,56,0.5),_transparent_65%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_25%,_rgba(255,77,31,0.06),_transparent_45%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#030305]/70 to-[#020203]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl flex flex-col gap-12 sm:gap-16">
        {/* ── TOP EDITORIAL HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-white">
              ABOUT <span className="text-[#A1A1AA] font-light">JAY TAVANOJI</span>
            </h1>
          </div>
          <span className="text-xs font-mono tracking-widest uppercase text-[#8A8A8A]">
            Software Developer · Backend · AI Explorer
          </span>
        </div>

        {/* ── MASSIVE HERO STATEMENT ── */}
        <div className="max-w-4xl">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white">
            I BUILD SOFTWARE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#FF4D1F]">
              THAT ACTUALLY WORKS.
            </span>
          </h2>
        </div>

        {/* ── TWO-COLUMN EDITORIAL CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Left Column: Biography & Mindset */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-base sm:text-lg text-[#A1A1AA] leading-relaxed font-light">
            <p>
              I’m <strong className="text-white font-semibold">Jay Shankar Tavanoji</strong>, a Computer Science Engineering student and software developer focused on backend systems, robust APIs, and AI-assisted workflows.
            </p>
            <p>
              I enjoy understanding how complex distributed architectures operate beneath the hood, solving tricky algorithmic problems, and turning rough ideas into production-ready software that feels seamless and intuitive.
            </p>
            <p>
              Whether it&apos;s building modular life-operating systems, architecting RAG-based document intelligence engines, or predicting software test failure points with machine learning, my focus is always on engineering practical, high-utility tools.
            </p>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/projects"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF4D1F] hover:bg-[#E63E12] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-105"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-all backdrop-blur-md"
              >
                <span>Get In Touch</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Academic Credential & Focus Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Education Card */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-[#FF4D1F]/40 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4D1F]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 text-[#FF4D1F] mb-3">
                <GraduationCap className="w-5 h-5" />
                <span className="font-mono text-xs font-bold tracking-widest uppercase">
                  EDUCATION
                </span>
              </div>
              <h3 className="text-lg font-bold text-white leading-snug">
                B.Tech in Computer Science & Engineering
              </h3>
              <p className="text-sm text-[#A1A1AA] mt-1 font-medium">
                D. Y. Patil International University, Akurdi, Pune
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs font-mono text-[#8A8A8A]">
                <MapPin className="w-3.5 h-3.5 text-[#FF4D1F]" />
                <span>Pune, Maharashtra · Class of 2028</span>
              </div>
            </div>

            {/* Currently Focused On Card */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white">
                <Flame className="w-4 h-4 text-[#FF4D1F]" />
                <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#A1A1AA]">
                  CURRENTLY FOCUSED ON
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex flex-col gap-1 hover:border-[#FF4D1F]/40 transition-all">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Database className="w-3.5 h-3.5 text-[#FF4D1F]" />
                    <span>BACKENDS</span>
                  </div>
                  <span className="text-[11px] text-[#8A8A8A]">FastAPI · REST · Auth</span>
                </div>

                <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex flex-col gap-1 hover:border-[#FF4D1F]/40 transition-all">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Cpu className="w-3.5 h-3.5 text-[#FF4D1F]" />
                    <span>AI / RAG</span>
                  </div>
                  <span className="text-[11px] text-[#8A8A8A]">FAISS · LLM APIs · Search</span>
                </div>

                <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex flex-col gap-1 hover:border-[#FF4D1F]/40 transition-all">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Code2 className="w-3.5 h-3.5 text-[#FF4D1F]" />
                    <span>PROBLEM SOLVING</span>
                  </div>
                  <span className="text-[11px] text-[#8A8A8A]">Java OOP · DSA · Logic</span>
                </div>

                <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex flex-col gap-1 hover:border-[#FF4D1F]/40 transition-all">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Flame className="w-3.5 h-3.5 text-[#FF4D1F]" />
                    <span>SYSTEM BUILDING</span>
                  </div>
                  <span className="text-[11px] text-[#8A8A8A]">Life OS · Doc Intelligence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
