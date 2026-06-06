/**
 * ProjectCard — Case-study style card for featured projects.
 * Displays domain, title, description, key highlights, and tech badges.
 */

import TechStackBadge from "@/components/TechStackBadge";
import { ExternalLink, ChevronRight } from "lucide-react";
import Image from "next/image";

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

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
  /** Optional screenshot */
  imageUrl?: string;
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

      {/* Screenshot */}
      {project.imageUrl && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      )}

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
                <GithubIcon size={15} />
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
