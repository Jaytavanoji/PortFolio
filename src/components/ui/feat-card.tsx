"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlareCard } from "@/components/ui/glare-card";
import { Github } from "lucide-react";

export interface FeatCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  category?: string;
  status?: string;
  githubUrl?: string;
}

export function FeatCard({ 
  title, 
  description, 
  category, 
  status, 
  githubUrl, 
  children, 
  className = "" 
}: FeatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.018, y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn("w-full h-full", className)}
    >
      <GlareCard className={cn("flex flex-col gap-2 h-full justify-between", category ? "p-5" : "p-4")}>
        <div className="z-10 flex flex-col gap-1.5">
          {category && status ? (
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-mono text-[#FF4D1F] uppercase tracking-widest">
                {category}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono border border-white/10 bg-white/5 text-white/60 px-1.5 py-0.5 rounded-full uppercase">
                  {status}
                </span>
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8A8A8A] hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ) : null}
          <h3 className="font-semibold text-white text-sm tracking-tight">{title}</h3>
          <p className="text-[#8A8A8A] text-xs leading-relaxed max-w-[95%]">{description}</p>
        </div>
        <div className="relative mt-2 flex-1 w-full rounded-[14px] overflow-hidden border border-white/5 bg-black/40">
          {children}
        </div>
      </GlareCard>
    </motion.div>
  );
}
