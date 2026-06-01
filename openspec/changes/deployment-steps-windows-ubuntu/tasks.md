## 1. Struktur Dokumen DEPLOYMENT.md

- [x] 1.1 Buat header dan Daftar Isi yang mencakup 7 bagian (Windows Native, Windows Docker, Ubuntu Native, Ubuntu Docker, Maintenance, Troubleshooting)
- [x] 1.2 Pastikan setiap bagian mengikuti struktur konsisten: Prasyarat → Instalasi → Konfigurasi → Clone & Setup → Build & Run → Verifikasi → Perintah Berguna

## 2. Bagian 1: Windows Native Development

- [x] 2.1 Tulis section Prasyarat (Node.js 20+, PostgreSQL 16, Git)
- [x] 2.2 Tulis section Install PostgreSQL 16 di Windows dengan langkah verifikasi
- [x] 2.3 Tulis section Buat Database dan User dengan perintah SQL
- [x] 2.4 Tulis section Clone & Install Dependencies
- [x] 2.5 Tulis section Konfigurasi Environment (.env dengan DATABASE_URL, AUTH_SECRET, NEXTAUTH_URL)
- [x] 2.6 Tulis section Migrasi Database & Seed
- [x] 2.7 Tulis section Jalankan Development Server dan tabel URL
- [x] 2.8 Tulis section Perintah Berguna (npm run dev, db:migrate, db:seed, db:studio)

## 3. Bagian 2: Windows Docker Development

- [x] 3.1 Tulis section Prasyarat (Node.js 20+, Docker Desktop, Git)
- [x] 3.2 Tulis section Clone & Install
- [x] 3.3 Tulis section Konfigurasi Environment
- [x] 3.4 Tulis section Jalankan PostgreSQL via Docker (docker-compose.dev.yml)
- [x] 3.5 Tulis section Migrasi & Seed
- [x] 3.6 Tulis section Jalankan Development Server
- [x] 3.7 Tulis section Perintah Berguna (docker compose down, docker compose down -v)

## 4. Bagian 3: Ubuntu Native Development

- [x] 4.1 Tulis section Prasyarat (Ubuntu 20.04+, akses sudo)
- [x] 4.2 Tulis section Install PostgreSQL 16 dari repository resmi
- [x] 4.3 Tulis section Konfigurasi PostgreSQL (user, database, pg_hba.conf)
- [x] 4.4 Tulis section Clone & Install
- [x] 4.5 Tulis section Konfigurasi Environment
- [x] 4.6 Tulis section Migrasi & Seed
- [x] 4.7 Tulis section Jalankan Development Server
- [x] 4.8 Tulis section Perintah Berguna (systemctl restart postgresql, dll)

## 5. Bagian 4: Deploy ke Ubuntu dari Nol (Native Production)

- [x] 5.1 Tulis section Koneksi & Update Server (ssh, apt update)
- [x] 5.2 Tulis section Setup Firewall UFW (port 22, 80, 443)
- [x] 5.3 Tulis section Install Node.js 20 LTS dari NodeSource
- [x] 5.4 Tulis section Install & Konfigurasi PostgreSQL 16 untuk production
- [x] 5.5 Tulis section Clone Repository & Setup Environment (.env production)
- [x] 5.6 Tulis section Build Next.js Production (npm run build)
- [x] 5.7 Tulis section Database Migration & Seed
- [x] 5.8 Tulis section Buat systemd Service (file service, systemctl enable/start)
- [x] 5.9 Tulis section Install & Konfigurasi Nginx (reverse proxy config)
- [x] 5.10 Tulis section SSL dengan Let's Encrypt (certbot)
- [x] 5.11 Tulis section Verifikasi Final (systemctl status, ss -tlnp, curl test)

## 6. Bagian 5: Deploy ke Ubuntu Docker Production

- [x] 6.1 Tulis section Prasyarat (Ubuntu 24.04, domain pointing ke IP VPS)
- [x] 6.2 Tulis section Koneksi & Update Server
- [x] 6.3 Tulis section Keamanan Dasar (UFW)
- [x] 6.4 Tulis section Install Docker Engine dari repository resmi
- [x] 6.5 Tulis section Clone Repository
- [x] 6.6 Tulis section Setup Environment Production (.env dengan POSTGRES_*, DATABASE_URL, AUTH_SECRET)
- [x] 6.7 Tulis section Build & Jalankan Container (docker compose up -d --build)
- [x] 6.8 Tulis section Seed Data Admin (docker compose run --rm migrate)
- [x] 6.9 Tulis section Install & Konfigurasi Nginx
- [x] 6.10 Tulis section SSL dengan Let's Encrypt

## 7. Bagian 6: Maintenance

- [x] 7.1 Tulis section Update Aplikasi Native (git pull, npm install, build, migrate, restart)
- [x] 7.2 Tulis section Update Aplikasi Docker (git pull, docker compose up -d --build)
- [x] 7.3 Tulis section Backup Database (pg_dump untuk native dan Docker)
- [x] 7.4 Tulis section Restore Database (psql untuk native dan Docker)
- [x] 7.5 Tulis section Cek Logs (journalctl untuk native, docker compose logs untuk Docker)
- [x] 7.6 Tulis section Perintah Maintenance Lainnya (status, restart, masuk ke PostgreSQL)

## 8. Bagian 7: Troubleshooting

- [x] 8.1 Tulis tabel troubleshooting PostgreSQL (koneksi ditolak, password gagal, port, database tidak ditemukan)
- [x] 8.2 Tulis tabel troubleshooting Next.js Application (build gagal, DATABASE_URL error, port conflict)
- [x] 8.3 Tulis tabel troubleshooting systemd Service (gagal start, auto-start, permission)
- [x] 8.4 Tulis tabel troubleshooting Nginx (502, config syntax, site tidak bisa diakses)
- [x] 8.5 Tulis tabel troubleshooting SSL/Let's Encrypt (certbot gagal, expired, redirect loop)
- [x] 8.6 Tulis section Permission Issues (chown, chmod untuk aplikasi dan PostgreSQL)
