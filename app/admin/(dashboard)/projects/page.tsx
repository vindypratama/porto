/**
 * app/admin/projects/page.tsx — Kelola data Project.
 * Tabel dengan urutan drag-friendly (via order field) + aksi edit/delete/toggle publish.
 */

import { getAllProjects } from "@/modules/projects";
import Link from "next/link";
import { Plus } from "lucide-react";
import ProjectActions from "./_components/ProjectActions";

async function getProjects() {
  return getAllProjects();
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="mt-1 text-sm text-slate-500">{projects.length} project ditemukan</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
        >
          <Plus size={15} />
          Project Baru
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-800/60 overflow-x-auto">
        {projects.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <p className="text-4xl mb-3">🏭</p>
            <p>Belum ada project. Data dari seed akan muncul setelah DB aktif.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800/60 bg-slate-900/60">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Domain</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Tech</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl shrink-0">{project.icon}</span>
                      <div>
                        <p className="font-medium text-slate-200">{project.title}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{project.subtitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wide">
                      {project.domain}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs text-slate-400 bg-slate-800 border border-slate-700/60 px-2 py-0.5 rounded-full">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs text-slate-600">+{project.tech.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        project.published
                          ? "bg-emerald-950/50 text-emerald-400 border border-emerald-500/20"
                          : "bg-slate-800 text-slate-500 border border-slate-700/40"
                      }`}
                    >
                      {project.published ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <ProjectActions projectId={project.id} published={project.published} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
