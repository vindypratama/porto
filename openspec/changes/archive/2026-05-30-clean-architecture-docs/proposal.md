## Why

Struktur project saat ini flat — semua komponen di `components/`, API routes langsung memanggil Prisma, dan business logic bercampur dengan handler. Ini menyulitkan maintenance, testing, dan onboarding developer baru. Selain itu, project belum memiliki README yang komprehensif berisi tech stack, system requirements, dan panduan instalasi untuk Windows dan Ubuntu.

## What Changes

- **Reorganisasi struktur folder** mengikuti prinsip Clean Architecture: pemisahan antara presentation layer (components/pages), domain layer (services/repositories), dan infrastructure layer (database/external).
- **Pembuatan service layer** sebagai abstraksi antara API routes dan Prisma, sehingga business logic terpisah dari HTTP handler.
- **Pembuatan repository layer** untuk isolasi akses database dari business logic.
- **Pengelompokan komponen berdasarkan domain** (shared vs feature-specific).
- **Pembuatan README.md** komprehensif yang mencakup: overview project, tech stack, system requirements (server minimum), dan panduan instalasi step-by-step untuk Windows dan Ubuntu.
- **Perapihan dokumentasi existing** (DEPLOYMENT.md, ROADMAP.md) agar konsisten dengan struktur baru.

## Capabilities

### New Capabilities

- `project-structure`: Reorganisasi folder dan file mengikuti clean architecture — domain modules, service layer, repository pattern, dan pemisahan shared vs feature components.
- `documentation`: Pembuatan README.md komprehensif beserta system requirements, tech stack overview, dan installation guide untuk Windows dan Ubuntu.

### Modified Capabilities

_(Tidak ada existing specs yang perlu dimodifikasi karena ini adalah reorganisasi struktural dan penambahan dokumentasi.)_

## Impact

- **Affected code**: Seluruh struktur folder `app/`, `components/`, `lib/`, dan `app/api/`. Import paths di semua file akan berubah.
- **APIs**: Tidak ada perubahan contract API — endpoint dan response tetap sama, hanya internal structure yang berubah.
- **Dependencies**: Tidak ada penambahan npm package baru. Hanya reorganisasi internal.
- **Systems**: Dockerfile dan docker-compose tidak perlu perubahan karena build tetap melalui `next build`.
- **Breaking changes**: Tidak ada breaking change untuk end user. Untuk developer, import paths akan berubah (bisa di-mitigasi dengan barrel exports).
