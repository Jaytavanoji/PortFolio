"use client";

import React from "react";
import { Sparkles, LayoutDashboard, Activity, GraduationCap, Plus, MapPin, Code2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="w-full min-h-screen bg-[#FAFAFA] py-8 sm:py-12 px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center select-none font-runtime">
      <div
        id="approach"
        className="w-full max-w-6xl p-6 sm:p-8 lg:p-10 bg-white border-neutral-200 border rounded-3xl relative overflow-hidden shadow-xl text-neutral-900"
      >
        {/* Background dividers */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
          <div className="absolute top-0 bottom-0 left-1/3 w-px bg-gradient-to-b from-transparent via-neutral-300 to-transparent" />
          <div className="absolute top-0 bottom-0 right-1/3 w-px bg-gradient-to-b from-transparent via-neutral-300 to-transparent" />
        </div>

        {/* ── Bounded Symmetrical Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          
          {/* Left Column (5 Cols): Heading + Copy + CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-200/80 border border-neutral-300 text-neutral-800 text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5 text-neutral-700" />
                  Pune, Maharashtra, India
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-200/80 border border-neutral-300 text-neutral-800 text-xs font-bold">
                  <Code2 className="w-3.5 h-3.5 text-neutral-700" />
                  Fresher / Developer
                </span>
              </div>

              <span className="text-xs font-normal text-neutral-500 font-runtime tracking-widest uppercase block mb-1">
                Identity & Approach
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[0.98] text-neutral-900 tracking-tight font-deltha font-bold uppercase">
                Building practical software, backend systems & AI solutions.
              </h2>

              {/* Subtle plus markers with divider */}
              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200" />
                </div>
                <div className="hidden sm:grid grid-cols-3 gap-3 text-neutral-600 bg-neutral-50 px-2 relative font-runtime text-xs">
                  <div className="flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span className="font-medium">Software Dev</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span className="font-medium">Backend & APIs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span className="font-medium">AI / Vector RAG</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mt-6">
              <div>
                <p className="text-xs font-bold text-neutral-900 tracking-wider font-runtime uppercase">
                  Learn → Build → Debug → Improve
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 font-runtime leading-relaxed">
                  I started with Python and expanded into backend development, APIs, databases, Java, and Spring Boot. I learn primarily by building projects, experimenting with technologies, debugging problems, and improving through iteration.
                </p>

                <a
                  href="#projects"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full bg-neutral-900 text-white text-xs sm:text-sm font-bold hover:bg-neutral-800 transition font-runtime shadow-lg"
                >
                  <span>View Jay's Projects & Experience</span>
                  <span className="inline-flex h-2 w-2 rounded-full bg-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Symmetrical 2x2 Image Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-5 relative">
            
            {/* Card 01: LEARN */}
            <article className="relative overflow-hidden aspect-[4/3] bg-[url(https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85)] bg-cover border-neutral-200 border rounded-2xl group shadow-md transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-neutral-900 border border-neutral-300 shadow">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2 py-1 rounded-md bg-white/90 backdrop-blur text-[10px] text-neutral-800 font-bold border border-neutral-200 uppercase tracking-wider shadow">
                  Step 01
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <p className="text-white text-lg sm:text-xl font-bold tracking-tight leading-none font-deltha uppercase">
                  LEARN
                </p>
                <p className="text-[11px] text-[#CBD5E1] mt-1 font-runtime line-clamp-1">
                  Python, CS & Fundamentals
                </p>
              </div>
            </article>

            {/* Card 02: BUILD */}
            <article className="relative overflow-hidden aspect-[4/3] bg-[url(https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85)] bg-cover border-neutral-200 border rounded-2xl group shadow-md transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-neutral-900 border border-neutral-300 shadow">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2 py-1 rounded-md bg-white/90 backdrop-blur text-[10px] text-neutral-800 font-bold border border-neutral-200 uppercase tracking-wider shadow">
                  Step 02
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <p className="text-white text-lg sm:text-xl font-bold tracking-tight leading-none font-deltha uppercase">
                  BUILD
                </p>
                <p className="text-[11px] text-[#CBD5E1] mt-1 font-runtime line-clamp-1">
                  RegiNova AI & Life OS
                </p>
              </div>
            </article>

            {/* Card 03: DEBUG */}
            <article className="relative overflow-hidden aspect-[4/3] bg-[url(https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85)] bg-cover border-neutral-200 border rounded-2xl group shadow-md transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-neutral-900 border border-neutral-300 shadow">
                  <Activity className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2 py-1 rounded-md bg-white/90 backdrop-blur text-[10px] text-neutral-800 font-bold border border-neutral-200 uppercase tracking-wider shadow">
                  Step 03
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <p className="text-white text-lg sm:text-xl font-bold tracking-tight leading-none font-deltha uppercase">
                  DEBUG
                </p>
                <p className="text-[11px] text-[#CBD5E1] mt-1 font-runtime line-clamp-1">
                  System Optimization & Fixes
                </p>
              </div>
            </article>

            {/* Card 04: IMPROVE */}
            <article className="relative overflow-hidden aspect-[4/3] bg-[url(https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85)] bg-cover border-neutral-200 border rounded-2xl group shadow-md transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-neutral-900 border border-neutral-300 shadow">
                  <GraduationCap className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2 py-1 rounded-md bg-white/90 backdrop-blur text-[10px] text-neutral-800 font-bold border border-neutral-200 uppercase tracking-wider shadow">
                  Step 04
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <p className="text-white text-lg sm:text-xl font-bold tracking-tight leading-none font-deltha uppercase">
                  IMPROVE
                </p>
                <p className="text-[11px] text-[#CBD5E1] mt-1 font-runtime line-clamp-1">
                  Java, Spring & Microservices
                </p>
              </div>
            </article>

          </div>

        </div>
      </div>
    </section>
  );
}
