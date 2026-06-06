import Link from "next/link";
import { User, Layers, Mail, Image } from "lucide-react";

const SETTINGS_TABS = [
  { label: "About",      href: "/admin/settings/about",      icon: User   },
  { label: "Tech Stack", href: "/admin/settings/tech-stack",  icon: Layers },
  { label: "Contact",    href: "/admin/settings/contact",     icon: Mail   },
  { label: "Logo",       href: "/admin/settings/logo",        icon: Image  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Site Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Kelola konten portfolio kamu dari sini.</p>
      </div>

      {/* Tab navigation */}
      <nav className="flex gap-1 mb-8 border-b border-slate-800/60 pb-px overflow-x-auto">
        {SETTINGS_TABS.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-indigo-500/50 transition-all"
          >
            <Icon size={14} />
            {label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}
