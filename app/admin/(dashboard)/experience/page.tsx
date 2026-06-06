/**
 * app/admin/experience/page.tsx — Daftar experience entries.
 */

import { getAllExperience, type ExperienceEntry } from "@/modules/experience";
import Link from "next/link";
import { Plus, Briefcase } from "lucide-react";
import ExperienceActions from "./_components/ExperienceActions";

export default async function AdminExperiencePage() {
  const entries: ExperienceEntry[] = await getAllExperience() as ExperienceEntry[];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Experience</h1>
          <p className="mt-1 text-sm text-slate-500">{entries.length} entri ditemukan</p>
        </div>
        <Link
          href="/admin/experience/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
        >
          <Plus size={15} />
          Tambah Experience
        </Link>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {entries.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <p className="text-4xl mb-3">💼</p>
            <p>Belum ada experience. Tambahkan pengalaman kerja pertama.</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-5 flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase size={16} className="text-indigo-400 shrink-0" />
                  <h3 className="font-semibold text-white truncate">{entry.role}</h3>
                  {entry.current && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-500/20">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-indigo-400">{entry.company} • {entry.duration}</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{entry.description}</p>
              </div>
              <ExperienceActions experienceId={entry.id} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
