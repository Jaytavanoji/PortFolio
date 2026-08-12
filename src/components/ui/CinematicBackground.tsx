"use client";

import React from "react";
import ShaderBackground from "@/components/ui/ShaderBackground";

export interface CinematicBackgroundProps {
  variant?: string;
  className?: string;
}

export const CinematicBackground = React.memo(function CinematicBackground({
  className,
}: CinematicBackgroundProps) {
  return (
    <div
      className="pointer-events-none fixed -inset-24 z-0 overflow-hidden bg-[#050505]"
      aria-hidden="true"
    >
      <ShaderBackground className="w-full h-full opacity-60" />
      {/* Dark vignette overlay for contrast and typography readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.85)_100%)] pointer-events-none z-10" />
    </div>
  );
});

export default CinematicBackground;
