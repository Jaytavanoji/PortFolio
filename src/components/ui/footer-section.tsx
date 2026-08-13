"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, Code2, Terminal, Cpu, Database } from "lucide-react";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: "Navigation",
    links: [
      { title: "About", href: "#about" },
      { title: "Tech Stack", href: "#skills" },
      { title: "Projects", href: "#projects" },
      { title: "Experiments", href: "#ai-experiments" },
      { title: "Contact", href: "#contact" },
    ],
  },
  {
    label: "Featured Projects",
    links: [
      { title: "RegiNova RAG AI", href: "https://github.com/Jaytavanoji/RAG.git", icon: ArrowUpRight },
      { title: "Portfolio System", href: "https://github.com/Jaytavanoji/PortFolio.git", icon: ArrowUpRight },
      { title: "Protech Industries", href: "https://github.com/Jaytavanoji/Protech-Industries.git", icon: ArrowUpRight },
      { title: "WhatsApp Direct", href: "https://wa.me/918618507400?text=Hi%20Jay%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!", icon: ArrowUpRight },
    ],
  },
  {
    label: "Core Focus",
    links: [
      { title: "AI & Vector RAG", href: "https://github.com/Jaytavanoji/RAG.git", icon: Database },
      { title: "FastAPI Microservices", href: "#skills", icon: Terminal },
      { title: "Java & Spring Boot", href: "#skills", icon: Code2 },
      { title: "LLM Engineering", href: "#ai-experiments", icon: Cpu },
    ],
  },
  {
    label: "Social Links",
    links: [
      { title: "GitHub", href: "https://github.com/Jaytavanoji", icon: Github },
      { title: "LinkedIn", href: "https://www.linkedin.com/in/jay-tavanoji-4606b93b9", icon: Linkedin },
      { title: "WhatsApp Direct", href: "https://wa.me/918618507400?text=Hi%20Jay%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!", icon: Mail },
    ],
  },
];

export function FooterSection() {
  return (
    <footer className="w-full bg-[#000000] border-t border-white/10 px-6 py-12 lg:py-16 text-white font-runtime select-none">
      <div className="max-w-6xl mx-auto">
        <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
          <AnimatedContainer className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-deltha font-bold text-base shadow-md">
                JT
              </div>
              <div>
                <span className="font-deltha font-bold text-white uppercase tracking-wider text-sm block">Jay Tavanoji</span>
                <span className="text-[10px] font-runtime text-neutral-400 font-bold uppercase tracking-widest block">AI &amp; Backend Developer</span>
              </div>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm mt-4 md:mt-0 leading-relaxed font-runtime">
              © {new Date().getFullYear()} Jay Shankar Tavanoji. Crafted with Next.js 14, TypeScript &amp; Framer Motion.
            </p>
          </AnimatedContainer>

          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <div className="mb-10 md:mb-0">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/90 font-runtime">{section.label}</h3>
                  <ul className="text-neutral-300 mt-4 space-y-2.5 text-xs sm:text-sm font-medium font-runtime">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="hover:text-white inline-flex items-center transition-all duration-300 gap-1.5"
                        >
                          {link.icon && <link.icon className="size-3.5 shrink-0 text-neutral-400" />}
                          <span>{link.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function AnimatedContainer({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
