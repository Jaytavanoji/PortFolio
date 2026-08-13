"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedRaysProps {
    /** Additional CSS classes */
    className?: string;
    /** Optional children to render over the background */
    children?: React.ReactNode;
}

export function AnimatedRays({
    className = "",
    children,
}: AnimatedRaysProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section className={cn("relative w-full h-full overflow-hidden bg-[#060407]", className)}>
            {/* Natural Organic Atmospheric Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#060407] via-[#14050D] to-[#080712] transition-opacity duration-1000">
                {/* Diffused organic ambient light spheres */}
                <div className="absolute top-[-10%] right-[-5%] w-[65vw] h-[65vh] bg-[radial-gradient(circle_at_center,rgba(190,28,42,0.22),transparent_65%)] blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[60vw] h-[60vh] bg-[radial-gradient(circle_at_center,rgba(65,18,75,0.18),transparent_70%)] blur-[130px] pointer-events-none" />
                <div className="absolute top-[30%] left-[20%] w-[50vw] h-[50vh] bg-[radial-gradient(circle_at_center,rgba(110,26,43,0.08),transparent_60%)] blur-[140px] pointer-events-none" />
                <div className="absolute bottom-[20%] right-[15%] w-[45vw] h-[45vh] bg-[radial-gradient(circle_at_center,rgba(14,32,54,0.2),transparent_65%)] blur-[120px] pointer-events-none" />
            </div>

            {/* Smooth Natural Vignette Overlay for Crisp Typography Contrast */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,4,6,0.82)_100%)] pointer-events-none z-10" />

            {children && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                    {children}
                </div>
            )}
        </section>
    );
}

export default AnimatedRays;
