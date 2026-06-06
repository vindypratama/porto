/**
 * TechStack — grouped skill categories with color-coded badges.
 * Now accepts dynamic data from database.
 */

import TechStackBadge from "@/components/TechStackBadge";
import { resolveIcon } from "@/lib/icon-resolver";
import type { TechStackGroupWithItems } from "@/modules/settings";

const COLOR_VARIANTS: Record<string, "indigo" | "cyan" | "emerald" | "amber" | "rose" | "violet" | "slate"> = {
  indigo: "indigo",
  cyan: "cyan",
  emerald: "emerald",
  amber: "amber",
  rose: "rose",
  violet: "violet",
  slate: "slate",
};

const COLOR_GRADIENTS: Record<string, string> = {
  indigo: "from-indigo-500/20 to-indigo-500/5",
  cyan: "from-cyan-500/20 to-cyan-500/5",
  emerald: "from-emerald-500/20 to-emerald-500/5",
  amber: "from-amber-500/20 to-amber-500/5",
  rose: "from-rose-500/20 to-rose-500/5",
  violet: "from-violet-500/20 to-violet-500/5",
  slate: "from-slate-500/20 to-slate-500/5",
};

interface TechStackProps {
  groups?: TechStackGroupWithItems[];
}

export default function TechStack({ groups = [] }: TechStackProps) {
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
          {groups.map((group) => {
            const variant = COLOR_VARIANTS[group.color] ?? "slate";
            const gradient = COLOR_GRADIENTS[group.color] ?? COLOR_GRADIENTS.slate;
            const iconResult = resolveIcon(group.items[0]?.icon ?? null);
            const GroupIcon = iconResult.type === "lucide" ? iconResult.component : null;

            return (
              <div
                key={group.id}
                className={`
                  relative rounded-2xl p-6 card-glass
                  bg-gradient-to-br ${gradient}
                  transition-all duration-300 hover:-translate-y-1 hover:glow-accent
                `}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-slate-800/80 text-indigo-400">
                    {GroupIcon && <GroupIcon size={20} />}
                  </div>
                  <h3 className="text-base font-bold text-white">{group.name}</h3>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <TechStackBadge key={item.id} label={item.name} variant={variant} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
