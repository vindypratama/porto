/**
 * Contact — minimal contact / CTA section.
 * Now accepts dynamic data from SiteSettings.
 */

import { Mail, ArrowUpRight } from "lucide-react";
import { resolveIcon } from "@/lib/icon-resolver";

interface ContactLink {
  label: string;
  url: string;
  icon: string;
}

interface ContactProps {
  heading?: string;
  description?: string;
  email?: string;
  linkedIn?: string;
  gitHub?: string;
  additionalLinks?: ContactLink[];
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export default function Contact({
  heading = "Let's Work Together",
  description = "Whether it's a greenfield enterprise system, a hardware integration challenge, or modernizing a legacy platform — I'm open to meaningful conversations.",
  email = "vindypratama8@gmail.com",
  linkedIn = "https://www.linkedin.com/in/vindypratama",
  gitHub,
  additionalLinks = [],
}: ContactProps) {
  const socials = [
    {
      label: "Email",
      href: `mailto:${email}`,
      icon: <Mail size={18} />,
      display: email,
    },
    {
      label: "LinkedIn",
      href: linkedIn,
      icon: <LinkedinIcon size={18} />,
      display: linkedIn.replace(/^https?:\/\/(www\.)?/, ""),
    },
    ...(gitHub
      ? [
          {
            label: "GitHub",
            href: gitHub,
            icon: <GithubIcon size={18} />,
            display: gitHub.replace(/^https?:\/\/(www\.)?/, ""),
          },
        ]
      : []),
    ...additionalLinks.map((link) => {
      const iconResult = resolveIcon(link.icon);
      const IconComp = iconResult.type === "lucide" ? iconResult.component : null;
      return {
        label: link.label,
        href: link.url,
        icon: iconResult.type === "emoji"
          ? <span>{iconResult.emoji}</span>
          : IconComp ? <IconComp size={18} /> : null,
        display: link.url.replace(/^https?:\/\/(www\.)?/, ""),
      };
    }),
  ];

  return (
    <section id="contact" className="relative py-28 px-4">
      {/* Divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 opacity-40"
        style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Get In Touch
        </span>
        <h2 className="mt-3 text-4xl font-bold text-white">
          {heading.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-gradient">{heading.split(" ").slice(-1)}</span>
        </h2>
        <p className="mt-5 text-slate-400 text-lg leading-relaxed max-w-xl mx-auto">
          {description}
        </p>

        {/* Primary CTA */}
        <a
          href={`mailto:${email}`}
          className="
            mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl
            bg-indigo-600 hover:bg-indigo-500
            text-white font-semibold
            transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30
            hover:-translate-y-0.5
          "
        >
          <Mail size={18} />
          Send me a message
          <ArrowUpRight size={16} />
        </a>

        {/* Social links */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {socials.map(({ label, href, icon, display }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="
                flex items-center gap-2.5 px-5 py-3 rounded-xl
                card-glass text-slate-400 hover:text-white
                transition-all duration-200 hover:-translate-y-0.5 hover:glow-accent
                text-sm
              "
            >
              <span className="text-indigo-400">{icon}</span>
              {display}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
