## Context

Portfolio website menggunakan Next.js 16 (App Router) dengan Prisma PostgreSQL. Public-facing pages terdiri dari Hero, TechStack, Projects, Contact, Footer — semua server components yang mengambil data dari service layer. Admin panel mengelola konten via settings pages (about, contact, tech-stack, logo). Data disimpan di `SiteSettings` (singleton) dan model terkait.

Saat ini: About Me tidak ada (Hero dobel-duty), Experience tidak ada, project tidak punya screenshot/links, section selalu tampil tanpa toggle.

## Goals / Non-Goals

**Goals:**
- Lengkapi semua 6 komponen esensial portfolio sesuai best practices
- Tambahkan section toggles agar admin bisa customize tampilan
- Pertahankan pattern arsitektur yang sudah ada (server components, service layer, admin CRUD)
- Konsisten secara visual dengan design system yang ada (dark theme, indigo accents, glassmorphism)

**Non-Goals:**
- Tidak mengubah routing atau auth system
- Tidak mengubah public layout structure (tetap single-page scroll)
- Tidak menambah fitur blog baru
- Tidak mengubah deployment setup

## Decisions

### 1. Section toggles via boolean fields di SiteSettings

**Keputusan**: Tambahkan boolean fields (`showHero`, `showAbout`, `showTechStack`, `showProjects`, `showExperience`, `showContact`) ke model `SiteSettings`.

**Alasan**:
- SiteSettings sudah digunakan sebagai singleton config
- Boolean fields sederhana, tidak perlu model baru
- Admin settings page bisa render toggle switches

**Alternatif yang dipertimbangkan**:
- **JSON field**: Lebih fleksibel tapi kurang type-safe
- **Model terpisah `SectionConfig`**: Over-engineering untuk boolean flags

### 2. About section sebagai komponen terpisah

**Keputusan**: Buat `About.tsx` sebagai komponen baru, bukan extend Hero.

**Alasan**:
- Hero sudah punya role yang berbeda (headline + CTA)
- About perlu layout yang berbeda (bio text, focus areas, personal touch)
- Memisahkan concerns

### 3. Experience sebagai model Prisma terpisah

**Keputusan**: Buat model `Experience` dengan field: `id`, `role`, `company`, `duration`, `description`, `impact`, `current`, `sortOrder`.

**Alasan**:
- Experience adalah entity tersendiri (bukan singleton config)
- Bisa multiple entries (riwayat kerja)
- Perlu CRUD di admin

### 4. Project links via kolom langsung, bukan JSON

**Keputusan**: Tambah `liveUrl String?` dan `githubUrl String?` ke model `Project`.

**Alasan**:
- Lebih queryable dan type-safe dari JSON
- Sudah ada pattern di `ProjectCard.tsx` yang mengharapkan field ini
- Hanya 2 field, bukan complex nested structure

### 5. Admin settings sections page

**Keputusan**: Buat halaman baru `/admin/settings/sections` dengan toggle switches untuk setiap section.

**Alasan**:
- Terpisah dari settings about/contact yang sudah ada
- Clean UX — satu halaman untuk manage visibility semua section
- Bisa diakses dari tab navigasi settings yang sudah ada

## Risks / Trade-offs

- **[Risk]** Schema changes banyak → **Mitigation**: Buat migration tunggal yang menggabungkan semua perubahan
- **[Risk]** Section toggles bisa membingungkan jika section dependencies tidak jelas → **Mitigation**: Tambahkan deskripsi di admin UI untuk setiap toggle
- **[Risk]** About/Experience sections menambah panjang halaman → **Mitigation**: Pastikan spacing konsisten, gunakan section divider
