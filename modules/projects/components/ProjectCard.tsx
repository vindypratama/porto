/**
 * ProjectCard — Case-study style card for featured projects.
 * Displays domain, title, description, key highlights, and tech badges.
 */

import TechStackBadge from "@/components/TechStackBadge";
import { ExternalLink, Github, ChevronRight } from "lucide-react";

export interface Project {
  domain: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tech: string[];
  /** Optional links */
  liveUrl?: string;
  githubUrl?: string;
  /** Visual accent color class for the top border: e.g. "from-indigo-500 to-cyan-500" */
  gradient: string;
  /** Icon component or emoji for the domain */
  icon: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article
      className="
        group relative flex flex-col rounded-2xl overflow-hidden
        card-glass hover:glow-accent
        transition-all duration-300 hover:-translate-y-1
      "
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Gradient top-border accent */}
      <div
        className={`h-0.5 w-full bg-gradient-to-r ${project.gradient}`}
      />

      <div className="flex flex-col gap-4 p-6 flex-1">
        {/* Domain badge + links */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">
              {project.icon}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              {project.domain}
            </span>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub — ${project.title}`}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
              >
                <Github size={15} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo — ${project.title}`}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-white leading-snug">
            {project.title}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-slate-400">
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="flex flex-col gap-1.5 mt-1">
          {project.highlights.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-slate-300">
              <ChevronRight
                size={14}
                className="mt-0.5 shrink-0 text-indigo-400"
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-slate-800/60">
          {project.tech.map((t) => (
            <TechStackBadge key={t} label={t} variant="slate" />
          ))}
        </div>
      </div>
    </article>
  );
}
