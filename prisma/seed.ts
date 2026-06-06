/**
 * prisma/seed.ts — Data awal (seed) untuk database
 *
 * Perintah untuk menjalankan:
 *   npx prisma db seed
 *
 * Script ini akan mengisi database dengan:
 *   - 1 user Admin default
 *   - 4 Project dari data yang sebelumnya hardcoded di Projects.tsx
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL ?? "";
const adapter = new PrismaPg(connectionString);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Mulai proses seeding...");

  // ── 1. Admin User ─────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { email: "admin@portfolio.dev" },
    update: {
      password: await bcrypt.hash("ganti-password-ini", 12),
    },
    create: {
      email:    "admin@portfolio.dev",
      name:     "Vindy",
      password: await bcrypt.hash("ganti-password-ini", 12),
      role:     "ADMIN",
    },
  });
  console.log(`✅ User admin dibuat: ${admin.email}`);

  // ── 2. SiteSettings (singleton) ───────────────────────────
  const settings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id:                 "singleton",
      heroName:           "Vindy Pratama",
      heroHeadline:       "Software Engineer & System Architect",
      heroDescription:    "Over 10 years of experience building enterprise-grade applications, secure REST APIs, and Industrial IoT systems — from sensor to dashboard.",
      heroAvailability:   "Available for freelance & full-time roles",
      heroResumeUrl:      "/resume.pdf",
      heroCtaPrimary:     "View Projects",
      heroCtaSecondary:   "Download Resume",
      aboutBio:           "A passionate Software Engineer and System Architect with over 10 years of experience building enterprise-grade applications, from large-scale B2B e-commerce platforms to Industrial IoT systems.",
      aboutFocus:         "Enterprise-scale applications, B2B e-commerce systems, Industrial IoT (IIoT) integrations, secure REST APIs, and high-concurrency real-time systems.",
      aboutPersonalTouch: "When not coding, I enjoy exploring new technologies, contributing to open-source projects, and sharing knowledge through technical writing.",
      contactHeading:     "Let's Work Together",
      contactDescription: "Whether it's a greenfield enterprise system, a hardware integration challenge, or modernizing a legacy platform — I'm open to meaningful conversations.",
      contactEmail:       "vindypratama8@gmail.com",
      contactLinkedIn:    "https://www.linkedin.com/in/vindypratama",
      contactGitHub:      "https://github.com/vindypratama",
      logoIcon:           "code-2",
      logoText:           "<dev />",
    },
  });
  console.log(`✅ SiteSettings dibuat: ${settings.id}`);

  // ── 3. Tech Stack Groups & Items ─────────────────────────
  const techStackData = [
    {
      name: "Backend & APIs",
      color: "indigo",
      sortOrder: 1,
      items: [
        { name: "Golang", icon: "server", sortOrder: 1 },
        { name: "Node.js", icon: "server", sortOrder: 2 },
        { name: "PHP", icon: "server", sortOrder: 3 },
        { name: "REST API", icon: "api", sortOrder: 4 },
        { name: "JWT Auth", icon: "key", sortOrder: 5 },
        { name: "RBAC", icon: "shield", sortOrder: 6 },
        { name: "MVC", icon: "layers", sortOrder: 7 },
        { name: "Clean Architecture", icon: "boxes", sortOrder: 8 },
      ],
    },
    {
      name: "Infrastructure & DevOps",
      color: "cyan",
      sortOrder: 2,
      items: [
        { name: "Linux", icon: "terminal", sortOrder: 1 },
        { name: "Nginx", icon: "server", sortOrder: 2 },
        { name: "Apache", icon: "server", sortOrder: 3 },
        { name: "Docker", icon: "container", sortOrder: 4 },
        { name: "Edge Computing", icon: "cpu", sortOrder: 5 },
        { name: "Server Admin", icon: "settings", sortOrder: 6 },
      ],
    },
    {
      name: "Database Engineering",
      color: "emerald",
      sortOrder: 3,
      items: [
        { name: "MySQL", icon: "database", sortOrder: 1 },
        { name: "PostgreSQL", icon: "database", sortOrder: 2 },
        { name: "TimescaleDB", icon: "database", sortOrder: 3 },
        { name: "Schema Design", icon: "layout", sortOrder: 4 },
        { name: "Query Optimization", icon: "zap", sortOrder: 5 },
        { name: "Redis", icon: "database", sortOrder: 6 },
      ],
    },
    {
      name: "IoT & Integration",
      color: "amber",
      sortOrder: 4,
      items: [
        { name: "Modbus TCP/RTU", icon: "radio", sortOrder: 1 },
        { name: "PLC Integration", icon: "cpu", sortOrder: 2 },
        { name: "WebSocket", icon: "radio", sortOrder: 3 },
        { name: "Real-Time Streaming", icon: "activity", sortOrder: 4 },
        { name: "Time-Series Data", icon: "clock", sortOrder: 5 },
        { name: "High Concurrency", icon: "gauge", sortOrder: 6 },
      ],
    },
  ];

  for (const groupData of techStackData) {
    const { items, ...groupFields } = groupData;
    const existingGroup = await prisma.techStackGroup.findFirst({
      where: { name: groupFields.name },
    });
    if (!existingGroup) {
      const group = await prisma.techStackGroup.create({
        data: groupFields,
      });
      await prisma.techStackItem.createMany({
        data: items.map((item) => ({ ...item, groupId: group.id })),
      });
      console.log(`✅ TechStack group dibuat: ${groupFields.name}`);
    } else {
      console.log(`⏭️  TechStack group sudah ada: ${groupFields.name}`);
    }
  }

  // ── 4. Projects (dari data CV Vindy Pratama) ───────────────
  const projects = [
    {
      domain: "B2B E-Commerce",
      title: "SIPLah Gramedia & SSIS",
      subtitle: "National School Procurement & Internal ERP Platforms",
      description:
        "Two large-scale B2B systems at Kompas Gramedia: SIPLah (Sistem Informasi Pengadaan di Sekolah) for Indonesia's school procurement market, and SSIS (internal ERP) for omnichannel order processing, real-time inventory, production workflows, and financial modules including partner payables and commission routing.",
      highlights: [
        "Multi-role order lifecycle: school admin → approval chain → vendor fulfillment → finance reconciliation",
        "Complex integrations for payment and logistics gateways",
        "Internal ERP modules: omnichannel orders, inventory, production, financial (payables, commissions)",
        "Scalable multi-tenant architecture supporting regional procurement offices",
      ],
      tech: ["PHP", "Node.js", "MySQL", "REST API", "Redis", "Docker"],
      gradient: "from-indigo-500 to-purple-600",
      icon: "🛒",
      order: 1,
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
      icon: "⚡",
      order: 2,
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
      icon: "🛢️",
      order: 3,
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
      icon: "🏭",
      order: 4,
    },
  ];

  for (const project of projects) {
    const existing = await prisma.project.findFirst({
      where: { title: project.title },
    });
    if (!existing) {
      await prisma.project.create({ data: project });
      console.log(`✅ Project dibuat: ${project.title}`);
    } else {
      console.log(`⏭️  Project sudah ada: ${project.title}`);
    }
  }

  console.log("\n🎉 Seeding selesai!");
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
