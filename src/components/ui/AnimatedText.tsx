"use client";

import React from "react";

interface AnimatedTextProps {
  children: string;
  className?: string;
}

export default function AnimatedText({ children, className = "" }: AnimatedTextProps) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
        {children}
      </span>
      <span aria-hidden className="absolute inset-0 block transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
}
