/**
 * TechStack — grouped skill categories with color-coded badges.
 * Displays engineering philosophy alongside each group.
 */

import TechStackBadge from "@/components/TechStackBadge";
import { Server, Monitor, Database, Radio } from "lucide-react";

interface SkillGroup {
  category: string;
  description: string;
  icon: React.ReactNode;
  skills: Array<{ label: string; variant: "indigo" | "cyan" | "emerald" | "amber" | "rose" | "violet" | "slate" }>;
  gradient: string;
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Backend & APIs",
    description:
      "Designing high-throughput services with clean architecture principles. Secure REST APIs with JWT authentication, dynamic RBAC, and MVC patterns for enterprise systems.",
    icon: <Server size={20} />,
    gradient: "from-indigo-500/20 to-indigo-500/5",
    skills: [
      { label: "Golang", variant: "cyan" },
      { label: "Node.js", variant: "emerald" },
      { label: "PHP", variant: "indigo" },
      { label: "REST API", variant: "indigo" },
      { label: "JWT Auth", variant: "violet" },
      { label: "RBAC", variant: "amber" },
      { label: "MVC", variant: "slate" },
      { label: "Clean Architecture", variant: "violet" },
    ],
  },
  {
    category: "Infrastructure & DevOps",
    description:
      "Managing Linux server environments, configuring Nginx & Apache for reverse proxy, and deploying containerized applications for high availability.",
    icon: <Monitor size={20} />,
    gradient: "from-cyan-500/20 to-cyan-500/5",
    skills: [
      { label: "Linux", variant: "slate" },
      { label: "Nginx", variant: "emerald" },
      { label: "Apache", variant: "rose" },
      { label: "Docker", variant: "cyan" },
      { label: "Edge Computing", variant: "violet" },
      { label: "Server Admin", variant: "slate" },
    ],
  },
  {
    category: "Database Engineering",
    description:
      "Designing advanced relational database schemas, optimizing complex queries, and managing time-series data for monitoring ecosystems.",
    icon: <Database size={20} />,
    gradient: "from-emerald-500/20 to-emerald-500/5",
    skills: [
      { label: "MySQL", variant: "emerald" },
      { label: "PostgreSQL", variant: "emerald" },
      { label: "TimescaleDB", variant: "cyan" },
      { label: "Schema Design", variant: "amber" },
      { label: "Query Optimization", variant: "slate" },
      { label: "Redis", variant: "rose" },
    ],
  },
  {
    category: "IoT & Integration",
    description:
      "Building real-time data acquisition systems with Modbus protocol, PLC integration, and high-concurrency WebSocket dashboards for industrial monitoring.",
    icon: <Radio size={20} />,
    gradient: "from-amber-500/20 to-amber-500/5",
    skills: [
      { label: "Modbus TCP/RTU", variant: "amber" },
      { label: "PLC Integration", variant: "rose" },
      { label: "WebSocket", variant: "cyan" },
      { label: "Real-Time Streaming", variant: "violet" },
      { label: "Time-Series Data", variant: "emerald" },
      { label: "High Concurrency", variant: "slate" },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="stack" className="relative py-28 px-4">
      {/* Subtle section divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 opacity-40"
        style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Engineering Capabilities
          </span>
          <h2 className="mt-3 text-4xl font-bold text-white">
            Tech Stack &amp;{" "}
            <span className="text-gradient">Philosophy</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-slate-400">
            A curated set of tools chosen for reliability, performance, and long-term
            maintainability in production systems.
          </p>
        </div>

        {/* Skill grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className={`
                relative rounded-2xl p-6 card-glass
                bg-gradient-to-br ${group.gradient}
                transition-all duration-300 hover:-translate-y-1 hover:glow-accent
              `}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-slate-800/80 text-indigo-400">
                  {group.icon}
                </div>
                <h3 className="text-base font-bold text-white">{group.category}</h3>
              </div>

              {/* Philosophy blurb */}
              <p className="text-sm text-slate-400 leading-relaxed mb-5">
                {group.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map(({ label, variant }) => (
                  <TechStackBadge key={label} label={label} variant={variant} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
