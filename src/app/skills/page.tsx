"use client";

import React from "react";
import { Terminal, Server, Database, Sparkles, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SkillItem {
  name: string;
  badge?: string;
  desc: string;
}

interface SkillGroup {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: SkillItem[];
}

export default function SkillsPage() {
  const groups: SkillGroup[] = [
    {
      id: "01",
      title: "PROGRAMMING & CORE",
      icon: Terminal,
      skills: [
        { name: "Python", desc: "Primary language for backend pipelines, AI scripting, data workflows" },
        { name: "Java & Java OOP", desc: "Object-oriented design, robust abstractions, data structures" },
        { name: "Data Structures & Algorithms", desc: "Algorithmic problem solving, complexity optimization" },
        { name: "Spring Boot", badge: "Learning", desc: "Enterprise Java backend ecosystem & microservices" },
      ],
    },
    {
      id: "02",
      title: "BACKEND ARCHITECTURE",
      icon: Server,
      skills: [
        { name: "FastAPI", desc: "High-throughput asynchronous Python web APIs & schema validation" },
        { name: "REST APIs", desc: "Contract-driven RESTful architecture, serialization, HTTP protocols" },
        { name: "Backend Architecture", desc: "Modular service separation, middleware, structured routing" },
        { name: "JWT Authentication", desc: "Stateless security, token signing, role-based route guard" },
        { name: "API Integration", desc: "Third-party endpoints, webhooks, rate-limiting & error handling" },
        { name: "Node.js", badge: "Learning", desc: "JavaScript runtime ecosystem & event-driven services" },
      ],
    },
    {
      id: "03",
      title: "DATABASES & STORAGE",
      icon: Database,
      skills: [
        { name: "SQL", desc: "Relational database querying, multi-table joins, indexing" },
        { name: "PostgreSQL", desc: "Production relational engine, JSONB indexing, relational modeling" },
        { name: "MySQL", desc: "Structured database management, ACID compliance, transactions" },
        { name: "MongoDB", desc: "Document-oriented NoSQL storage, aggregation pipelines" },
      ],
    },
    {
      id: "04",
      title: "AI & INTELLIGENCE",
      icon: Sparkles,
      skills: [
        { name: "RAG Systems", desc: "Retrieval-Augmented Generation, vector embeddings, FAISS search" },
        { name: "AI APIs (Groq, OpenAI)", desc: "High-speed inference integration, token optimization" },
        { name: "Prompt Engineering", desc: "Structured system prompt construction, few-shot conditioning" },
        { name: "AI-Assisted Workflows", desc: "Automated document understanding, LLM tooling pipelines" },
      ],
    },
    {
      id: "05",
      title: "TOOLS & ENVIRONMENT",
      icon: Wrench,
      skills: [
        { name: "Git", desc: "Distributed version control, branching strategies, rebasing" },
        { name: "GitHub", desc: "Code review, actions, issue tracking, remote repositories" },
        { name: "VS Code", desc: "Modern extensible IDE with configured debugging & linting" },
        { name: "IntelliJ IDEA", desc: "Full-featured Java & backend development environment" },
      ],
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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_40%,_rgba(255,77,31,0.05),_transparent_45%)]"
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
              SKILLS <span className="text-[#A1A1AA] font-light">WHAT I BUILD WITH</span>
            </h1>
          </div>
          <span className="text-xs font-mono tracking-widest uppercase text-[#8A8A8A]">
            Technical Stack · Tools · Systems
          </span>
        </div>

        {/* ── 5 CAPABILITY GROUPS ── */}
        <div className="flex flex-col gap-10">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.id}
                className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col gap-6 relative overflow-hidden group hover:border-[#FF4D1F]/30 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Header of Group */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#FF4D1F]/10 border border-[#FF4D1F]/30 text-[#FF4D1F]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] font-bold text-[#FF4D1F] tracking-widest uppercase">
                        GROUP {group.id}
                      </span>
                      <h2 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase">
                        {group.title}
                      </h2>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#8A8A8A]">
                    {group.skills.length} TECHNOLOGIES
                  </span>
                </div>

                {/* Skill Pills / Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-white/25 hover:bg-white/[0.04] transition-all flex flex-col justify-between gap-2 group/card"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-white text-sm sm:text-base group-hover/card:text-[#FF4D1F] transition-colors">
                          {skill.name}
                        </span>
                        {skill.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-[#FF4D1F]/20 border border-[#FF4D1F]/40 text-[#FF4D1F] text-[10px] font-mono font-bold uppercase tracking-wider">
                            {skill.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#8A8A8A] font-light leading-relaxed">
                        {skill.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── FOOTER CTA ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 rounded-3xl bg-gradient-to-r from-white/[0.04] to-black border border-white/10">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-white">Want to see these skills in action?</h3>
            <p className="text-sm text-[#8A8A8A] mt-1 font-light">
              Check out the backend engines and AI platforms I’ve built.
            </p>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF4D1F] hover:bg-[#E63E12] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-105"
          >
            <span>View Selected Work</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
