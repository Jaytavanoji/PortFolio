"use client";

import React from "react";
import AnimatedGradient from "@/components/ui/animated-gradient";

const AURORA_CONFIG = { preset: "Aurora" as const, speed: 12 };

const CinematicBackground = React.memo(function CinematicBackground() {
  return (
    <div
      className="pointer-events-none fixed -inset-24 z-0 overflow-hidden bg-[#090103]"
      aria-hidden="true"
    >
      <AnimatedGradient
        config={AURORA_CONFIG}
        className="w-full h-full opacity-90"
      />
      {/* Dark vignette overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(5,1,2,0.7)_100%)] pointer-events-none" />
    </div>
  );
});

export default CinematicBackground;
