## Why

Dependencies sudah mulai tertinggal dari versi terbaru. Beberapa package memiliki major version baru (Tailwind CSS 4, TypeScript 6, ESLint 10, lucide-react 1.x) yang membawa perbaikan performa, fitur baru, dan security patches. Upgrading sekarang mencegah technical debt menumpuk dan memastikan project tetap mendapat dukungan komunitas.

## What Changes

- **Tailwind CSS** `3.4.19` → `4.3.0` — **BREAKING**: Konfigurasi berubah dari `tailwind.config.ts` ke CSS-based config menggunakan `@theme`
- **TypeScript** `5.9.3` → `6.0.3` — **BREAKING**: Beberapa type inference dan strict checks berubah
- **ESLint** `9.39.4` → `10.4.1` — **BREAKING**: Config format dan plugin API berubah
- **eslint-config-next** `15.3.2` → `16.2.6` — Mengikuti major version Next.js
- **lucide-react** `0.511.0` → `1.17.0` — **BREAKING**: Import path dan beberapa icon name berubah
- **@types/node** `20.19.41` → `25.9.1` — Type definitions untuk Node.js 25
- Package lain yang masih di range terbaru tidak perlu diubah (next, react, prisma, dll sudah latest)

## Capabilities

### New Capabilities
- `deps-upgrade`: Proses upgrade semua dependencies ke versi terbaru dengan penanganan breaking changes

### Modified Capabilities

## Impact

- `package.json` — Version bumps untuk dependencies dan devDependencies
- `tailwind.config.ts` — Harus di-migrate ke CSS-based config (Tailwind v4)
- `postcss.config.js` — Plugin berubah untuk Tailwind v4
- File CSS global — Import Tailwind directives berubah
- Komponen yang menggunakan `lucide-react` — Import path mungkin berubah
- `tsconfig.json` — Mungkin perlu adjustment untuk TypeScript 6
- `eslint` config — Format config berubah untuk ESLint 10
- Build & lint scripts — Harus di-test ulang setelah upgrade
