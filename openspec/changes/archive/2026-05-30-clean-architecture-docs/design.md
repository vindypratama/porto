## Context

Portfolio project "2026-porto" adalah aplikasi Next.js 16 full-stack dengan PostgreSQL, Prisma ORM, NextAuth, dan Docker. Saat ini struktur kode bersifat flat — semua komponen di `components/`, API routes langsung memanggil Prisma tanpa service layer, dan business logic bercampur dengan handler HTTP.

Project juga belum memiliki README.md yang komprehensif. Dokumentasi yang ada (DEPLOYMENT.md, ROADMAP.md) sudah cukup baik tapi terpisah-pisah dan tidak mencakup system requirements atau tech stack overview.

### Struktur Saat Ini
```
2026-porto/
├── app/
│   ├── admin/          # Admin pages (dashboard, posts, projects)
│   ├── api/            # API routes (posts CRUD, projects CRUD, auth)
│   ├── blog/           # Blog pages (list + detail)
│   ├── layout.tsx
│   └── page.tsx        # Portfolio home page
├── components/         # 10 file flat (BlogCard, Contact, Footer, Hero, dll)
├── lib/
│   └── prisma.ts       # Singleton Prisma client
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── auth.ts             # NextAuth config
├── middleware.ts        # Route protection
└── Dockerfile
```

## Goals / Non-Goals

**Goals:**
- Pisahkan kode berdasarkan domain feature (blog, projects, admin, auth)
- Tambahkan service layer antara API routes dan Prisma
- Tambahkan repository layer untuk isolasi akses database
- Kelompokkan komponen: shared vs feature-specific
- Buat README.md komprehensif dengan tech stack, system requirements, dan installation guide Windows + Ubuntu
- Pertahankan fungsionalitas existing — tidak ada perubahan behavior

**Non-Goals:**
- Tidak menambahkan testing framework baru (bisa dijadikan change terpisah)
- Tidak mengubah API contract (endpoint dan response tetap sama)
- Tidak menambahkan npm package baru
- Tidak mengubah Dockerfile atau docker-compose
- Tidak melakukan migrasi database atau perubahan schema Prisma

## Decisions

### 1. Feature-based Module Structure (bukan Layer-based)

**Keputusan**: Menggunakan struktur berdasarkan feature module (`modules/blog/`, `modules/projects/`) bukan layer-based (`domain/`, `application/`, `infrastructure/`).

**Alasan**:
- Next.js App Router sudah menyediakan routing structure secara natural
- Feature modules menjaga kode terkait tetap bersatu (components + service + repository dalam satu folder)
- Lebih mudah di-maintain untuk project ukuran kecil-menengah
- Kurang boilerplate dibanding full Clean Architecture circles

**Alternatif yang dipertimbangkan**:
- Layer-based (domain/application/infrastructure): Terlalu banyak boilerplate untuk project portfolio. Lebih cocok untuk project besar dengan banyak developer.
- Keep flat + barrel exports: Tidak menyelesaikan masalah pencampuran business logic dengan handler.

### 2. Service Layer Pattern

**Keputusan**: Membuat service functions yang memanggil repository, dipanggil oleh API routes dan Server Components.

**Alasan**:
- API routes saat ini langsung memanggil `prisma.post.findMany()` — ini mencampur HTTP concern dengan data access
- Service layer memungkinkan reuse logic antara API route dan Server Component (misal: `getProjects()` dipakai di halaman admin dan halaman publik)
- Service functions mudah di-test secara unit

**Struktur**:
```
modules/
├── blog/
│   ├── blog.service.ts      # Business logic (getPosts, createPost, publishPost)
│   └── blog.repository.ts   # Data access (prisma queries)
├── projects/
│   ├── project.service.ts
│   └── project.repository.ts
└── auth/
    └── auth.service.ts      # Auth-related logic
```

### 3. Komponen: Feature-specific vs Shared

**Keputusan**: Pindahkan komponen yang hanya dipakai oleh satu feature ke folder feature tersebut. Komponen yang dipakai lintas feature tetap di `components/` (shared).

**Pemetaan**:
- `components/BlogCard.tsx` → `modules/blog/components/BlogCard.tsx`
- `components/MarkdownRenderer.tsx` → `modules/blog/components/MarkdownRenderer.tsx`
- `components/ProjectCard.tsx` → `modules/projects/components/ProjectCard.tsx`
- `components/Projects.tsx` → `modules/projects/components/Projects.tsx`
- `components/Hero.tsx` → tetap di `components/` (shared)
- `components/Navigation.tsx` → tetap di `components/` (shared)
- `components/Footer.tsx` → tetap di `components/` (shared)
- `components/Contact.tsx` → tetap di `components/` (shared)
- `components/TechStack.tsx` → tetap di `components/` (shared)
- `components/TechStackBadge.tsx` → tetap di `components/` (shared)

### 4. Barrel Exports (index.ts)

**Keputusan**: Menggunakan barrel exports di setiap module untuk menyederhanakan imports.

**Alasan**:
- Import `@/modules/blog` lebih bersih daripada `@/modules/blog/blog.service`
- Memudahkan refactoring internal module tanpa mengubah import di luar
- Standar practice di TypeScript ecosystem

### 5. README.md Location

**Keputusan**: Buat README.md di root project, gabungkan informasi dari DEPLOYMENT.md yang sudah ada dengan penambahan tech stack dan system requirements.

**Alasan**:
- README.md adalah entry point standar untuk setiap repository
- Menggabungkan informasi yang tersebar (DEPLOYMENT.md, ROADMAP.md) ke satu dokumen utama
- DEPLOYMENT.md tetap dipertahankan sebagai referensi deployment detail

## Risks / Trade-offs

**[Risk] Import path berubah di banyak file** → Mitigasi: Gunakan find-and-replace untuk update imports. Barrel exports mengurangi jumlah file yang perlu diubah di masa depan.

**[Risk] Over-engineering untuk project portfolio** → Mitigasi: Struktur module sederhana, tidak ada abstraksi berlebih. Service layer hanya berisi fungsi-fungsi yang memanggil repository.

**[Risk] Duplikasi kode saat migrasi** → Mitigasi: Pindahkan file secara bertahap, verifikasi build di setiap step. Tidak ada logic yang berubah — hanya lokasi file.

**[Trade-off] Lebih banyak folder** → Diterima karena seimbang dengan clarity dan maintainability. Setiap module self-contained dan mudah ditemukan.

## Migration Plan

1. Buat struktur folder `modules/` dengan sub-folder per feature
2. Pindahkan komponen feature-specific ke module masing-masing
3. Buat repository functions (wrap Prisma queries)
4. Buat service functions (wrap repository + business logic)
5. Update API routes untuk memanggil service layer
6. Update Server Components untuk memanggil service layer
7. Buat barrel exports untuk setiap module
8. Update semua import paths
9. Verifikasi: `npm run build` berhasil tanpa error
10. Buat README.md

**Rollback**: Karena tidak ada perubahan behavior, rollback adalah revert ke commit sebelumnya.

## Open Questions

_(Tidak ada — semua keputusan sudah diambil berdasarkan analisis codebase.)_
