/**
 * Contact — minimal contact / CTA section.
 */

import { Mail, Linkedin, ArrowUpRight } from "lucide-react";

const SOCIALS = [
  {
    label: "Email",
    href: "mailto:vindypratama8@gmail.com",
    icon: <Mail size={18} />,
    display: "vindypratama8@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vindypratama",
    icon: <Linkedin size={18} />,
    display: "linkedin.com/in/vindypratama",
  },
];

export default function Contact() {
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
          Let&apos;s{" "}
          <span className="text-gradient">Work Together</span>
        </h2>
        <p className="mt-5 text-slate-400 text-lg leading-relaxed max-w-xl mx-auto">
          Whether it&apos;s a greenfield enterprise system, a hardware integration challenge,
          or modernizing a legacy platform — I&apos;m open to meaningful conversations.
        </p>

        {/* Primary CTA */}
        <a
          href="mailto:vindypratama8@gmail.com"
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
          {SOCIALS.map(({ label, href, icon, display }) => (
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
