"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import {
  Home,
  User,
  Cpu,
  Layers,
  Music,
  Mail,
  LucideIcon,
} from "lucide-react";

// Lucide fallback map
const DEFAULT_ICONS: Record<string, LucideIcon> = {
  home: Home,
  about: User,
  skills: Cpu,
  projects: Layers,
  music: Music,
  contact: Mail,
};

export interface DockItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  onClick?: () => void;
}

export interface GlassDockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DockItem[];
  dockClassName?: string;
}

export const GlassDock = React.forwardRef<HTMLDivElement, GlassDockProps>(
  (
    {
      items,
      className,
      dockClassName,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState(0);

    const handleMouseEnter = (index: number) => {
      if (hoveredIndex !== null && index !== hoveredIndex) {
        setDirection(index > hoveredIndex ? 1 : -1);
      }
      setHoveredIndex(index);
    };

    const getTooltipPosition = (index: number) => index * 52 + 12;

    return (
      <div
        ref={ref}
        className={cn("w-max flex flex-col items-center justify-center select-none", className)}
        {...props}
      >
        <div className="relative">
          <AnimatePresence>
            {hoveredIndex !== null && items[hoveredIndex] && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: -48,
                  x: getTooltipPosition(hoveredIndex) - (items.length * 26),
                }}
                exit={{ opacity: 0, scale: 0.92, y: 12 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="absolute top-0 left-1/2 pointer-events-none z-30"
              >
                <div
                  className={cn(
                    "px-3 py-1 rounded-full",
                    "bg-black/90 text-white border border-white/20 shadow-xl flex items-center justify-center backdrop-blur-xl",
                    "min-w-[70px] "
                  )}
                >
                  <div className="relative h-4 flex items-center justify-center overflow-hidden w-full">
                    <AnimatePresence mode="popLayout" custom={direction}>
                      <motion.span
                        key={items[hoveredIndex].title}
                        custom={direction}
                        initial={{
                          x: direction > 0 ? 25 : -25,
                          opacity: 0,
                          filter: "blur(4px)",
                        }}
                        animate={{
                          x: 0,
                          opacity: 1,
                          filter: "blur(0px)",
                        }}
                        exit={{
                          x: direction > 0 ? -25 : 25,
                          opacity: 0,
                          filter: "blur(4px)",
                        }}
                        transition={{
                          duration: 0.25,
                          ease: "easeOut",
                        }}
                        className="text-[10px] font-mono font-bold tracking-wider uppercase whitespace-nowrap"
                      >
                        {items[hoveredIndex].title}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={cn(
              "glass-dock relative flex gap-1.5 sm:gap-2 items-center px-3 sm:px-4 py-2 rounded-full",
              "bg-black/60 border border-white/15 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] justify-center",
              dockClassName
            )}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setDirection(0);
            }}
          >
            {items.map((el, index) => {
              const Icon = el.icon || Home;
              const isSelected = el.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(el.href);

              const isHovered = hoveredIndex === index;
              const isActive = isSelected || isHovered;

              return (
                <div
                  key={el.title}
                  onMouseEnter={() => handleMouseEnter(index)}
                  className="relative flex items-center justify-center cursor-pointer"
                >
                  {/* Active Indicator Background */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeDockIndicator"
                      className="absolute inset-0 rounded-full bg-[#6E1A2B]/40 border border-[#6E1A2B]/60 shadow-[0_0_12px_rgba(110,26,43,0.4)]"
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

                  {el.onClick ? (
                    <button
                      onClick={el.onClick}
                      className="relative p-2 sm:p-2.5 outline-none focus:outline-none flex items-center justify-center rounded-full"
                    >
                      <motion.div
                        whileTap={{ scale: 0.92 }}
                        animate={{
                          scale: isHovered ? 1.15 : isSelected ? 1.05 : 1,
                          y: isHovered ? -2 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className="relative z-10 flex items-center justify-center"
                      >
                        <Icon
                          className={cn(
                            "w-5 h-5 transition-colors duration-150",
                            isSelected
                              ? "text-white"
                              : isHovered
                              ? "text-white"
                              : "text-[#A0A0A0]"
                          )}
                        />
                      </motion.div>
                    </button>
                  ) : (
                    <Link
                      href={el.href}
                      prefetch={true}
                      className="relative p-2 sm:p-2.5 outline-none focus:outline-none flex items-center justify-center rounded-full"
                    >
                      <motion.div
                        whileTap={{ scale: 0.92 }}
                        animate={{
                          scale: isHovered ? 1.15 : isSelected ? 1.05 : 1,
                          y: isHovered ? -2 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className="relative z-10 flex items-center justify-center"
                      >
                        <Icon
                          className={cn(
                            "w-5 h-5 transition-colors duration-150",
                            isSelected
                              ? "text-white"
                              : isHovered
                              ? "text-white"
                              : "text-[#A0A0A0]"
                          )}
                        />
                      </motion.div>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

GlassDock.displayName = "GlassDock";
export default GlassDock;
