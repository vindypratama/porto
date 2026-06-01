/**
 * app/page.tsx — Root page.
 *
 * Composes the single-page portfolio in section order:
 *   Navigation → Hero → TechStack → Projects → Contact → Footer
 *
 * All sections are Server Components (no "use client" needed here).
 * The Navigation component handles its own client interactivity.
 */

import Navigation from "@/components/Navigation";
import Hero       from "@/components/Hero";
import TechStack  from "@/components/TechStack";
import Projects   from "@/modules/projects/components/Projects";
import Contact    from "@/components/Contact";
import Footer     from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Sticky top navigation bar */}
      <Navigation />

      <main>
        {/* 1 ── Hero / Landing */}
        <Hero />

        {/* 2 ── Tech Stack & Engineering Philosophy */}
        <TechStack />

        {/* 3 ── Featured Projects (Case Studies) */}
        <Projects />

        {/* 4 ── Contact / CTA */}
        <Contact />
      </main>

      {/* Site footer */}
      <Footer />
    </>
  );
}
