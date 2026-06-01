/**
 * components/Projects.tsx — Featured projects section.
 * Data diambil dari PostgreSQL via Prisma (React Server Component).
 * Fallback ke data statis jika database belum tersedia.
 */

import ProjectCard, { type Project } from "@/modules/projects/components/ProjectCard";
import { getPublishedProjects } from "@/modules/projects/project.service";

export default async function Projects() {
  const projects = await getPublishedProjects();

  return (
    <section id="projects" className="relative py-28 px-4">
      {/* Divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 opacity-40"
        style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Case Studies
          </span>
          <h2 className="mt-3 text-4xl font-bold text-white">
            Featured{" "}
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-slate-400">
            Production systems designed for scale, reliability, and real-world complexity
            — from oil fields to school procurement.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
