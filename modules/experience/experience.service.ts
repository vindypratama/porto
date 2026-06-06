import * as expRepo from "./experience.repository";

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  impact: string;
  current: boolean;
  sortOrder: number;
}

const FALLBACK_EXPERIENCE: ExperienceEntry[] = [
  {
    id: "fallback-1",
    role: "Software Engineer & System Architect",
    company: "Kompas Gramedia",
    duration: "2022 — Present",
    description: "Building large-scale B2B e-commerce systems and Industrial IoT platforms for Indonesia's largest media group.",
    impact: "Architected SIPLah (national school procurement platform) serving thousands of schools, and built real-time IoT energy monitoring dashboards across production facilities.",
    current: true,
    sortOrder: 1,
  },
];

export async function getPublishedExperience(): Promise<ExperienceEntry[]> {
  try {
    const rows = await expRepo.findManyExperience({
      orderBy: { sortOrder: "asc" },
    });
    return rows.map((e) => ({
      id:          e.id,
      role:        e.role,
      company:     e.company,
      duration:    e.duration,
      description: e.description,
      impact:      e.impact,
      current:     e.current,
      sortOrder:   e.sortOrder,
    }));
  } catch {
    console.warn("[Experience Service] Database tidak tersedia, menggunakan data fallback.");
    return FALLBACK_EXPERIENCE;
  }
}

export async function getAllExperience() {
  try {
    return await expRepo.findManyExperience({
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getExperienceById(id: string) {
  return expRepo.findUniqueExperience(id);
}

export async function createExperience(data: Record<string, unknown>) {
  return expRepo.createExperience(data);
}

export async function updateExperience(
  id: string,
  data: Record<string, unknown>,
) {
  return expRepo.updateExperience(id, data);
}

export async function deleteExperience(id: string) {
  return expRepo.deleteExperience(id);
}
