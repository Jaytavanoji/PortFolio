"use client";

import React, { useState } from "react";
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
} from "lucide-react";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: "success",
          message:
            "Your message was sent directly to my inbox! I will get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFeedback({
          type: "error",
          message:
            data.error || "Failed to send message. Please try again or email directly.",
        });
      }
    } catch (err) {
      setFeedback({
        type: "error",
        message: "An unexpected network error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050608] text-[#F5F5F5] pb-32 pt-12 sm:pt-20 px-4 sm:px-8 md:px-14 flex flex-col items-center overflow-hidden">
      {/* ── ATMOSPHERIC HERO-FRAME MATCHED AMBIENT GLOWS ── */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,_rgba(28,34,56,0.5),_transparent_65%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_35%,_rgba(255,77,31,0.06),_transparent_45%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#030305]/70 to-[#020203]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl flex flex-col gap-12 sm:gap-16">
        {/* ── TOP EDITORIAL HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-white">
              LET&apos;S <span className="text-[#FF4D1F]">BUILD SOMETHING.</span>
            </h1>
          </div>
          <span className="text-xs font-mono tracking-widest uppercase text-[#8A8A8A]">
            Inquiries · Collaboration · Opportunities
          </span>
        </div>

        {/* ── TWO-COLUMN CONTACT LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Have an idea, project, or opportunity?
              </h2>
              <p className="text-sm sm:text-base text-[#A1A1AA] font-light leading-relaxed">
                Whether you’re looking to build high-performance backend systems, explore AI/RAG integrations, or talk software engineering, I’m always open to discussing new challenges.
              </p>
            </div>

            {/* Contact Channels Card */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] font-bold text-[#8A8A8A] tracking-wider uppercase">
                  DIRECT EMAIL
                </span>
                <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-black/60 border border-white/10">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail className="w-4 h-4 text-[#FF4D1F] shrink-0" />
                    <span className="text-xs sm:text-sm font-mono text-white truncate">
                      {emailAddress}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-[#FF4D1F] text-white transition-all shrink-0"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] font-bold text-[#8A8A8A] tracking-wider uppercase">
                  LOCATION
                </span>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/60 border border-white/10 text-xs sm:text-sm text-white font-mono">
                  <MapPin className="w-4 h-4 text-[#FF4D1F] shrink-0" />
                  <span>Pune, Maharashtra, India</span>
                </div>
              </div>

              {/* Socials */}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                <span className="font-mono text-[10px] font-bold text-[#8A8A8A] tracking-wider uppercase">
                  SOCIAL PROFILES
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/jay-tavanoji-4606b93b9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 hover:border-[#FF4D1F]/50 text-white text-xs font-mono transition-all"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#FF4D1F]" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/Jaytavanoji"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 hover:border-[#FF4D1F]/50 text-white text-xs font-mono transition-all"
                  >
                    <Github className="w-3.5 h-3.5 text-[#FF4D1F]" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Dark Contact Form with Gmail SMTP */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  Send a Direct Message
                </h3>
                <span className="text-xs font-mono text-[#FF4D1F] font-bold">
                  DIRECT TO INBOX
                </span>
              </div>

              {/* Status feedback Banner */}
              {feedback && (
                <div
                  className={`p-4 rounded-xl flex items-start gap-3 border text-xs sm:text-sm font-sans ${
                    feedback.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                  }`}
                >
                  {feedback.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] font-bold text-[#8A8A8A] uppercase tracking-wider">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-[#FF4D1F] focus:outline-none text-white text-sm transition-all disabled:opacity-50"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] font-bold text-[#8A8A8A] uppercase tracking-wider">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-[#FF4D1F] focus:outline-none text-white text-sm transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] font-bold text-[#8A8A8A] uppercase tracking-wider">
                  SUBJECT
                </label>
                <input
                  type="text"
                  required
                  placeholder="Backend Project / Internship Inquiry"
                  disabled={isSubmitting}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-[#FF4D1F] focus:outline-none text-white text-sm transition-all disabled:opacity-50"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] font-bold text-[#8A8A8A] uppercase tracking-wider">
                  MESSAGE
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project, goals, or inquiry..."
                  disabled={isSubmitting}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-[#FF4D1F] focus:outline-none text-white text-sm transition-all resize-none disabled:opacity-50"
                />
              </div>

              {/* Submit CTA */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#FF4D1F] hover:bg-[#E63E12] disabled:bg-[#FF4D1F]/50 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
