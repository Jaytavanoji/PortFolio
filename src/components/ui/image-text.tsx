"use client";

import React, { useState, useEffect } from "react";
import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageTextProps extends HTMLMotionProps<"h1"> {
  text: string;
  imageUrl: string | string[] | { src: string } | { src: string }[];
  className?: string;
  direction?: "horizontal" | "vertical" | "diagonal" | "none";
  interval?: number;
}

export function ImageText({
  text,
  imageUrl,
  className,
  direction = "horizontal",
  interval = 3000,
  ...props
}: ImageTextProps) {
  const images = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!Array.isArray(imageUrl) || imageUrl.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [imageUrl, interval, images.length]);

  const getCurrentImageUrl = () => {
    const img = images[currentImageIndex];
    return typeof img === "string" ? img : img.src;
  };

  const getAnimation = () => {
    switch (direction) {
      case "horizontal":
        return {
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        };
      case "vertical":
        return {
          backgroundPosition: ["50% 0%", "50% 100%", "50% 0%"],
        };
      case "diagonal":
        return {
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        };
      case "none":
        return {
          backgroundPosition: "center",
        };
      default:
        return {
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        };
    }
  };

  const baseClass = className || "text-5xl font-black uppercase tracking-tight";

  return (
    <span className="inline-block relative">
      {/* Invisible layout placeholder ensuring size doesn't collapse */}
      <h1 className={cn("inline-block invisible select-none", baseClass)}>
        {text}
      </h1>

      <AnimatePresence>
        <motion.h1
          key={currentImageIndex}
          className={cn(
            "inline-block absolute inset-0 select-none",
            baseClass
          )}
          style={{
            backgroundImage: `url(${getCurrentImageUrl()})`,
            backgroundSize: direction === "none" ? "cover" : "150% auto",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            filter: "drop-shadow(0 4px 18px rgba(220, 38, 38, 0.35)) brightness(1.15)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            ...getAnimation(),
            opacity: 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1 },
            backgroundPosition: {
              duration: 15,
              ease: "linear",
              repeat: Infinity,
            },
          }}
          {...props}
        >
          {text}
        </motion.h1>
      </AnimatePresence>
    </span>
  );
}

export default ImageText;
