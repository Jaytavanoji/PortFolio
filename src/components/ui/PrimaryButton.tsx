"use client";

import React from "react";
import AnimatedText from "@/components/ui/AnimatedText";

interface PrimaryButtonProps {
  children?: string;
  href?: string;
  as?: "a" | "button";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export default function PrimaryButton({
  children = "Start for free",
  href = "#",
  as = "a",
  size = "lg",
  className = "",
  onClick,
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: "h-9 px-5 text-xs font-medium",
    md: "h-10 px-7 text-xs font-medium",
    lg: "h-12 px-9 text-sm font-medium",
  }[size];

  const baseClasses = `group inline-flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-black leading-none transition-all shadow-lg ${sizeClasses} ${className}`;

  if (as === "button") {
    return (
      <button type="button" onClick={onClick} className={baseClasses}>
        <AnimatedText>{children}</AnimatedText>
      </button>
    );
  }

  return (
    <a href={href} onClick={onClick} className={baseClasses}>
      <AnimatedText>{children}</AnimatedText>
    </a>
  );
}
