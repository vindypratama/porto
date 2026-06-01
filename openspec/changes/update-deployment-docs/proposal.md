## Why

Setelah beberapa upgrade dependencies (Prisma 7, Tailwind CSS 4, TypeScript 6, ESLint 9, Next.js 16 proxy), `DEPLOYMENT.md` masih merujuk konfigurasi lama. Developer yang mengikuti panduan akan mengalami error karena perintah dan konfigurasi sudah berubah. Dokumentasi harus disesuaikan dengan state project saat ini.

## What Changes

- Update referensi Prisma: `schema.prisma` tidak lagi punya `url`, seed menggunakan `tsx` via `prisma.config.ts`
- Update referensi Tailwind CSS: tidak ada `tailwind.config.ts`, konfigurasi di `globals.css` dengan `@theme`
- Update referensi ESLint: `eslint .` bukan `next lint`, flat config di `eslint.config.mjs`
- Update referensi Next.js 16: `proxy.ts` bukan `middleware.ts`
- Tambah catatan `prisma db push` sebagai alternatif jika user tidak punya CREATEDB permission
- Update port Docker dev dari 5432 ke 5433 (sesuai docker-compose.dev.yml)
- Hapus referensi `tailwind.config.ts` dan `postcss.config.js` (PostCSS lama)

## Capabilities

### New Capabilities
- `deployment-docs-update`: Update DEPLOYMENT.md agar sesuai dengan konfigurasi project terbaru

### Modified Capabilities

## Impact

- File `DEPLOYMENT.md` — Update beberapa section untuk mencerminkan Prisma 7, Tailwind v4, ESLint 9, proxy.ts
- Tidak ada perubahan kode aplikasi
