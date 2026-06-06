/**
 * app/admin/(dashboard)/layout.tsx — Layout untuk halaman /admin/* (kecuali login).
 *
 * Berisi sidebar navigasi + header dengan info user & tombol logout.
 * Session dicek di sini; jika tidak ada redirect ke login.
 * Login page berada di luar layout ini (route group terpisah).
 */

import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  LogOut,
  Code2,
  PenSquare,
  Settings,
  Briefcase,
} from "lucide-react";
import MobileNav from "./_components/MobileNav";

const SIDEBAR_LINKS = [
  { label: "Dashboard",  href: "/admin",              icon: LayoutDashboard },
  { label: "Projects",   href: "/admin/projects",     icon: FolderKanban    },
  { label: "Blog Posts", href: "/admin/posts",         icon: FileText        },
  { label: "Tulis Post", href: "/admin/posts/new",     icon: PenSquare       },
  { label: "Experience", href: "/admin/experience",     icon: Briefcase       },
  { label: "Settings",   href: "/admin/settings/about", icon: Settings       },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Mobile nav */}
      <MobileNav
        userName={session.user?.name ?? "Admin"}
        userInitial={session.user?.name?.[0]?.toUpperCase() ?? "A"}
      />

      {/* ── Sidebar (desktop only) ─────────────────────────── */}
      <aside className="hidden md:flex md:flex-col w-56 shrink-0 border-r border-slate-800/60 bg-slate-900/40 backdrop-blur-sm sticky top-0 h-screen">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-slate-800/60">
          <Code2 size={20} className="text-indigo-400" />
          <span className="font-bold text-white text-sm font-mono">Admin Panel</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
          {SIDEBAR_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all group"
            >
              <Icon size={16} className="group-hover:text-indigo-400 transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-3 border-t border-slate-800/60">
          <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {session.user?.name?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">{session.user?.name}</p>
              <p className="text-xs text-slate-600 truncate">{session.user?.email}</p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-all"
            >
              <LogOut size={15} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────── */}
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
