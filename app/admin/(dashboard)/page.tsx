/**
 * app/admin/page.tsx — Dashboard utama admin.
 * Menampilkan statistik singkat: total post, project, draft.
 */

import { getBlogStats } from "@/modules/blog";
import { getProjectStats } from "@/modules/projects";
import { FileText, FolderKanban, Edit3, CheckCircle2, Settings } from "lucide-react";
import Link from "next/link";

async function getStats() {
  try {
    const [blogStats, projectStats] = await Promise.all([
      getBlogStats(),
      getProjectStats(),
    ]);
    return {
      totalPosts:      blogStats.totalPosts,
      publishedPosts:  blogStats.publishedPosts,
      draftPosts:      blogStats.draftPosts,
      totalProjects:   projectStats.totalProjects,
    };
  } catch {
    return { totalPosts: 0, publishedPosts: 0, draftPosts: 0, totalProjects: 0 };
  }
}

const QUICK_LINKS = [
  { label: "Tulis Artikel Baru", href: "/admin/posts/new",          icon: Edit3,        color: "from-indigo-500 to-purple-600"   },
  { label: "Kelola Blog Posts",  href: "/admin/posts",              icon: FileText,     color: "from-cyan-500 to-blue-600"       },
  { label: "Kelola Projects",    href: "/admin/projects",           icon: FolderKanban, color: "from-emerald-500 to-teal-600"    },
  { label: "Site Settings",      href: "/admin/settings/about",     icon: Settings,     color: "from-amber-500 to-orange-600"    },
];

export default async function AdminDashboard() {
  const stats = await getStats();

  const STAT_CARDS = [
    { label: "Total Artikel",      value: stats.totalPosts,      icon: FileText,      color: "text-indigo-400", bg: "bg-indigo-950/40 border-indigo-500/20" },
    { label: "Published",          value: stats.publishedPosts,  icon: CheckCircle2,  color: "text-emerald-400",bg: "bg-emerald-950/40 border-emerald-500/20"},
    { label: "Draft",              value: stats.draftPosts,      icon: Edit3,         color: "text-amber-400",  bg: "bg-amber-950/40 border-amber-500/20"   },
    { label: "Projects Aktif",     value: stats.totalProjects,   icon: FolderKanban,  color: "text-cyan-400",   bg: "bg-cyan-950/40 border-cyan-500/20"     },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Selamat datang di panel admin portfolio.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {STAT_CARDS.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className={`rounded-2xl border p-5 ${bg} transition-all duration-300 hover:-translate-y-0.5`}
          >
            <Icon size={20} className={`${color} mb-3`} />
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
        Aksi Cepat
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {QUICK_LINKS.map(({ label, href, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className={`group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br ${color} opacity-80 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5`}
          >
            <Icon size={22} className="text-white shrink-0" />
            <span className="text-sm font-semibold text-white">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
