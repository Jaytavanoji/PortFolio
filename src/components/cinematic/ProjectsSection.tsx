"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiveProjectButton from "@/components/ui/LiveProjectButton";
import FadeIn from "@/components/ui/FadeIn";

const realProjects = [
  {
    number: "01",
    category: "AI / VECTOR RAG",
    name: "RegiNova RAG AI",
    subtitle: "AI-Powered Government Document Intelligence Platform",
    desc: "A platform making government documents easier to search, retrieve and understand through AI document intelligence, FAISS vector search, and LLaMA/Groq LLM RAG.",
    tags: ["React", "FastAPI", "PostgreSQL", "RAG", "Groq LLaMA", "FAISS"],
    githubUrl: "https://github.com/Jaytavanoji/RAG.git",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
  },
  {
    number: "02",
    category: "SYSTEM & PORTFOLIO",
    name: "Portfolio System",
    subtitle: "Personal Portfolio & Interactive Developer Showcase",
    desc: "Interactive portfolio architecture featuring Next.js 14, Framer Motion scroll mechanics, WebGL canvas effects, and dark mode UI design system.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/Jaytavanoji/PortFolio.git",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
  },
  {
    number: "03",
    category: "INDUSTRIAL & BACKEND",
    name: "Protech Industries",
    subtitle: "Enterprise Industrial Management & Backend Services",
    desc: "Industrial web application and microservices backend system engineered for real-time tracking, resource management, and service coordination.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/Jaytavanoji/Protech-Industries.git",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
  },
  {
    number: "04",
    category: "COMPUTER VISION",
    name: "ANPR Pipeline",
    subtitle: "Automatic Number Plate Recognition System",
    desc: "Computer vision pipeline for automatic vehicle detection, license plate region extraction, preprocessing, and OCR text extraction.",
    tags: ["Python", "OpenCV", "OCR", "Image Processing"],
    githubUrl: "https://github.com/Jaytavanoji",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
  },
  {
    number: "05",
    category: "CLOUD BACKEND",
    name: "Time Capsule",
    subtitle: "Scheduled Content Vault & AWS S3 Backend",
    desc: "Backend API system for storing digital content and releasing access at future timestamps using AWS S3 storage, Cron jobs, and JWT auth.",
    tags: ["Python", "AWS S3", "Cron Jobs", "JWT", "PostgreSQL"],
    githubUrl: "https://github.com/Jaytavanoji",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
  },
  {
    number: "06",
    category: "MACHINE LEARNING",
    name: "Test Failure Predictor",
    subtitle: "ML-Based Software Test Case Failure Prediction",
    desc: "Machine learning system forecasting test-case failures from execution history data and engineered quality metrics.",
    tags: ["Python", "Scikit-Learn", "Pandas", "Feature Eng"],
    githubUrl: "https://github.com/Jaytavanoji",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
  },
];

function Card({ project, index, totalCards, progress }: {
  project: typeof realProjects[0];
  index: number;
  totalCards: number;
  progress: any;
}) {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / totalCards, 1], [1, targetScale]);

  return (
    <div className="sticky top-24 md:top-32 h-[85vh] flex items-center justify-center">
      <motion.div
        style={{
          scale,
          top: `${index * 24}px`,
        }}
        className="relative w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-neutral-300 bg-white p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden flex flex-col justify-between"
      >
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <span className="font-deltha font-black text-neutral-900 text-3xl sm:text-5xl">
              {project.number}
            </span>
            <div>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-runtime font-bold block">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2.5xl font-deltha font-bold text-neutral-950 uppercase tracking-wider">
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton href={project.githubUrl} label="View Code" />
        </div>

        {/* Subtitle & Desc */}
        <div className="mb-4">
          <h4 className="font-runtime text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-700 mb-1.5">{project.subtitle}</h4>
          <p className="font-runtime text-xs sm:text-sm text-neutral-600 max-w-3xl leading-relaxed">
            {project.desc}
          </p>
        </div>

        {/* Bottom Row: Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full my-auto">
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="overflow-hidden rounded-[24px] sm:rounded-[32px] bg-neutral-100 border border-neutral-200 h-[clamp(110px,14vw,200px)]">
              <img src={project.img1} alt={`${project.name} preview 1`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="overflow-hidden rounded-[24px] sm:rounded-[32px] bg-neutral-100 border border-neutral-200 h-[clamp(130px,18vw,260px)]">
              <img src={project.img2} alt={`${project.name} preview 2`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>

          <div className="md:col-span-7 overflow-hidden rounded-[24px] sm:rounded-[32px] bg-neutral-100 border border-neutral-200 h-full min-h-[220px]">
            <img src={project.img3} alt={`${project.name} main showcase`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-neutral-200">
          {project.tags.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-800 font-runtime text-[11px] font-bold hover:bg-neutral-900 hover:text-white transition-colors">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FFFFFF] text-neutral-900 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-16 pb-24 px-4 sm:px-8 z-30 select-none"
    >
      {/* Section Header */}
      <FadeIn y={40} className="text-center mb-12 sm:mb-16">
        <span className="font-runtime text-xs sm:text-sm font-bold tracking-[0.3em] text-neutral-500 uppercase mb-1 block">
          PROJECTS // CASE STUDIES & PRODUCTS
        </span>
        <h2 className="text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight font-deltha text-neutral-950">
          PROJECTS
        </h2>
      </FadeIn>

      {/* Sticky Stacking Cards Container */}
      <div className="relative max-w-6xl mx-auto flex flex-col gap-12">
        {realProjects.map((proj, i) => (
          <Card
            key={proj.number}
            project={proj}
            index={i}
            totalCards={realProjects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
