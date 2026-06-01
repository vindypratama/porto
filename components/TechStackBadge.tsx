/**
 * TechStackBadge — renders a single technology badge with an optional icon.
 * Used in both the Tech Stack section and inside Project Cards.
 */

interface TechStackBadgeProps {
  label: string;
  /** Tailwind color variant: "indigo" | "cyan" | "emerald" | "amber" | "rose" | "violet" */
  variant?: "indigo" | "cyan" | "emerald" | "amber" | "rose" | "violet" | "slate";
}

const variantStyles: Record<NonNullable<TechStackBadgeProps["variant"]>, string> = {
  indigo: "bg-indigo-950/70 text-indigo-300 border-indigo-800/50 hover:border-indigo-500/70",
  cyan:   "bg-cyan-950/70   text-cyan-300   border-cyan-800/50   hover:border-cyan-500/70",
  emerald:"bg-emerald-950/70 text-emerald-300 border-emerald-800/50 hover:border-emerald-500/70",
  amber:  "bg-amber-950/70  text-amber-300  border-amber-800/50  hover:border-amber-500/70",
  rose:   "bg-rose-950/70   text-rose-300   border-rose-800/50   hover:border-rose-500/70",
  violet: "bg-violet-950/70 text-violet-300 border-violet-800/50 hover:border-violet-500/70",
  slate:  "bg-slate-800/60  text-slate-300  border-slate-700/50  hover:border-slate-500/70",
};

export default function TechStackBadge({
  label,
  variant = "slate",
}: TechStackBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-full
        text-xs font-medium border
        transition-all duration-200
        ${variantStyles[variant]}
      `}
    >
      {label}
    </span>
  );
}
