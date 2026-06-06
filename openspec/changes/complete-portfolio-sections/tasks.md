## 1. Schema & Migration

- [x] 1.1 Tambah field `heroName`, `contactGitHub` ke model `SiteSettings` di `prisma/schema.prisma`
- [x] 1.2 Tambah field section toggles (`showHero`, `showAbout`, `showTechStack`, `showProjects`, `showExperience`, `showContact`) ke `SiteSettings`
- [x] 1.3 Tambah field About (`aboutBio`, `aboutImage`, `aboutFocus`, `aboutPersonalTouch`) ke `SiteSettings`
- [x] 1.4 Tambah field `imageUrl`, `liveUrl`, `githubUrl` ke model `Project`
- [x] 1.5 Buat model `Experience` (id, role, company, duration, description, impact, current, sortOrder, createdAt, updatedAt)
- [x] 1.6 Jalankan `npx prisma migrate dev` dan `npx prisma generate`

## 2. Service Layer — Experience

- [x] 2.1 Buat `modules/experience/experience.repository.ts` — CRUD functions
- [x] 2.2 Buat `modules/experience/experience.service.ts` — business logic + fallback
- [x] 2.3 Buat `modules/experience/index.ts` — barrel exports

## 3. Service Layer — Updates

- [x] 3.1 Update `modules/projects/project.service.ts` — map `imageUrl`, `liveUrl`, `githubUrl` di `getPublishedProjects`
- [x] 3.2 Update `modules/projects/components/ProjectCard.tsx` — tampilkan screenshot, live link, GitHub link

## 4. API Routes — Experience

- [x] 4.1 Buat `app/api/admin/experience/route.ts` — GET all, POST create
- [x] 4.2 Buat `app/api/admin/experience/[id]/route.ts` — PATCH update, DELETE

## 5. Public Components

- [x] 5.1 Buat `components/About.tsx` — section About Me (bio, focus, personal touch, image)
- [x] 5.2 Buat `components/Experience.tsx` — section riwayat kerja + download CV button
- [x] 5.3 Modifikasi `components/Hero.tsx` — tampilkan `heroName`, baca `showHero` toggle
- [x] 5.4 Modifikasi `components/TechStack.tsx` — baca `showTechStack` toggle
- [x] 5.5 Modifikasi `modules/projects/components/Projects.tsx` — baca `showProjects` toggle
- [x] 5.6 Modifikasi `components/Contact.tsx` — tampilkan `contactGitHub`, baca `showContact` toggle
- [x] 5.7 Modifikasi `app/page.tsx` — integrasi About + Experience sections + semua toggle

## 6. Admin — Settings

- [x] 6.1 Modifikasi `app/admin/(dashboard)/settings/about/page.tsx` — tambah heroName, about fields
- [x] 6.2 Modifikasi `app/admin/(dashboard)/settings/contact/page.tsx` — tambah contactGitHub field
- [x] 6.3 Buat `app/admin/(dashboard)/settings/sections/page.tsx` — toggle switches untuk semua section
- [x] 6.4 Modifikasi `app/admin/(dashboard)/settings/layout.tsx` — tambah "Sections" tab

## 7. Admin — Experience CRUD

- [x] 7.1 Buat `app/admin/(dashboard)/experience/page.tsx` — list experience entries
- [x] 7.2 Buat `app/admin/(dashboard)/experience/new/page.tsx` — create form
- [x] 7.3 Buat `app/admin/(dashboard)/experience/[id]/edit/page.tsx` — edit form
- [x] 7.4 Tambah "Experience" link ke sidebar di `layout.tsx`

## 8. Admin — Project Form Update

- [x] 8.1 Modifikasi `app/admin/(dashboard)/projects/_components/ProjectForm.tsx` — tambah imageUrl, liveUrl, githubUrl fields

## 9. Verifikasi

- [x] 9.1 Jalankan `npx prisma migrate dev` — pastikan migration berhasil
- [x] 9.2 Jalankan `npm run build` — pastikan tidak ada error
