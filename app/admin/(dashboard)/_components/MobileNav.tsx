"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu, X, Code2,
  LayoutDashboard, FolderKanban, FileText, PenSquare, Settings, Briefcase,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Dashboard",   href: "/admin",                icon: LayoutDashboard },
  { label: "Projects",    href: "/admin/projects",       icon: FolderKanban    },
  { label: "Blog Posts",  href: "/admin/posts",          icon: FileText        },
  { label: "Tulis Post",  href: "/admin/posts/new",      icon: PenSquare       },
  { label: "Experience",  href: "/admin/experience",      icon: Briefcase       },
  { label: "Settings",    href: "/admin/settings/about",  icon: Settings        },
];

interface MobileNavProps {
  userName: string;
  userInitial: string;
}

export default function MobileNav({ userName, userInitial }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — only visible below md */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-slate-900/80 backdrop-blur-sm border border-slate-800/60 text-slate-400 hover:text-white transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-screen w-64 flex flex-col border-r border-slate-800/60 bg-[#0c0c14] backdrop-blur-sm transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-800/60">
          <div className="flex items-center gap-2.5">
            <Code2 size={20} className="text-indigo-400" />
            <span className="font-bold text-white text-sm font-mono">Admin Panel</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all group"
            >
              <Icon size={16} className="group-hover:text-indigo-400 transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-slate-800/60">
          <div className="flex items-center gap-2.5 px-3 py-2">
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {userInitial}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">{userName}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
