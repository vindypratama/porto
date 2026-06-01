/**
 * Footer — minimal bottom strip with copyright and nav shortcuts.
 */

import { Code2 } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/60 py-8 px-4">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <Code2 size={16} className="text-indigo-500" />
          <span className="font-mono">
            &lt;dev /&gt;
          </span>
          <span className="text-slate-600">·</span>
          <span>© {year} All rights reserved.</span>
        </div>

        {/* Quick nav */}
        <nav className="flex gap-5">
          {["About", "Tech Stack", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
