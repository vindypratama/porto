/**
 * app/page.tsx — Root page.
 *
 * Composes the single-page portfolio in section order:
 *   Navigation → Hero → TechStack → Projects → Contact → Footer
 *
 * All sections are Server Components (no "use client" needed here).
 * The Navigation component handles its own client interactivity.
 * Now fetches dynamic data from database via service layer.
 */

import { cache } from "react";
import Navigation from "@/components/Navigation";
import Hero       from "@/components/Hero";
import TechStack  from "@/components/TechStack";
import Projects   from "@/modules/projects/components/Projects";
import Contact    from "@/components/Contact";
import Footer     from "@/components/Footer";
import { getSettingsWithFallback, getTechStackWithFallback } from "@/modules/settings";

const getCachedSettings = cache(async () => getSettingsWithFallback());
const getCachedTechStack = cache(async () => getTechStackWithFallback());

export default async function Home() {
  const [settings, techStack] = await Promise.all([
    getCachedSettings(),
    getCachedTechStack(),
  ]);

  return (
    <>
      {/* Sticky top navigation bar */}
      <Navigation
        logoIcon={settings.logoIcon}
        logoText={settings.logoText}
        logoImageUrl={settings.logoImageUrl}
      />

      <main>
        {/* 1 ── Hero / Landing */}
        <Hero
          headline={settings.heroHeadline}
          description={settings.heroDescription}
          availability={settings.heroAvailability}
          resumeUrl={settings.heroResumeUrl}
          ctaPrimary={settings.heroCtaPrimary}
          ctaSecondary={settings.heroCtaSecondary}
        />

        {/* 2 ── Tech Stack & Engineering Philosophy */}
        <TechStack groups={techStack} />

        {/* 3 ── Featured Projects (Case Studies) */}
        <Projects />

        {/* 4 ── Contact / CTA */}
        <Contact
          heading={settings.contactHeading}
          description={settings.contactDescription}
          email={settings.contactEmail}
          linkedIn={settings.contactLinkedIn}
          additionalLinks={
            Array.isArray(settings.additionalContactLinks)
              ? (settings.additionalContactLinks as Array<{ label: string; url: string; icon: string }>)
              : []
          }
        />
      </main>

      {/* Site footer */}
      <Footer
        logoIcon={settings.logoIcon}
        logoText={settings.logoText}
        logoImageUrl={settings.logoImageUrl}
      />
    </>
  );
}
