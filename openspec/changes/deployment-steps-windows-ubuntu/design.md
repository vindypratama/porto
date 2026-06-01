## Context

Project portfolio Next.js 16 dengan Prisma ORM dan PostgreSQL 16 sudah memiliki file `DEPLOYMENT.md` (875 baris) yang mencakup panduan lengkap untuk Windows dan Ubuntu, baik native maupun Docker. Namun, dokumentasi ini perlu distrukturkan ulang agar lebih mudah diikuti dan konsisten antar skenario.

Stack teknologi:
- **Framework**: Next.js 16 (standalone output)
- **Database**: PostgreSQL 16
- **ORM**: Prisma 7.8
- **Auth**: NextAuth v5 beta
- **Container**: Docker dengan multi-stage build (deps → migration → builder → runner)
- **Reverse Proxy**: Nginx
- **Process Manager**: systemd (native) / Docker Compose (Docker)
- **SSL**: Let's Encrypt via Certbot

## Goals / Non-Goals

**Goals:**
- Menyediakan panduan deployment yang terstruktur dan konsisten untuk 4 skenario
- Setiap skenario dapat diikuti secara mandiri tanpa perlu membaca skenario lain
- Mencakup seluruh siklus: prasyarat → instalasi → konfigurasi → migrasi → running → maintenance → troubleshooting
- Menggunakan perintah yang sudah terverifikasi sesuai dengan konfigurasi project yang ada

**Non-Goals:**
- Tidak mengubah kode aplikasi, Dockerfile, atau docker-compose
- Tidak menambahkan CI/CD pipeline
- Tidak menambahkan monitoring tools eksternal (Prometheus, Grafana, dll)
- Tidak menambahkan load balancing atau high availability

## Decisions

### Decision 1: Update DEPLOYMENT.md yang sudah ada
**Rationale**: File `DEPLOYMENT.md` sudah ada dan cukup lengkap. Lebih baik mengupdate dan menyempurnakan daripada membuat file baru, karena developer sudah familiar dengan lokasi file ini.
**Alternatives yang dipertimbangkan**:
- Membuat file terpisah per skenario (deployment-windows-native.md, dll) — ditolak karena fragmentasi informasi
- Membuat folder docs/ terpisah — ditolak karena over-engineering untuk dokumentasi deployment

### Decision 2: Struktur konsisten per skenario
Setiap bagian skenario akan mengikuti pola yang sama:
1. Prasyarat (software yang dibutuhkan)
2. Instalasi (langkah instalasi software)
3. Konfigurasi (database, environment)
4. Clone & Setup (repository, dependencies)
5. Build & Run (menjalankan aplikasi)
6. Verifikasi (memastikan berjalan dengan benar)
7. Perintah Berguna (referensi cepat)

**Rationale**: Struktur konsisten memudahkan developer yang berganti antar skenario.

### Decision 3: Menggunakan systemd untuk Ubuntu Native, Docker Compose untuk Ubuntu Docker
**Rationale**: Ini adalah standar industri untuk masing-masing pendekatan. systemd sudah tersedia di Ubuntu, Docker Compose sudah dikonfigurasi di project.

### Decision 4: Nginx sebagai reverse proxy di kedua skenario production
**Rationale**: Nginx ringan, stabil, dan sudah menjadi standar untuk reverse proxy Next.js di production. Konfigurasi SSL juga mudah dengan Certbot.

## Risks / Trade-offs

- **[Risk]** Konfigurasi PostgreSQL bervariasi antar versi Ubuntu → **Mitigation**: Menggunakan repository resmi PostgreSQL untuk konsistensi versi 16
- **[Risk]** Password database di dokumentasi adalah contoh → **Mitigation**: Menggunakan placeholder yang jelas seperti `GANTI_PASSWORD_KUAT` dan instruksi untuk mengganti
- **[Risk]** Domain dan DNS di luar kendali dokumentasi → **Mitigation**: Menggunakan placeholder `yourdomain.com` dengan instruksi DNS setup
- **[Risk]** Versi Node.js bisa berubah → **Mitigation**: Menggunakan Node.js 20 LTS yang didukung hingga 2026
