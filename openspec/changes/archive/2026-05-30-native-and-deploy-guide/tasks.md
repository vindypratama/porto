## 1. Reorganisasi DEPLOYMENT.md

- [x] 1.1 Tambahkan table of contents di awal DEPLOYMENT.md
- [x] 1.2 Reorganisasi struktur menjadi: Development (Native + Docker) → Production (Native + Docker) → Maintenance → Troubleshooting

## 2. Native Development — Windows

- [x] 2.1 Tulis panduan install PostgreSQL 16 di Windows (download installer, jalankan setup, set password)
- [x] 2.2 Tulis panduan buat database dan user (`porto_db`, `porto_user`) via pgAdmin atau psql
- [x] 2.3 Tulis panduan konfigurasi `.env` untuk native Windows (DATABASE_URL ke localhost)
- [x] 2.4 Tulis panduan jalankan migration dan seed tanpa Docker
- [x] 2.5 Tulis panduan start dev server (`npm run dev`) dan verifikasi

## 3. Native Development — Ubuntu

- [x] 3.1 Tulis panduan install PostgreSQL 16 di Ubuntu (`apt install postgresql-16`)
- [x] 3.2 Tulis panduan konfigurasi PostgreSQL (pg_hba.conf, create database dan user)
- [x] 3.3 Tulis panduan konfigurasi `.env` untuk native Ubuntu
- [x] 3.4 Tulis panduan jalankan migration dan seed tanpa Docker
- [x] 3.5 Tulis panduan start dev server dan verifikasi

## 4. Deploy ke Ubuntu dari Nol (Native)

- [x] 4.1 Tulis panduan koneksi SSH dan update server (`apt update && apt upgrade`)
- [x] 4.2 Tulis panduan setup firewall UFW (port 22, 80, 443)
- [x] 4.3 Tulis panduan install Node.js 20 LTS di Ubuntu
- [x] 4.4 Tulis panduan install dan konfigurasi PostgreSQL 16 untuk production
- [x] 4.5 Tulis panduan clone repository dan setup environment
- [x] 4.6 Tulis panduan build Next.js production (`npm run build`)
- [x] 4.7 Tulis panduan buat systemd service untuk Next.js (`porto.service`)
- [x] 4.8 Tulis panduan start dan enable service (`systemctl enable --now porto`)
- [x] 4.9 Tulis panduan install dan konfigurasi Nginx reverse proxy
- [x] 4.10 Tulis panduan setup SSL dengan Let's Encrypt (Certbot)
- [x] 4.11 Tulis panduan database migration dan seed di production

## 5. Maintenance & Troubleshooting

- [x] 5.1 Tulis panduan update aplikasi (git pull, build, restart service)
- [x] 5.2 Tulis panduan backup database (`pg_dump`)
- [x] 5.3 Tulis panduan cek logs (`journalctl -u porto`)
- [x] 5.4 Tulis troubleshooting section untuk native deployment (PostgreSQL, systemd, Nginx, SSL, permissions)

## 6. Update README.md

- [x] 6.1 Tambahkan section "Quick Start — Native" di README.md dengan link ke DEPLOYMENT.md
- [x] 6.2 Pastikan README.md punya link ke kedua jalur (Native dan Docker)
