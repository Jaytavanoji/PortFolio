"use client";

import React from "react";
import EditorialAboutSection from "@/components/cinematic/EditorialAboutSection";
import CinematicBackground from "@/components/ui/CinematicBackground";

export default function StandaloneAboutPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-white pt-16 pb-24 px-4 sm:px-6 overflow-hidden">
      <CinematicBackground variant="about" />
      <div className="relative z-10 w-full">
        <EditorialAboutSection />
      </div>
    </div>
  );
}
