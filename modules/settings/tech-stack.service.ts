import type { TechStackGroup, TechStackItem } from "@prisma/client";
import * as techStackRepo from "./tech-stack.repository";
import type { TechStackGroupWithItems } from "./tech-stack.repository";

interface FallbackSkill {
  label: string;
  icon: string;
}

interface FallbackGroup {
  name: string;
  color: string;
  skills: FallbackSkill[];
}

const FALLBACK_TECH_STACK: FallbackGroup[] = [
  {
    name: "Backend & APIs",
    color: "indigo",
    skills: [
      { label: "Golang", icon: "server" },
      { label: "Node.js", icon: "server" },
      { label: "PHP", icon: "server" },
      { label: "REST API", icon: "api" },
      { label: "JWT Auth", icon: "key" },
      { label: "RBAC", icon: "shield" },
      { label: "MVC", icon: "layers" },
      { label: "Clean Architecture", icon: "boxes" },
    ],
  },
  {
    name: "Infrastructure & DevOps",
    color: "cyan",
    skills: [
      { label: "Linux", icon: "terminal" },
      { label: "Nginx", icon: "server" },
      { label: "Apache", icon: "server" },
      { label: "Docker", icon: "container" },
      { label: "Edge Computing", icon: "cpu" },
      { label: "Server Admin", icon: "settings" },
    ],
  },
  {
    name: "Database Engineering",
    color: "emerald",
    skills: [
      { label: "MySQL", icon: "database" },
      { label: "PostgreSQL", icon: "database" },
      { label: "TimescaleDB", icon: "database" },
      { label: "Schema Design", icon: "layout" },
      { label: "Query Optimization", icon: "zap" },
      { label: "Redis", icon: "database" },
    ],
  },
  {
    name: "IoT & Integration",
    color: "amber",
    skills: [
      { label: "Modbus TCP/RTU", icon: "radio" },
      { label: "PLC Integration", icon: "cpu" },
      { label: "WebSocket", icon: "radio" },
      { label: "Real-Time Streaming", icon: "activity" },
      { label: "Time-Series Data", icon: "clock" },
      { label: "High Concurrency", icon: "gauge" },
    ],
  },
];

export async function getTechStackWithFallback(): Promise<TechStackGroupWithItems[]> {
  try {
    const groups = await techStackRepo.getAllGroups();
    if (groups.length > 0) return groups;
    throw new Error("No groups found");
  } catch {
    console.warn("[TechStack Service] Database tidak tersedia, menggunakan data fallback.");
    return FALLBACK_TECH_STACK.map((g, gi) => ({
      id:        `fallback-${gi}`,
      name:      g.name,
      color:     g.color,
      sortOrder: gi + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      items: g.skills.map((s, si) => ({
        id:        `fallback-${gi}-${si}`,
        name:      s.label,
        icon:      s.icon,
        sortOrder: si + 1,
        groupId:   `fallback-${gi}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    }));
  }
}

export async function createTechStackGroup(
  data: Omit<TechStackGroup, "id" | "createdAt" | "updatedAt">,
): Promise<TechStackGroup> {
  return techStackRepo.createGroup(data);
}

export async function updateTechStackGroup(
  id: string,
  data: Partial<Omit<TechStackGroup, "id" | "createdAt" | "updatedAt">>,
): Promise<TechStackGroup> {
  return techStackRepo.updateGroup(id, data);
}

export async function deleteTechStackGroup(id: string): Promise<void> {
  return techStackRepo.deleteGroup(id);
}

export async function createTechStackItem(
  data: Omit<TechStackItem, "id" | "createdAt" | "updatedAt">,
): Promise<TechStackItem> {
  return techStackRepo.createItem(data);
}

export async function updateTechStackItem(
  id: string,
  data: Partial<Omit<TechStackItem, "id" | "createdAt" | "updatedAt">>,
): Promise<TechStackItem> {
  return techStackRepo.updateItem(id, data);
}

export async function deleteTechStackItem(id: string): Promise<void> {
  return techStackRepo.deleteItem(id);
}
