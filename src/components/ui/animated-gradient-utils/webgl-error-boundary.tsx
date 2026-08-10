"use client";

import React, { Component, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("WebGL Error caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <WebGLFallback />;
    }

    return this.props.children;
  }
}

export function WebGLFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-b from-[#140406] via-[#0d0204] to-[#050102]",
        className
      )}
    />
  );
}
