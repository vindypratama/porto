## ADDED Requirements

### Requirement: Windows Native Development Setup
Dokumen deployment SHALL menyediakan panduan lengkap untuk menjalankan aplikasi di Windows tanpa Docker, mencakup instalasi PostgreSQL 16, Node.js 20, konfigurasi database, dan menjalankan development server.

#### Scenario: Developer mengikuti panduan Windows Native dari nol
- **WHEN** developer mengikuti langkah-langkah Bagian 1 secara berurutan
- **THEN** aplikasi Next.js berjalan di http://localhost:3000 dengan database PostgreSQL yang terhubung

#### Scenario: Verifikasi PostgreSQL terinstall dengan benar
- **WHEN** developer menjalankan `psql --version` dan `Get-Service postgresql*`
- **THEN** PostgreSQL 16 terdeteksi dan service berstatus Running

#### Scenario: Database dan user berhasil dibuat
- **WHEN** developer menjalankan perintah SQL untuk membuat user dan database
- **THEN** user `porto_user` dapat terkoneksi ke database `porto_db` via `psql -U porto_user -d porto_db -h localhost`

### Requirement: Windows Docker Development Setup
Dokumen deployment SHALL menyediakan panduan untuk menjalankan PostgreSQL di Docker sementara Next.js tetap dijalankan native di Windows.

#### Scenario: Developer mengikuti panduan Windows Docker
- **WHEN** developer menjalankan `docker compose -f docker-compose.dev.yml up -d` lalu `npm run dev`
- **THEN** container PostgreSQL berjalan dan aplikasi Next.js dapat terkoneksi ke database di localhost:5432

#### Scenario: Container PostgreSQL berjalan dengan healthy
- **WHEN** developer menjalankan `docker ps`
- **THEN** container `porto_postgres_dev` berstatus `Up` dan healthy

### Requirement: Ubuntu Native Production Deployment
Dokumen deployment SHALL menyediakan panduan lengkap deploy ke VPS Ubuntu dari nol, mencakup setup firewall, instalasi Node.js, PostgreSQL, Nginx, systemd service, dan SSL dengan Let's Encrypt.

#### Scenario: Deploy dari VPS fresh Ubuntu 24.04
- **WHEN** admin mengikuti langkah Bagian 4 secara berurutan dari VPS fresh
- **THEN** aplikasi berjalan di https://yourdomain.com dengan SSL aktif dan service auto-start

#### Scenario: Semua service berjalan setelah deploy
- **WHEN** admin menjalankan `sudo systemctl status postgresql porto nginx`
- **THEN** ketiga service berstatus `active (running)`

#### Scenario: HTTPS berhasil dikonfigurasi
- **WHEN** admin mengakses https://yourdomain.com
- **THEN** halaman portfolio dimuat dengan sertifikat SSL yang valid

### Requirement: Ubuntu Docker Production Deployment
Dokumen deployment SHALL menyediakan panduan deploy ke VPS Ubuntu menggunakan Docker Compose, mencakup instalasi Docker, konfigurasi environment, build container, Nginx, dan SSL.

#### Scenario: Deploy dengan Docker dari VPS fresh
- **WHEN** admin mengikuti langkah Bagian 5 secara berurutan
- **THEN** semua container (postgres, migrate, web) berjalan dan aplikasi dapat diakses via HTTPS

#### Scenario: Database migration berjalan otomatis
- **WHEN** admin menjalankan `docker compose up -d --build`
- **THEN** container `migrate` menjalankan `prisma migrate deploy` dan exit dengan status 0, kemudian container `web` start

#### Scenario: Seed data admin berhasil
- **WHEN** admin menjalankan `docker compose run --rm migrate npx prisma db seed`
- **THEN** data admin berhasil di-seed ke database

### Requirement: Maintenance Procedures
Dokumen deployment SHALL menyediakan panduan maintenance yang mencakup update aplikasi, backup dan restore database, serta monitoring untuk kedua skenario (native dan Docker).

#### Scenario: Update aplikasi native
- **WHEN** admin menjalankan `git pull`, `npm install`, `npm run build`, `npx prisma migrate deploy`, lalu restart service
- **THEN** aplikasi berjalan dengan versi terbaru

#### Scenario: Update aplikasi Docker
- **WHEN** admin menjalankan `git pull` lalu `docker compose up -d --build`
- **THEN** container di-rebuild dan berjalan dengan versi terbaru

#### Scenario: Backup database native
- **WHEN** admin menjalankan `pg_dump -U porto_user -h localhost porto_db > backup.sql`
- **THEN** file backup SQL berhasil dibuat

#### Scenario: Backup database Docker
- **WHEN** admin menjalankan `docker exec porto_postgres pg_dump -U porto_user porto_db > backup.sql`
- **THEN** file backup SQL berhasil dibuat

### Requirement: Troubleshooting Guide
Dokumen deployment SHALL menyediakan panduan troubleshooting untuk masalah umum yang mungkin terjadi pada setiap komponen (PostgreSQL, Next.js, systemd, Nginx, SSL).

#### Scenario: Developer menghadapi koneksi database gagal
- **WHEN** developer mencari solusi di section Troubleshooting
- **THEN** ditemukan langkah verifikasi: cek service status, cek pg_hba.conf, cek port dan firewall

#### Scenario: Developer menghadapi 502 Bad Gateway di Nginx
- **WHEN** developer mencari solusi di section Troubleshooting
- **THEN** ditemukan langkah verifikasi: pastikan Next.js berjalan di port 3000 dengan `curl http://localhost:3000`
