"use client";

import React from "react";
import { ExternalLink } from "lucide-react";

interface LiveProjectButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export default function LiveProjectButton({
  href = "#",
  label = "Live Demo",
  className = "",
}: LiveProjectButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-bold font-runtime transition-all shadow-md ${className}`}
    >
      <span>{label}</span>
      <ExternalLink className="w-3.5 h-3.5" />
    </a>
  );
}
