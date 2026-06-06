## Why

Portfolio website saat ini belum memenuhi standar esensial untuk menarik perhatian perekrut/klien. Beberapa komponen krusial hilang: About Me section (latar belakang, spesialisasi, sentuhan personal), Experience section (riwayat kerja), project screenshots, dan project links (live demo, GitHub). Selain itu, nama tidak ditampilkan di Hero, dan GitHub bukan first-class contact link. Yang juga penting: admin tidak bisa mengaktifkan/menonaktifkan section — semua section selalu tampil.

## What Changes

### Schema & Database
- Tambah `heroName` ke `SiteSettings` — nama yang ditampilkan di Hero
- Tambah `contactGitHub` ke `SiteSettings` — GitHub link sebagai first-class field
- Tambah field section toggles ke `SiteSettings` — boolean untuk enable/disable setiap section
- Tambah field About ke `SiteSettings` — `aboutBio`, `aboutImage`, `aboutFocus`, `aboutPersonalTouch`
- Buat model `Experience` baru — role, company, duration, description, impact, current
- Tambah `imageUrl`, `liveUrl`, `githubUrl` ke model `Project`

### Components (Public)
- Modifikasi `Hero.tsx` — tampilkan nama, baca section toggle
- Buat `About.tsx` — section About Me (bio, spesialisasi, sentuhan personal)
- Buat `Experience.tsx` — section riwayat kerja dengan download CV
- Modifikasi `Projects.tsx` — baca section toggle
- Modifikasi `ProjectCard.tsx` — tampilkan screenshot, live link, GitHub link
- Modifikasi `TechStack.tsx` — baca section toggle
- Modifikasi `Contact.tsx` — tampilkan GitHub sebagai first-class link, baca section toggle
- Modifikasi `app/page.tsx` — integrasi semua section baru + toggle

### Admin
- Modifikasi settings about page — tambah heroName, about fields
- Modifikasi settings contact page — tambah contactGitHub
- Buat settings sections page — toggle enable/disable per section
- Buat admin experience page — CRUD experience entries

## Capabilities

### New Capabilities

- `about-section`: Section About Me dengan bio, spesialisasi, sentuhan personal
- `experience-section`: Section Experience dengan riwayat kerja dan download CV
- `section-toggles`: Admin bisa enable/disable setiap section dari dashboard

### Modified Capabilities

- `dynamic-about-section`: Menambah heroName dan about fields ke SiteSettings
- `dynamic-contact-section`: Menambah contactGitHub ke SiteSettings
- `dynamic-tech-stack`: Baca section toggle
- `proxy-migration`: Tidak berubah

## Impact

- **Schema changes**: `SiteSettings` dapat ~10 field baru, model `Experience` baru, `Project` dapat 3 field baru
- **Migration**: Diperlukan Prisma migration untuk perubahan schema
- **File baru**: `About.tsx`, `Experience.tsx`, admin experience pages, settings sections page
- **File berubah**: `Hero.tsx`, `Projects.tsx`, `ProjectCard.tsx`, `TechStack.tsx`, `Contact.tsx`, `app/page.tsx`, admin settings pages
- **Tidak ada breaking change**: Semua penambahan, tidak mengubah behavior existing
