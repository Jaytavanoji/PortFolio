"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Home,
  User,
  Cpu,
  Layers,
  Music,
  Mail,
  LucideIcon,
} from "lucide-react";

export interface DockItem {
  title: string;
  href: string;
  icon?: LucideIcon;
}

export interface GlassDockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DockItem[];
  dockClassName?: string;
}

const DEFAULT_ICONS: Record<string, LucideIcon> = {
  home: Home,
  about: User,
  skills: Cpu,
  projects: Layers,
  music: Music,
  contact: Mail,
};

export default function GlassDock({
  items,
  className,
  dockClassName,
  ...props
}: GlassDockProps) {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn("flex flex-col items-center justify-center select-none", className)}
      {...props}
    >
      <div className="relative">
        {/* Floating Tooltip Pill on Hover */}
        <AnimatePresence>
          {hoveredIndex !== null && items[hoveredIndex] && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-50"
            >
              <div className="px-3 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-xl shadow-xl">
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-white">
                  {items[hoveredIndex].title}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dock Bar Container */}
        <div
          onMouseLeave={() => setHoveredIndex(null)}
          className={cn(
            "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full",
            "bg-black/60 border border-white/15 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)]",
            dockClassName
          )}
        >
          {items.map((item, index) => {
            const isSelected =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            const isHovered = hoveredIndex === index;
            const keyName = item.title.toLowerCase();
            const IconComponent = item.icon || DEFAULT_ICONS[keyName] || Home;

            return (
              <Link
                key={item.title}
                href={item.href}
                prefetch={true}
                onMouseEnter={() => setHoveredIndex(index)}
                className="relative flex items-center justify-center p-2 sm:p-2.5 rounded-full transition-colors duration-150 outline-none"
              >
                {/* Active Indicator Background */}
                {isSelected && (
                  <motion.div
                    layoutId="activeDockIndicator"
                    className="absolute inset-0 rounded-full bg-white/15 border border-white/20 shadow-inner"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Hover Glow */}
                {isHovered && !isSelected && (
                  <motion.div
                    layoutId="hoverDockIndicator"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <motion.div
                  animate={{
                    scale: isHovered ? 1.2 : isSelected ? 1.1 : 1,
                    y: isHovered ? -2 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative z-10 flex items-center justify-center"
                >
                  <IconComponent
                    className={cn(
                      "w-5 h-5 transition-colors duration-150",
                      isSelected
                        ? "text-[#FF4D1F]"
                        : isHovered
                        ? "text-white"
                        : "text-[#A1A1AA]"
                    )}
                  />
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
