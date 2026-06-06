import type { Prisma } from "@prisma/client";
import * as settingsRepo from "./settings.repository";

const DEFAULT_SETTINGS = {
  id:                   "singleton",
  heroHeadline:         "Software Engineer & System Architect",
  heroDescription:      "Over 10 years of experience building enterprise-grade applications, secure REST APIs, and Industrial IoT systems — from sensor to dashboard.",
  heroAvailability:     "Available for freelance & full-time roles",
  heroResumeUrl:        "/resume.pdf",
  heroCtaPrimary:       "View Projects",
  heroCtaSecondary:     "Download Resume",
  contactHeading:       "Let's Work Together",
  contactDescription:   "Whether it's a greenfield enterprise system, a hardware integration challenge, or modernizing a legacy platform — I'm open to meaningful conversations.",
  contactEmail:         "vindypratama8@gmail.com",
  contactLinkedIn:      "https://www.linkedin.com/in/vindypratama",
  additionalContactLinks: [] as Prisma.JsonValue,
  logoIcon:             "code-2",
  logoText:             "<dev />",
  logoImageUrl:         null as string | null,
  createdAt:            new Date(),
  updatedAt:            new Date(),
};

export async function getSettingsWithFallback() {
  try {
    const settings = await settingsRepo.getSiteSettings();
    return settings ?? DEFAULT_SETTINGS;
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
