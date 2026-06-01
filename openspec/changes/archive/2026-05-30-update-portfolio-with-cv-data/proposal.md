## Why

Data portfolio saat ini menggunakan placeholder/generic content yang tidak mencerminkan pengalaman profesional Vindy Pratama. CV menunjukkan 10+ tahun pengalaman dengan project-project nyata di enterprise (Kompas Gramedia, Toyota, IoT systems). Portfolio perlu diupdate dengan data real dari CV untuk menjadi representasi akurat dari kemampuan dan pengalaman.

## What Changes

- **Hero section** — Update headline, sub-headline, dan CTA sesuai CV (Software Engineer, 10+ years, enterprise systems)
- **Tech Stack section** — Update skills sesuai core competencies di CV (Golang, Node.js, PHP, MySQL, PostgreSQL, IoT, Linux)
- **Contact section** — Update email, LinkedIn, dan phone dengan data real dari CV
- **Projects data** — Update seed data dan fallback projects dengan 4 project utama dari CV:
  1. SIPLah Gramedia & SSIS (B2B E-Commerce) — Kompas Gramedia
  2. IoT Energy Monitoring (Schneider meters) — Kompas Gramedia
  3. Big Horn Guard (IIoT Crude Oil Monitoring) — PT. AEON
  4. Warehouse Management System — Kompas Gramedia
- **README.md** — Update tech stack dan project description sesuai CV

## Capabilities

### New Capabilities

- `cv-data-update`: Update semua data portfolio (Hero, TechStack, Contact, Projects) dengan data dari CV Vindy Pratama

### Modified Capabilities

_(Tidak ada existing specs yang perlu dimodifikasi.)_

## Impact

- **Affected files**: `components/Hero.tsx`, `components/TechStack.tsx`, `components/Contact.tsx`, `prisma/seed.ts`, `modules/projects/project.service.ts`, `README.md`
- **APIs**: Tidak ada perubahan
- **Dependencies**: Tidak ada
- **Systems**: Tidak ada — ini hanya perubahan data dan konten
