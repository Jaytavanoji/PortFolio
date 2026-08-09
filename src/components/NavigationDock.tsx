"use client";

import React, { useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import GlassDock, { DockItem } from "@/components/GlassDock";
import { Music } from "lucide-react";

export default function NavigationDock() {
  const pathname = usePathname();
  const router = useRouter();

  // Instant global prefetching
  useEffect(() => {
    ["/", "/about", "/skills", "/projects", "/contact", "/music"].forEach((path) => {
      router.prefetch(path);
    });
  }, [router]);

  const handleNavigate = useCallback(
    (path: string) => {
      if (pathname !== path) {
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        }
        router.push(path);
      }
    },
    [pathname, router]
  );

  const dockItems: DockItem[] = [
    {
      title: "Home",
      icon: () => null,
      onClick: () => handleNavigate("/"),
    },
    {
      title: "About",
      icon: () => null,
      onClick: () => handleNavigate("/about"),
    },
    {
      title: "Skills",
      icon: () => null,
      onClick: () => handleNavigate("/skills"),
    },
    {
      title: "Projects",
      icon: () => null,
      onClick: () => handleNavigate("/projects"),
    },
    {
      title: "Music",
      icon: Music,
      onClick: () => handleNavigate("/music"),
    },
    {
      title: "Contact",
      icon: () => null,
      onClick: () => handleNavigate("/contact"),
    },
  ];

  return (
    <nav
      aria-label="Global Portfolio Navigation"
      className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-auto px-4"
    >
      <GlassDock items={dockItems} />
    </nav>
  );
}
