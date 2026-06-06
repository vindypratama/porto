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
import About      from "@/components/About";
import TechStack  from "@/components/TechStack";
import Projects   from "@/modules/projects/components/Projects";
import Experience from "@/components/Experience";
import Contact    from "@/components/Contact";
import Footer     from "@/components/Footer";
import { getSettingsWithFallback, getTechStackWithFallback } from "@/modules/settings";
import { getPublishedExperience } from "@/modules/experience";

const getCachedSettings = cache(async () => getSettingsWithFallback());
const getCachedTechStack = cache(async () => getTechStackWithFallback());
const getCachedExperience = cache(async () => getPublishedExperience());

export default async function Home() {
  const [settings, techStack, experience] = await Promise.all([
    getCachedSettings(),
    getCachedTechStack(),
    getCachedExperience(),
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
        {settings.showHero && (
          <Hero
            heroName={settings.heroName}
            headline={settings.heroHeadline}
            description={settings.heroDescription}
            availability={settings.heroAvailability}
            resumeUrl={settings.heroResumeUrl}
            ctaPrimary={settings.heroCtaPrimary}
            ctaSecondary={settings.heroCtaSecondary}
          />
        )}

        {/* 2 ── About Me */}
        {settings.showAbout && (
          <About
            bio={settings.aboutBio}
            image={settings.aboutImage ?? undefined}
            focus={settings.aboutFocus}
            personalTouch={settings.aboutPersonalTouch}
          />
        )}

        {/* 3 ── Tech Stack & Engineering Philosophy */}
        {settings.showTechStack && (
          <TechStack groups={techStack} />
        )}

        {/* 4 ── Featured Projects (Case Studies) */}
        {settings.showProjects && (
          <Projects />
        )}

        {/* 5 ── Experience */}
        {settings.showExperience && (
          <Experience
            entries={experience}
            resumeUrl={settings.heroResumeUrl}
          />
        )}

        {/* 6 ── Contact / CTA */}
        {settings.showContact && (
          <Contact
            heading={settings.contactHeading}
            description={settings.contactDescription}
            email={settings.contactEmail}
            linkedIn={settings.contactLinkedIn}
            gitHub={settings.contactGitHub}
            additionalLinks={
              Array.isArray(settings.additionalContactLinks)
                ? (settings.additionalContactLinks as Array<{ label: string; url: string; icon: string }>)
                : []
            }
          />
        )}
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
