"use client";

import React from "react";
import { ArrowUpRight, Code, Layers, Sparkles, Database, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  highlights: string[];
  githubUrl?: string;
  status: string;
}

export default function ProjectsPage() {
  const projects: Project[] = [
    {
      number: "01",
      title: "LifeDashboard 2.0",
      category: "PERSONAL LIFE OS · BACKEND / AI",
      description:
        "A modular, multi-service personal life operating system unifying daily productivity, personal finances, wellness habits, and screen-time intelligence into a synchronized backend dashboard.",
      tech: ["React", "FastAPI", "Python", "PostgreSQL", "Groq API", "REST APIs", "Tailwind CSS"],
      highlights: [
        "Modular microservice architecture built with high-speed FastAPI endpoints",
        "Automated intelligence summaries powered by Groq LLM API",
        "Relational database storage with schema migrations and analytics queries",
      ],
      status: "Active Development",
    },
    {
      number: "02",
      title: "RegiNova",
      category: "AI · DOCUMENT INTELLIGENCE & SEARCH",
      description:
        "An AI-driven government and corporate document intelligence platform engineered for semantic vector search, intelligent question-answering over dense legal texts, and secure document analytics.",
      tech: ["React", "Vite", "FastAPI", "PostgreSQL", "JWT Auth", "Groq API", "RAG", "FAISS", "Sentence Transformers"],
      highlights: [
        "Retrieval-Augmented Generation (RAG) pipeline using Sentence Transformers & FAISS",
        "Stateless JWT authentication with role-guarded API endpoints",
        "Sub-second vector similarity search across large text repositories",
      ],
      status: "Featured Project",
    },
    {
      number: "03",
      title: "ANPR & Smart Document Intelligence",
      category: "COMPUTER VISION · AUTOMATION PIPELINE",
      description:
        "An automated computer vision workflow designed for real-time Automated Number Plate Recognition (ANPR) and intelligent document processing with text bounding-box extraction.",
      tech: ["Python", "Computer Vision", "OpenCV", "AI Models", "Automation Scripts"],
      highlights: [
        "Morphological image pre-processing, contour detection, and plate localization",
        "OCR extraction pipeline with noise filtering and character segmentation",
        "Lightweight automated CLI pipeline for batch document extraction",
      ],
      status: "Completed Prototype",
    },
    {
      number: "04",
      title: "ML Test Case Failure Prediction",
      category: "MACHINE LEARNING · SOFTWARE QUALITY ENGINEERING",
      description:
        "A predictive machine learning system developed to analyze code churn, historical test executions, and module dependencies to predict potential software test-case failures prior to deployment.",
      tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Data Preprocessing"],
      highlights: [
        "Feature engineering on historical commit logs and automated test run metrics",
        "Binary classification model predicting high-risk regression failure paths",
        "Optimization of CI/CD testing duration by prioritizing high-risk test cases",
      ],
      status: "Research & Prototype",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#050608] text-[#F5F5F5] pb-32 pt-12 sm:pt-20 px-4 sm:px-8 md:px-14 flex flex-col items-center overflow-hidden">
      {/* ── ATMOSPHERIC HERO-FRAME MATCHED AMBIENT GLOWS ── */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,_rgba(28,34,56,0.5),_transparent_65%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,_rgba(255,77,31,0.06),_transparent_45%)]"
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
              PROJECTS <span className="text-[#A1A1AA] font-light">SYSTEMS & AI</span>
            </h1>
          </div>
          <span className="text-xs font-mono tracking-widest uppercase text-[#8A8A8A]">
            Backend · AI · Experiments
          </span>
        </div>

        {/* ── SUBTITLE STATEMENT ── */}
        <p className="max-w-3xl text-base sm:text-xl text-[#A1A1AA] font-light leading-relaxed">
          Systems, applications, and experiments I’ve built while exploring backend engineering, AI/RAG architectures, and practical software development.
        </p>

        {/* ── EDITORIAL PROJECT CARDS ── */}
        <div className="flex flex-col gap-10">
          {projects.map((project) => (
            <div
              key={project.number}
              className="p-6 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col lg:flex-row justify-between gap-8 relative overflow-hidden group hover:border-[#FF4D1F]/40 transition-all shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
            >
              {/* Left Column: Project Overview */}
              <div className="flex flex-col gap-4 flex-1">
                {/* Number & Category */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-[#FF4D1F]">
                    {project.number}
                  </span>
                  <div className="h-4 w-px bg-white/20" />
                  <span className="font-mono text-xs font-bold tracking-widest text-[#8A8A8A] uppercase">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white group-hover:text-white transition-colors">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#A1A1AA] font-light leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                {/* Highlights List */}
                <div className="flex flex-col gap-2 pt-2">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F5F5]/90 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#FF4D1F] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Tech Stack & Actions */}
              <div className="lg:w-80 flex flex-col justify-between gap-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
                {/* Tech Pills */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] font-bold text-[#8A8A8A] tracking-wider uppercase">
                    TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white text-xs font-mono font-medium hover:border-[#FF4D1F]/50 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF4D1F] animate-pulse" />
                    <span className="text-xs font-mono text-[#A1A1AA] font-medium">
                      {project.status}
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-[#FF4D1F] text-white text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <span>Discuss</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── FOOTER CTA ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 rounded-3xl bg-gradient-to-r from-white/[0.04] to-black border border-white/10">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-white">Have a project or collaboration in mind?</h3>
            <p className="text-sm text-[#8A8A8A] mt-1 font-light">
              Let’s build practical backend systems or AI-powered solutions together.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF4D1F] hover:bg-[#E63E12] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-105"
          >
            <span>Let&apos;s Connect</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
