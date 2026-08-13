"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeUp from "@/components/ui/FadeUp";
import PrimaryButton from "@/components/ui/PrimaryButton";
import CtaDashboardMock from "@/components/ui/CtaDashboardMock";

export default function SelectedProjectDetail() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const dashboardY = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"]);
  const grassY = useTransform(scrollYProgress, [0, 1], ["120px", "-120px"]);

  return (
    <section
      ref={sectionRef}
      id="featured-project"
      className="relative w-full overflow-hidden select-none bg-[#000000] text-white min-h-screen flex flex-col justify-between"
    >
      <div className="relative mx-auto max-w-[1080px] px-4 sm:px-6 pt-16 sm:pt-24 md:pt-28 pb-[360px] sm:pb-[420px] md:pb-[380px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
          
          {/* Left Column */}
          <div className="relative z-20 max-w-[400px]">
            <FadeUp delay={1}>
              <h2 className="text-2xl sm:text-3xl font-deltha font-bold tracking-[-0.02em] leading-[1.1] text-white uppercase">
                Learn how Jay Tavanoji built RegiNova AI &amp; vector search in 60 days.
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="mt-6 text-white/80 text-base sm:text-lg leading-[1.5] max-w-[380px] font-runtime">
                Discover how Jay Tavanoji engineered government document intelligence using FAISS 384-dimensional vector indexing, FastAPI microservices, PostgreSQL, and LLaMA 3.3 RAG.
              </p>
            </FadeUp>

            <FadeUp delay={0.2} className="mt-8">
              <PrimaryButton as="button" onClick={() => window.open("https://github.com/Jaytavanoji/RAG.git", "_blank")}>
                Start for free
              </PrimaryButton>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Dashboard pinned to right edge, behind grass, parallax Y */}
      <motion.div
        style={{ y: dashboardY }}
        className="absolute top-[380px] sm:top-[400px] md:top-[420px] lg:top-16 left-4 right-4 sm:left-auto sm:-right-[8%] md:-right-[10%] lg:-right-[12%] z-10 sm:w-[85%] md:w-[80%] lg:w-[68%]"
      >
        <CtaDashboardMock />
      </motion.div>

      {/* Foreground Grass — in front of dashboard, parallax Y */}
      <motion.img
        src="https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1780586778/cta-bg_mlwy5s.png"
        alt=""
        aria-hidden
        style={{ y: grassY }}
        className="pointer-events-none select-none absolute left-0 right-0 bottom-[-40px] sm:bottom-[-60px] lg:bottom-[-100px] w-full z-30 object-cover"
      />
    </section>
  );
}
