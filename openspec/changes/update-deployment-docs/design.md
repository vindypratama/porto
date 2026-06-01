## Context

DEPLOYMENT.md (882 baris) sudah cukup lengkap tetapi beberapa referensi teknis sudah usang setelah upgrade dependencies. Perubahan bersifat korektif — bukan restructure, hanya update bagian-bagian yang terdampak.

Perubahan yang perlu di-refleksikan:
- Prisma 7: `url` dihapus dari `schema.prisma`, seed config di `prisma.config.ts` menggunakan `tsx`
- Tailwind CSS 4: `tailwind.config.ts` dihapus, konfigurasi di `globals.css`
- ESLint 9: `eslint .` bukan `next lint`, file `eslint.config.mjs`
- Next.js 16: `proxy.ts` bukan `middleware.ts`
- Docker dev port: 5433 bukan 5432

## Goals / Non-Goals

**Goals:**
- Update section yang terdampak perubahan dependencies
- Tambah catatan `prisma db push` sebagai alternatif migrate dev
- Pastikan developer bisa mengikuti panduan tanpa error

**Non-Goals:**
- Tidak menambah section baru
- Tidak restructure dokumen
- Tidak update Dockerfile atau docker-compose

## Decisions

### Decision 1: Update in-place, bukan rewrite
**Rationale**: Struktur DEPLOYMENT.md sudah bagus. Cukup update baris-baris yang berubah.

### Decision 2: Tambah catatan CREATEDB
**Rationale**: `prisma migrate dev` butuh CREATEDB untuk shadow database. Banyak managed DB tidak punya permission ini. `prisma db push` adalah alternatif yang sudah terbukti work.

## Risks / Trade-offs

- **[Risk]** Ada section lain yang juga perlu diupdate tapi terlewat → **Mitigation**: Review menyeluruh terhadap semua referensi teknis
