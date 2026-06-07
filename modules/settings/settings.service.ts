import type { Prisma } from "@prisma/client";
import * as settingsRepo from "./settings.repository";

const DEFAULT_SETTINGS = {
  id:                     "singleton",
  heroName:               "Vindy Pratama",
  heroHeadline:           "Software Engineer & System Architect",
  heroDescription:        "Over 10 years of experience building enterprise-grade applications, secure REST APIs, and Industrial IoT systems — from sensor to dashboard.",
  heroAvailability:       "Available for freelance & full-time roles",
  heroResumeUrl:          "/resume.pdf",
  heroCtaPrimary:         "View Projects",
  heroCtaSecondary:       "Download Resume",
  aboutBio:               "",
  aboutImage:             null as string | null,
  aboutFocus:             "",
  aboutPersonalTouch:     "",
  contactHeading:         "Let's Work Together",
  contactDescription:     "Whether it's a greenfield enterprise system, a hardware integration challenge, or modernizing a legacy platform — I'm open to meaningful conversations.",
  contactEmail:           "vindypratama8@gmail.com",
  contactLinkedIn:        "https://www.linkedin.com/in/vindypratama",
  contactGitHub:          "https://github.com/vindypratama",
  additionalContactLinks: [] as Prisma.JsonValue,
  logoIcon:               "code-2",
  logoText:               "<dev />",
  logoImageUrl:           null as string | null,
  showHero:               true,
  showAbout:              true,
  showTechStack:          true,
  showProjects:           true,
  showExperience:         true,
  showContact:            true,
  createdAt:              new Date(),
  updatedAt:              new Date(),
};

export async function getSettingsWithFallback() {
  try {
    const settings = await settingsRepo.getSiteSettings();
    if (!settings) return DEFAULT_SETTINGS;

    // logoImageUrl: hanya terima data URL (base64) atau URL eksternal.
    // Path lokal lama (e.g. /uploads/...) dianggap invalid karena file
    // tidak persisten di standalone mode.
    const logoImageUrl =
      settings.logoImageUrl &&
      (settings.logoImageUrl.startsWith("data:") || settings.logoImageUrl.startsWith("http"))
        ? settings.logoImageUrl
        : null;

    return { ...settings, logoImageUrl };
  } catch {
    console.warn("[Settings Service] Database tidak tersedia, menggunakan data fallback.");
    return DEFAULT_SETTINGS;
  }
}

export async function updateSettings(
  data: Prisma.SiteSettingsUpdateInput,
) {
  return settingsRepo.upsertSiteSettings(data);
}
