import type { Project } from "@/modules/projects/components/ProjectCard";
import * as projectRepo from "./project.repository";

const FALLBACK_PROJECTS: Project[] = [
  {
    domain: "B2B E-Commerce",
    title: "SIPLah Gramedia & SSIS",
    subtitle: "National School Procurement & Internal ERP Platforms",
    description:
      "Two large-scale B2B systems at Kompas Gramedia: SIPLah (Sistem Informasi Pengadaan di Sekolah) for Indonesia's school procurement market, and SSIS (internal ERP) for omnichannel order processing, real-time inventory, production workflows, and financial modules including partner payables and commission routing.",
    highlights: [
      "Multi-role order lifecycle: school admin \u2192 approval chain \u2192 vendor fulfillment \u2192 finance reconciliation",
      "Complex integrations for payment and logistics gateways",
      "Internal ERP modules: omnichannel orders, inventory, production, financial (payables, commissions)",
      "Scalable multi-tenant architecture supporting regional procurement offices",
    ],
    tech: ["PHP", "Node.js", "MySQL", "REST API", "Redis", "Docker"],
    gradient: "from-indigo-500 to-purple-600",
    icon: "\uD83D\uDED2",
  },
  {
    domain: "Industrial IoT",
    title: "IoT Energy Monitoring",
    subtitle: "Schneider Meter Real-Time Energy Monitoring System",
    description:
      "A real-time IoT energy monitoring platform for Schneider meters at Kompas Gramedia. Built a concurrent Modbus TCP/RTU data collector service in Golang with interactive frontend dashboards to visualize time-series energy data across production facilities.",
    highlights: [
      "Concurrent Modbus TCP/RTU data collector service in Golang",
      "Real-time energy consumption dashboards for Schneider meters",
      "TimescaleDB integration for efficient time-series data storage",
      "Nginx reverse proxy configuration for high-performance traffic routing",
    ],
    tech: ["Golang", "Modbus Protocol", "PostgreSQL", "TimescaleDB", "WebSocket", "Docker"],
    gradient: "from-amber-500 to-orange-600",
    icon: "\u26A1",
  },
  {
    domain: "Industrial IoT",
    title: "Big Horn Guard",
    subtitle: "Crude Oil Production Monitoring System",
    description:
      "An end-to-end IIoT platform for real-time monitoring of crude oil production facilities, developed at PT. AEON Riset & Teknologi. The Node.js server communicates directly with field hardware over the Modbus protocol, ingesting high-frequency sensor telemetry and surfacing it through a live operator dashboard with sub-second response times.",
    highlights: [
      "Self-contained edge computing application ensuring 24/7 high-availability on industrial PCs",
      "Modbus protocol communication with PLCs for pressure, temperature, mass flow, density, and separator readings",
      "High-concurrency data streaming via HTTP/WebSocket with sub-second response times",
      "Advanced MySQL indexing and data-retention patterns for historical analysis",
    ],
    tech: ["Node.js", "Modbus Protocol", "MySQL", "WebSocket", "React", "Edge Computing"],
    gradient: "from-emerald-500 to-teal-600",
    icon: "\uD83D\uDEE2\uFE0F",
  },
  {
    domain: "Enterprise WMS",
    title: "Warehouse Management System",
    subtitle: "Multi-Tenant WMS with RBAC & Secure REST API",
    description:
      "A multi-tenant Warehouse Management System with a secure REST API built using Golang (Fiber) with JWT authentication. Features a comprehensive administrative web portal with dynamic Role-Based Access Control (RBAC) and customized user permissions for distributed logistics operations.",
    highlights: [
      "Secure REST API using Golang (Fiber) with JWT authentication",
      "Dynamic RBAC with customized user permissions via admin portal",
      "Complex relational database schema design for inventory, receiving, putaway, picking, and dispatch",
      "Multi-tenant architecture with strict data isolation per organization",
    ],
    tech: ["Golang", "Fiber", "MySQL", "JWT", "RBAC", "REST API"],
    gradient: "from-rose-500 to-pink-600",
    icon: "\uD83C\uDFED",
  },
];

export async function getPublishedProjects(): Promise<Project[]> {
  try {
    const rows = await projectRepo.findManyProjects({
      where:   { published: true },
      orderBy: { order: "asc" },
    });

    return rows.map((p) => ({
      domain:      p.domain,
      title:       p.title,
      subtitle:    p.subtitle,
      description: p.description,
      highlights:  p.highlights,
      tech:        p.tech,
      gradient:    p.gradient,
      icon:        p.icon,
    }));
  } catch {
    console.warn("[Project Service] Database tidak tersedia, menggunakan data fallback.");
    return FALLBACK_PROJECTS;
  }
}

export async function getAllProjects() {
  try {
    return await projectRepo.findManyProjects({
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getProjectById(id: string) {
  return projectRepo.findUniqueProject(id);
}

export async function createProject(data: Record<string, unknown>) {
  return projectRepo.createProject(data);
}

export async function updateProject(
  id: string,
  data: Record<string, unknown>,
) {
  return projectRepo.updateProject(id, data);
}

export async function deleteProject(id: string) {
  return projectRepo.deleteProject(id);
}

export async function getProjectStats() {
  try {
    const totalProjects = await projectRepo.countProjects({ published: true });
    return { totalProjects };
  } catch {
    return { totalProjects: 0 };
  }
}
