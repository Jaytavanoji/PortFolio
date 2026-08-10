"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  Send,
  Copy,
  Check,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Radio,
  Network,
  Workflow,
  Cpu,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GlareCard } from "@/components/ui/glare-card";
import { ImageText } from "@/components/ui/image-text";
import { FeatCard } from "@/components/ui/feat-card";
import CinematicBackground from "@/components/ui/CinematicBackground";


/* ──────────────────────────────────────────────────────────
   SMTP Transaction Log Pipeline
   ────────────────────────────────────────────────────────── */
type SmtpStep = "idle" | "handshake" | "transmit" | "delivered" | "failed";

interface SmtpWidgetProps {
  smtpStep: SmtpStep;
}

function SmtpWidget({ smtpStep }: SmtpWidgetProps) {
  const steps = [
    { id: "idle", label: "AWAITING MESSAGE", color: "text-[#FF4D1F]" },
    { id: "handshake", label: "SMTP HANDSHAKE", color: "text-amber-400" },
    { id: "transmit", label: "TRANSMITTING DATA", color: "text-blue-400" },
    { id: "delivered", label: "RECEIPT CONFIRMED", color: "text-emerald-400" },
  ];

  return (
    <div className="w-full h-full relative overflow-hidden select-none bg-neutral-950/40 rounded-xl flex items-center justify-center p-2 min-h-[120px]">
      <svg className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <pattern id="contact-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.75" fill="#ffffff" fillOpacity="0.05" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contact-dots)" />
      </svg>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 320 130"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* Paths */}
        <path d="M 45 70 L 120 70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <path d="M 120 70 L 195 70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <path d="M 195 70 L 270 70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        {/* Dynamic active line strokes */}
        <motion.path
          d="M 45 70 L 120 70"
          fill="none"
          stroke="#FF4D1F"
          strokeWidth="1.5"
          animate={{
            pathLength: smtpStep === "handshake" || smtpStep === "transmit" || smtpStep === "delivered" ? 1 : 0,
          }}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d="M 120 70 L 195 70"
          fill="none"
          stroke="#FF4D1F"
          strokeWidth="1.5"
          animate={{
            pathLength: smtpStep === "transmit" || smtpStep === "delivered" ? 1 : 0,
          }}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d="M 195 70 L 270 70"
          fill="none"
          stroke="#FF4D1F"
          strokeWidth="1.5"
          animate={{
            pathLength: smtpStep === "delivered" ? 1 : 0,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Nodes */}
        {[
          { id: "idle", x: 45, label: "FORM", icon: Copy },
          { id: "handshake", x: 120, label: "AUTH", icon: Network },
          { id: "transmit", x: 195, label: "SEND", icon: Workflow },
          { id: "delivered", x: 270, label: "INBOX", icon: CheckCircle2 },
        ].map((node, idx) => {
          const NodeIcon = node.icon;
          const isActive =
            (node.id === "idle" && smtpStep === "idle") ||
            (node.id === "handshake" && smtpStep === "handshake") ||
            (node.id === "transmit" && smtpStep === "transmit") ||
            (node.id === "delivered" && smtpStep === "delivered");

          return (
            <foreignObject
              key={node.id}
              x={node.x - 24}
              y={42}
              width={48}
              height={56}
              className="overflow-visible"
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-500",
                    isActive
                      ? "bg-[#FF4D1F] border-[#FF4D1F] text-white shadow-[0_0_15px_rgba(255,77,31,0.4)]"
                      : "bg-black/60 border-white/10 text-[#8A8A8A]"
                  )}
                >
                  <NodeIcon className="w-4 h-4" />
                </div>
                <span className="text-[7px] font-mono tracking-wider font-bold text-white/50 uppercase">
                  {node.label}
                </span>
              </div>
            </foreignObject>
          );
        })}
      </svg>

      {/* Top right mini indicator badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
        <Radio className="w-3 h-3 text-[#FF4D1F] animate-pulse" />
        <span className="text-[8px] font-mono font-bold tracking-wider text-white uppercase">
          {smtpStep === "idle"
            ? "AWAITING MESSAGE"
            : smtpStep === "handshake"
            ? "SMTP HANDSHAKE"
            : smtpStep === "transmit"
            ? "TRANSMITTING DATA"
            : "DELIVERED"}
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Location/Heartbeat Indicator
   ────────────────────────────────────────────────────────── */
function HeartbeatWidget() {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 select-none">
      <div className="flex flex-col gap-1">
        <span className="text-[8px] font-mono text-[#8A8A8A] uppercase tracking-wider">
          LIVE LOCATION
        </span>
        <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
          <MapPin className="w-4 h-4 text-[#FF4D1F]" />
          Pune, Maharashtra, India
        </span>
      </div>

      <div className="flex items-center justify-between text-[8px] font-mono text-white/50 mt-4 border-t border-white/5 pt-2">
        <span>SMTP PORT: 587 (TLS)</span>
        <span className="flex items-center gap-1">
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-transform duration-500",
              pulse ? "bg-emerald-400 scale-125" : "bg-emerald-600 scale-100"
            )}
          />
          SERVER ONLINE
        </span>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [smtpStep, setSmtpStep] = useState<SmtpStep>("idle");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const emailAddress = "jayshankartavanoji2020@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    // Dynamic visual sequence matching Bento execution
    setSmtpStep("handshake");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSmtpStep("transmit");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSmtpStep("delivered");
        setFeedback({
          type: "success",
          message:
            "Your message was sent directly to my inbox! I will get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSmtpStep("idle");
        setFeedback({
          type: "error",
          message:
            data.error || "Failed to send message. Please try again or email directly.",
        });
      }
    } catch (err) {
      setSmtpStep("idle");
      setFeedback({
        type: "error",
        message: "An unexpected network error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSmtpStep("idle");
      }, 4000);
    }
  };

  return (
    <div className="relative w-full min-h-screen text-[#F5F5F5] pb-32 pt-12 sm:pt-20 px-4 sm:px-8 md:px-14 flex flex-col items-center overflow-hidden">
      <CinematicBackground />

      <div className="relative z-10 w-full max-w-[1380px] flex flex-col gap-12 sm:gap-16">
        {/* ── TOP EDITORIAL HEADER ── */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-3">
            <ImageText
              text="CONTACT"
              imageUrl="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop"
              direction="diagonal"
              className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tight uppercase drop-shadow-[0_10px_20px_rgba(255,255,255,0.12)]"
            />
            <span className="text-[#A1A1AA] font-light text-lg sm:text-2xl md:text-3xl tracking-tight uppercase pb-0.5 sm:pb-1">
              LET&apos;S SYNC
            </span>
          </div>
        </header>

        {/* ── CONTACT BENTO GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          {/* Bento Card 1: Contact Form (Spans 2 columns) */}
          <div className="lg:col-span-2 flex flex-col gap-4 w-full">
            {/* Direct Message Intro Text */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.018, y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <GlareCard className="p-6 sm:p-8 flex flex-col justify-center h-[240px] relative overflow-hidden">
                <div className="z-10 flex flex-col gap-3">
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                    Have an idea, project, or opportunity?
                  </h2>
                  <p className="text-xs sm:text-sm text-[#8A8A8A] leading-relaxed max-w-[92%]">
                    Whether you’re looking to build high-performance backend systems, explore AI/RAG integrations, or talk software engineering, I’m always open to discussing new challenges.
                  </p>
                </div>
              </GlareCard>
            </motion.div>

            {/* Direct Message Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.018, y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="w-full h-[501px]"
            >
              <GlareCard className="p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden">
                <div className="flex flex-col gap-6 w-full h-full justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Direct Message</h2>
                    <p className="text-[#8A8A8A] text-xs mt-1">
                      Send an encrypted query directly via secure SMTP transaction.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-mono text-[#8A8A8A] uppercase tracking-wider">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF4D1F] transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-mono text-[#8A8A8A] uppercase tracking-wider">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF4D1F] transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-mono text-[#8A8A8A] uppercase tracking-wider">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Inquiry / Partnership Request"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF4D1F] transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-mono text-[#8A8A8A] uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Enter your query details..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF4D1F] transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 w-full sm:w-auto self-end px-6 py-2.5 rounded-xl bg-[#FF4D1F] hover:bg-[#E63E12] disabled:bg-[#FF4D1F]/50 text-white text-[11px] font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Syncing...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>
                  </form>

                  <AnimatePresence>
                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={cn(
                          "flex items-start gap-3 p-3.5 rounded-xl border",
                          feedback.type === "success"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                        )}
                      >
                        {feedback.type === "success" ? (
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        )}
                        <span className="text-xs leading-relaxed font-mono">{feedback.message}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </GlareCard>
            </motion.div>
          </div>

          {/* Column 2 for Bento widgets */}
          <div className="flex flex-col gap-4">
            {/* Bento Card 2: Interactive Communications Channel */}
            <FeatCard
              title="Communications Channel"
              description="Direct channels and verified cryptographic routes."
              className="h-[235px]"
            >
              <div className="flex flex-col gap-2 p-3.5">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-between w-full p-2.5 rounded-lg bg-black/60 border border-white/10 hover:border-[#FF4D1F]/40 transition-all text-left"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#FF4D1F]" />
                    <span className="text-[10px] font-mono text-white/80 truncate max-w-[150px]">
                      {emailAddress}
                    </span>
                  </div>
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[#8A8A8A]" />
                  )}
                </button>

                <div className="flex gap-2">
                  <a
                    href="https://github.com/Jaytavanoji"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-black/60 border border-white/10 hover:border-white/30 text-xs text-white/80 transition-all"
                  >
                    <Github className="w-4 h-4 text-white" />
                    <span className="font-mono text-[9px] uppercase font-bold">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jay-tavanoji-4606b93b9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-black/60 border border-white/10 hover:border-white/30 text-xs text-white/80 transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-sky-400" />
                    <span className="font-mono text-[9px] uppercase font-bold">LinkedIn</span>
                  </a>
                </div>
              </div>
            </FeatCard>

            {/* Bento Card 3: SMTP Network Widget */}
            <FeatCard
              title="SMTP Transaction Log"
              description="Visual routing of current message sync transaction stages."
              className="h-[275px]"
            >
              <SmtpWidget smtpStep={smtpStep} />
            </FeatCard>

            {/* Bento Card 4: Location Heartbeat Widget */}
            <FeatCard
              title="Server Node Hub"
              description="Live telemetry, local host parameters, and network parameters."
              className="h-[215px]"
            >
              <HeartbeatWidget />
            </FeatCard>

          </div>
        </div>
      </div>
    </div>
  );
}
