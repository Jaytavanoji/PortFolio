"use client";

import React from "react";
import GlassDock, { DockItem } from "@/components/GlassDock";
import { Home, User, Cpu, Layers, Music, Mail } from "lucide-react";

export default function NavigationDock() {
  const dockItems: DockItem[] = [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "About",
      href: "/about",
      icon: User,
    },
    {
      title: "Skills",
      href: "/skills",
      icon: Cpu,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: Layers,
    },
    {
      title: "Music",
      href: "/music",
      icon: Music,
    },
    {
      title: "Contact",
      href: "/contact",
      icon: Mail,
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
