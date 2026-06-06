/**
 * Navigation — sticky top bar with logo, nav links, and a CTA.
 * Now uses dynamic logo settings from database.
 */

"use client";

import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";
import Link from "next/link";
import { getIconComponent } from "@/lib/icon-resolver";

const NAV_LINKS = [
  { label: "About",      href: "#about",    external: false },
  { label: "Tech Stack", href: "#stack",    external: false },
  { label: "Projects",   href: "#projects", external: false },
  { label: "Blog",       href: "/blog",     external: true  },
  { label: "Contact",    href: "#contact",  external: false },
];

interface NavigationProps {
  logoIcon?: string;
  logoText?: string;
  logoImageUrl?: string | null;
}

export default function Navigation({
  logoIcon = "code-2",
  logoText = "<dev />",
  logoImageUrl = null,
}: NavigationProps) {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const LogoIcon = getIconComponent(logoIcon);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-[#0a0a0f]/90 backdrop-blur-md border-b border-slate-800/60 shadow-lg shadow-black/30"
          : "bg-transparent"}
      `}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-white font-bold text-lg hover:text-indigo-400 transition-colors"
            aria-label="Home"
          >
            {logoImageUrl ? (
              <img src={logoImageUrl} alt="Logo" className="h-6 w-auto" />
            ) : (
              <>
                <LogoIcon size={22} className="text-indigo-400" />
                <span className="font-mono tracking-tight">{logoText}</span>
              </>
            )}
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href, external }) => (
              <li key={href}>
                {external ? (
                  <Link
                    href={href}
                    className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-all"
                  >
                    {label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNav(href)}
                    className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-all"
                  >
                    {label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-800/60 mt-1">
            <ul className="flex flex-col gap-1 pt-3">
              {NAV_LINKS.map(({ label, href, external }) => (
                <li key={href}>
                  {external ? (
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
                    >
                      {label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNav(href)}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
                    >
                      {label}
                    </button>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
