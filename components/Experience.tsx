/**
 * Experience — Work history section with download CV button.
 */

import { Download, Briefcase } from "lucide-react";
import type { ExperienceEntry } from "@/modules/experience";

interface ExperienceProps {
  entries?: ExperienceEntry[];
  resumeUrl?: string;
}

export default function Experience({
  entries = [],
  resumeUrl = "/resume.pdf",
}: ExperienceProps) {
  if (entries.length === 0) return null;

  return (
    <section id="experience" className="relative py-28 px-4">
      {/* Divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 opacity-40"
        style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Career Path
          </span>
          <h2 className="mt-3 text-4xl font-bold text-white">
            Work <span className="text-gradient">Experience</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-8">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="relative pl-8 border-l-2 border-slate-800/60"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-indigo-500 bg-[#0a0a0f]" />

              <div className="card-glass rounded-2xl p-6">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{entry.role}</h3>
                  {entry.current && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-500/20">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-indigo-400 mb-3">
                  <Briefcase size={14} />
                  <span className="font-medium">{entry.company}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500">{entry.duration}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-3">
                  {entry.description}
                </p>
                {entry.impact && (
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">
                    {entry.impact}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Download CV */}
        <div className="mt-12 text-center">
          <a
            href={resumeUrl}
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-sm bg-slate-900/50 hover:bg-slate-800/60 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
