/**
 * Hero — full-viewport landing section.
 * Animated headline, sub-headline, CTA buttons, and a subtle grid background.
 */

import { ArrowDown, Download, Briefcase } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
    >
      {/* ── Background decorations ──────────────────────────── */}
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Radial glow top-left */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle at center, #6366f1 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Radial glow bottom-right */}
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle at center, #06b6d4 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Pill label */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/50 px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
          </span>
          <span className="text-xs font-medium text-indigo-300 tracking-wide">
            Available for freelance & full-time roles
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white">
          Software{" "}
          <span className="text-gradient">Engineer</span>
          <br />
          &amp; System Architect
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed">
          Over <span className="text-slate-200 font-medium">10 years of experience</span> building{" "}
          <span className="text-slate-200 font-medium">enterprise-grade applications</span>,{" "}
          <span className="text-slate-200 font-medium">secure REST APIs</span>, and{" "}
          <span className="text-slate-200 font-medium">Industrial IoT systems</span>
          — from sensor to dashboard.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="
              inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
              bg-indigo-600 hover:bg-indigo-500
              text-white font-semibold text-sm
              transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25
              hover:-translate-y-0.5
            "
          >
            <Briefcase size={16} />
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download
            className="
              inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
              border border-slate-700 hover:border-slate-500
              text-slate-300 hover:text-white font-semibold text-sm
              bg-slate-900/50 hover:bg-slate-800/60
              transition-all duration-200 hover:-translate-y-0.5
            "
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>

        {/* Scroll cue */}
        <div className="mt-20 flex justify-center animate-bounce">
          <a href="#stack" aria-label="Scroll down">
            <ArrowDown size={20} className="text-slate-600 hover:text-slate-400 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}
