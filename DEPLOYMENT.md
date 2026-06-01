# Panduan Deployment

Dokumen ini berisi langkah lengkap untuk menjalankan portfolio secara lokal maupun di production. Tersedia dua jalur:

- **Native** — PostgreSQL dan Node.js langsung di sistem (tanpa Docker)
- **Docker** — Semua dijalankan dalam container

---

## Daftar Isi

- [Bagian 1: Development di Windows (Native)](#bagian-1-development-di-windows-native)
- [Bagian 2: Development di Windows (Docker)](#bagian-2-development-di-windows-docker)
- [Bagian 3: Development di Ubuntu (Native)](#bagian-3-development-di-ubuntu-native)
- [Bagian 4: Deploy ke Ubuntu dari Nol (Native)](#bagian-4-deploy-ke-ubuntu-dari-nol-native)
- [Bagian 5: Deploy ke Ubuntu (Docker)](#bagian-5-deploy-ke-ubuntu-docker)
- [Bagian 6: Maintenance](#bagian-6-maintenance)
- [Bagian 7: Troubleshooting](#bagian-7-troubleshooting)

---

## Bagian 1: Development di Windows (Native)

Jalur ini menjalankan PostgreSQL langsung di Windows tanpa Docker.

### 1.1 Prasyarat

- [Node.js 20+](https://nodejs.org/) (LTS)
- [PostgreSQL 16](https://www.postgresql.org/download/windows/) (EnterpriseDB installer)
- [Git](https://git-scm.com/)

### 1.2 Install PostgreSQL 16 di Windows

1. Download installer dari [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
2. Jalankan installer, ikuti wizard:
   - Pilih direktori install (default: `C:\Program Files\PostgreSQL\16`)
   - Pilih komponen: **PostgreSQL Server**, **pgAdmin 4**, **Command Line Tools**
   - Set password untuk user `postgres` (catat password ini!)
   - Port: **5432** (default)
   - Locale: default
3. Setelah install selesai, PostgreSQL akan berjalan sebagai Windows Service

Verifikasi:

```powershell
# Cek versi PostgreSQL
psql --version

# Cek service berjalan
Get-Service postgresql*
```

### 1.3 Buat Database dan User

Buka **pgAdmin 4** (sudah terinstall) atau gunakan `psql`:

```powershell
# Login sebagai postgres
psql -U postgres
```

Di dalam psql:

```sql
-- Buat user
CREATE USER porto_user WITH PASSWORD 'porto_dev_password';

-- Buat database
CREATE DATABASE porto_db OWNER porto_user;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE porto_db TO porto_user;

-- Keluar
\q
```

Verifikasi koneksi:

```powershell
psql -U porto_user -d porto_db -h localhost
```

### 1.4 Clone & Install Dependencies

```powershell
git clone <repository-url> 2026-porto
cd 2026-porto
npm install
```

### 1.5 Konfigurasi Environment

Edit file `.env`:

```env
DATABASE_URL="postgresql://porto_user:porto_dev_password@localhost:5432/porto_db?schema=public"
AUTH_SECRET="ganti-dengan-random-string-minimal-32-karakter"
NEXTAUTH_URL="http://localhost:3000"
```

Generate `AUTH_SECRET`:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 1.6 Migrasi Database & Seed

```powershell
npx prisma migrate dev --name init
npm run db:seed
```

> Ganti password admin sebelum seed! Buka `prisma/seed.ts` dan ubah:
> ```ts
> password: await bcrypt.hash("GANTI-PASSWORD-KAMU", 12),
> ```

### 1.7 Jalankan Development Server

```powershell
npm run dev
```

Aplikasi berjalan di **http://localhost:3000**

| URL | Keterangan |
|---|---|
| `http://localhost:3000` | Halaman utama portfolio |
| `http://localhost:3000/blog` | Daftar artikel blog |
| `http://localhost:3000/admin` | Dashboard admin (butuh login) |
| `http://localhost:3000/admin/login` | Halaman login admin |

### 1.8 Perintah Berguna (Native Windows)

```powershell
npm run dev          # Jalankan dev server
npm run db:migrate   # Buat migrasi baru
npm run db:seed      # Isi ulang data awal
npm run db:studio    # Buka Prisma Studio (GUI database)

# Restart PostgreSQL (jika perlu)
Restart-Service postgresql-x64-16
```

---

## Bagian 2: Development di Windows (Docker)

Jalur ini menggunakan Docker hanya untuk PostgreSQL, Next.js tetap dijalankan native.

### 2.1 Prasyarat

- [Node.js 20+](https://nodejs.org/)
- [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

### 2.2 Clone & Install

```powershell
git clone <repository-url> 2026-porto
cd 2026-porto
npm install
```

### 2.3 Konfigurasi Environment

```env
DATABASE_URL="postgresql://porto_user:porto_dev_password@localhost:5432/porto_db?schema=public"
AUTH_SECRET="ganti-dengan-random-string-minimal-32-karakter"
NEXTAUTH_URL="http://localhost:3000"
```

### 2.4 Jalankan PostgreSQL via Docker

```powershell
docker compose -f docker-compose.dev.yml up -d
docker ps
```

Container `porto_postgres_dev` harus berstatus `Up`.

### 2.5 Migrasi & Seed

```powershell
npx prisma migrate dev --name init
npm run db:seed
```

### 2.6 Jalankan Development Server

```powershell
npm run dev
```

### 2.7 Perintah Berguna (Docker Windows)

```powershell
npm run dev          # Jalankan dev server
npm run db:migrate   # Buat migrasi baru
npm run db:seed      # Isi ulang data awal
npm run db:studio    # Buka Prisma Studio

# Stop PostgreSQL container
docker compose -f docker-compose.dev.yml down

# Stop + hapus data (reset total)
docker compose -f docker-compose.dev.yml down -v
```

---

## Bagian 3: Development di Ubuntu (Native)

Jalur ini menjalankan PostgreSQL langsung di Ubuntu tanpa Docker.

### 3.1 Prasyarat

- Ubuntu 20.04+ (desktop atau server)
- Akses sudo

### 3.2 Install PostgreSQL 16

```bash
# Tambah repository resmi PostgreSQL
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg
sudo apt update

# Install PostgreSQL 16
sudo apt install -y postgresql-16 postgresql-client-16

# Verifikasi
sudo systemctl status postgresql
psql --version
```

### 3.3 Konfigurasi PostgreSQL

```bash
# Login sebagai postgres user
sudo -u postgres psql
```

Di dalam psql:

```sql
-- Buat user
CREATE USER porto_user WITH PASSWORD 'porto_dev_password';

-- Buat database
CREATE DATABASE porto_db OWNER porto_user;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE porto_db TO porto_user;

\q
```

Konfigurasi password authentication:

```bash
# Edit pg_hba.conf
sudo nano /etc/postgresql/16/main/pg_hba.conf
```

Cari baris dan ubah `peer` atau `scram-sha-256` menjadi `md5` untuk koneksi local:

```
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
```

Restart PostgreSQL:

```bash
sudo systemctl restart postgresql
```

Verifikasi koneksi:

```bash
psql -U porto_user -d porto_db -h localhost
```

### 3.4 Clone & Install

```bash
git clone <repository-url> 2026-porto
cd 2026-porto
npm install
```

### 3.5 Konfigurasi Environment

```bash
cp .env.example .env  # atau buat manual
nano .env
```

```env
DATABASE_URL="postgresql://porto_user:porto_dev_password@localhost:5432/porto_db?schema=public"
AUTH_SECRET="ganti-dengan-random-string-minimal-32-karakter"
NEXTAUTH_URL="http://localhost:3000"
```

### 3.6 Migrasi & Seed

```bash
npx prisma migrate dev --name init
npm run db:seed
```

### 3.7 Jalankan Development Server

```bash
npm run dev
```

Aplikasi berjalan di **http://localhost:3000**

| URL | Keterangan |
|---|---|
| `http://localhost:3000` | Halaman utama portfolio |
| `http://localhost:3000/blog` | Daftar artikel blog |
| `http://localhost:3000/admin` | Dashboard admin (butuh login) |
| `http://localhost:3000/admin/login` | Halaman login admin |

### 3.8 Perintah Berguna (Native Ubuntu)

```bash
npm run dev          # Jalankan dev server
npm run db:migrate   # Buat migrasi baru
npm run db:seed      # Isi ulang data awal
npm run db:studio    # Buka Prisma Studio

# Restart PostgreSQL
sudo systemctl restart postgresql

# Cek status PostgreSQL
sudo systemctl status postgresql
```

---

## Bagian 4: Deploy ke Ubuntu dari Nol (Native)

Panduan lengkap dari VPS fresh (Ubuntu 24.04) hingga aplikasi live dengan HTTPS. Menggunakan PostgreSQL + Node.js + Nginx + systemd (tanpa Docker).

### 4.1 Koneksi & Update Server

```bash
ssh root@IP_VPS_KAMU
apt update && apt upgrade -y
```

### 4.2 Setup Firewall (UFW)

```bash
apt install -y ufw

ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS

ufw enable
ufw status
```

### 4.3 Install Node.js 20 LTS

```bash
# Tambah NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -

# Install Node.js
apt install -y nodejs

# Verifikasi
node --version   # harus v20.x
npm --version    # harus 10.x
```

### 4.4 Install & Konfigurasi PostgreSQL 16

```bash
# Tambah repository PostgreSQL
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg
sudo apt update

# Install PostgreSQL 16
apt install -y postgresql-16 postgresql-client-16

# Verifikasi berjalan
sudo systemctl status postgresql
sudo systemctl enable postgresql
```

Buat database dan user untuk production:

```bash
sudo -u postgres psql
```

```sql
CREATE USER porto_user WITH PASSWORD 'GANTI_PASSWORD_KUAT_MIN_20_KARAKTER';
CREATE DATABASE porto_db OWNER porto_user;
GRANT ALL PRIVILEGES ON DATABASE porto_db TO porto_user;
\q
```

Konfigurasi authentication:

```bash
sudo nano /etc/postgresql/16/main/pg_hba.conf
```

Ubah baris local connections ke `md5`:

```
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5
```

```bash
sudo systemctl restart postgresql
```

### 4.5 Clone Repository & Setup Environment

```bash
# Buat user khusus aplikasi (opsional, recommended)
sudo adduser --system --group --home /var/www/porto porto-app

# Clone repository
mkdir -p /var/www
cd /var/www
git clone <repository-url> porto
cd porto

# Setup environment
cp .env.production.example .env
nano .env
```

Isi `.env`:

```env
DATABASE_URL="postgresql://porto_user:GANTI_PASSWORD_KUAT@localhost:5432/porto_db?schema=public"
AUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=https://yourdomain.com
```

> Generate AUTH_SECRET: `openssl rand -base64 32`

### 4.6 Build Next.js Production

```bash
cd /var/www/porto
npm install
npx prisma generate
npm run build
```

### 4.7 Database Migration & Seed

```bash
npx prisma migrate deploy
npm run db:seed
```

### 4.8 Buat systemd Service

```bash
sudo nano /etc/systemd/system/porto.service
```

Isi file service:

```ini
[Unit]
Description=Portfolio Next.js Application
After=network.target postgresql.service

[Service]
Type=simple
User=root
WorkingDirectory=/var/www/porto
ExecStart=/usr/bin/node /var/www/porto/.next/standalone/server.js
Restart=on-failure
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOSTNAME=0.0.0.0

[Install]
WantedBy=multi-user.target
```

> Catatan: Jika menggunakan standalone output, pastikan `next.config.mjs` memiliki `output: "standalone"`. File `.env` akan dibaca otomatis dari working directory.

Start dan enable service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable porto
sudo systemctl start porto

# Verifikasi
sudo systemctl status porto
curl http://localhost:3000
```

### 4.9 Install & Konfigurasi Nginx

```bash
apt install -y nginx
nano /etc/nginx/sites-available/porto
```

Isi konfigurasi Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/porto /etc/nginx/sites-enabled/porto
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

### 4.10 SSL dengan Let's Encrypt

```bash
apt install -y certbot python3-certbot-nginx

certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Verifikasi auto-renewal
certbot renew --dry-run
```

Setelah selesai, website bisa diakses via **https://yourdomain.com**.

### 4.11 Verifikasi Final

```bash
# Cek semua service berjalan
sudo systemctl status postgresql
sudo systemctl status porto
sudo systemctl status nginx

# Cek port
ss -tlnp | grep -E ':(3000|80|443|5432)'

# Test dari luar
curl -I https://yourdomain.com
```

---

## Bagian 5: Deploy ke Ubuntu (Docker)

Jalur ini menggunakan Docker untuk menjalankan semua service.

### 5.1 Prasyarat

- VPS Ubuntu 24.04 dengan akses root/sudo via SSH
- Domain yang sudah diarahkan ke IP VPS (untuk HTTPS)

### 5.2 Koneksi & Update Server

```bash
ssh root@IP_VPS_KAMU
apt update && apt upgrade -y
```

### 5.3 Keamanan Dasar (Firewall)

```bash
apt install -y ufw
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
ufw status
```

### 5.4 Install Docker Engine

```bash
apt install -y ca-certificates curl gnupg

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

docker --version
docker compose version
```

### 5.5 Clone Repository

```bash
mkdir -p /var/www
cd /var/www
git clone <repository-url> porto
cd porto
```

### 5.6 Setup Environment Production

```bash
cp .env.production.example .env
nano .env
```

```env
POSTGRES_DB=porto_db
POSTGRES_USER=porto_user
POSTGRES_PASSWORD=P@ssw0rd_Aman_Minimal_20_Karakter!

DATABASE_URL="postgresql://porto_user:P@ssw0rd_Aman_Minimal_20_Karakter!@postgres:5432/porto_db?schema=public"

AUTH_SECRET=hasil_dari_openssl_rand_base64_32

NEXTAUTH_URL=https://yourdomain.com
```

> Generate AUTH_SECRET: `openssl rand -base64 32`
>
> **PENTING:** `DATABASE_URL` menggunakan hostname `postgres` (nama service Docker), **bukan** `localhost`.

### 5.7 Build & Jalankan Container

```bash
docker compose up -d --build
```

Docker akan otomatis menjalankan dalam urutan:
1. `postgres` -> tunggu sampai healthy
2. `migrate` -> jalankan `prisma migrate deploy`, lalu exit
3. `web` -> start Next.js setelah migrate selesai

```bash
docker compose logs -f
docker compose ps
```

Aplikasi berjalan di `http://IP_VPS:3000`

### 5.8 Seed Data Admin (Pertama Kali)

```bash
docker compose run --rm migrate npx prisma db seed
```

> Pastikan password admin di `prisma/seed.ts` sudah diupdate sebelum seeding.

### 5.9 Install & Konfigurasi Nginx

```bash
apt install -y nginx
nano /etc/nginx/sites-available/porto
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/porto /etc/nginx/sites-enabled/porto
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

### 5.10 SSL dengan Let's Encrypt

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
certbot renew --dry-run
```

---

## Bagian 6: Maintenance

### 6.1 Update Aplikasi (Native)

```bash
cd /var/www/porto
git pull origin main
npm install
npm run build
npx prisma migrate deploy
sudo systemctl restart porto
```

### 6.2 Update Aplikasi (Docker)

```bash
cd /var/www/porto
git pull origin main
docker compose up -d --build
docker compose logs -f web
```

### 6.3 Backup Database

```bash
# Native PostgreSQL
pg_dump -U porto_user -h localhost porto_db > backup_$(date +%Y%m%d).sql

# Docker PostgreSQL
docker exec porto_postgres pg_dump -U porto_user porto_db > backup_$(date +%Y%m%d).sql
```

### 6.4 Restore Database

```bash
# Native PostgreSQL
psql -U porto_user -h localhost porto_db < backup_20260101.sql

# Docker PostgreSQL
docker exec -i porto_postgres psql -U porto_user porto_db < backup_20260101.sql
```

### 6.5 Cek Logs (Native)

```bash
# Logs aplikasi via systemd
sudo journalctl -u porto -f

# Logs Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Logs PostgreSQL
sudo tail -f /var/log/postgresql/postgresql-16-main.log
```

### 6.6 Cek Logs (Docker)

```bash
docker compose logs -f web
docker compose logs -f postgres
```

### 6.7 Perintah Maintenance Lainnya

```bash
# Cek status service (Native)
sudo systemctl status porto
sudo systemctl status postgresql
sudo systemctl status nginx

# Cek status container (Docker)
docker compose ps

# Restart hanya aplikasi (Native)
sudo systemctl restart porto

# Restart hanya aplikasi (Docker, tanpa rebuild)
docker compose restart web

# Masuk ke PostgreSQL (Native)
psql -U porto_user -d porto_db -h localhost

# Masuk ke PostgreSQL (Docker)
docker compose exec postgres psql -U porto_user -d porto_db
```

---

## Bagian 7: Troubleshooting

### 7.1 PostgreSQL

| Masalah | Solusi |
|---|---|
| Koneksi ditolak | Cek PostgreSQL berjalan: `sudo systemctl status postgresql` |
| Password authentication gagal | Pastikan `pg_hba.conf` menggunakan `md5`, lalu restart PostgreSQL |
| Port 5432 tidak terbuka | Cek `ss -tlnp | grep 5432` dan pastikan firewall mengizinkan |
| Database tidak ditemukan | Verifikasi: `psql -U postgres -l` untuk list semua database |
| Docker: container tidak healthy | `docker compose logs postgres` untuk cek error |

### 7.2 Next.js Application

| Masalah | Solusi |
|---|---|
| Build gagal | Cek error di output `npm run build`. Biasanya type error atau missing dependency |
| `DATABASE_URL` error | Pastikan format benar: `postgresql://user:pass@host:5432/db?schema=public` |
| Port 3000 sudah digunakan | `ss -tlnp | grep 3000` lalu kill process yang menggunakannya |
| Halaman blank/kosong | Cek logs: `sudo journalctl -u porto -n 50` |
| Docker: container restart loop | `docker compose logs web` untuk cek error |

### 7.3 systemd Service

| Masalah | Solusi |
|---|---|
| Service gagal start | `sudo systemctl status porto` untuk cek error, lalu `sudo journalctl -u porto -n 50` |
| Service tidak auto-start | `sudo systemctl enable porto` |
| Permission denied | Pastikan user di service file punya akses ke `/var/www/porto` |
| ExecStart not found | Pastikan path ke `server.js` benar: `/var/www/porto/.next/standalone/server.js` |

### 7.4 Nginx

| Masalah | Solusi |
|---|---|
| 502 Bad Gateway | Pastikan Next.js berjalan di port 3000: `curl http://localhost:3000` |
| Config syntax error | `sudo nginx -t` untuk test konfigurasi |
| Site tidak bisa diakses | Cek `ufw status`, pastikan port 80/443 terbuka |
| Nginx tidak start | `sudo systemctl status nginx` dan `sudo journalctl -u nginx -n 50` |

### 7.5 SSL / Let's Encrypt

| Masalah | Solusi |
|---|---|
| Certbot gagal | Pastikan domain sudah mengarah ke IP VPS: `dig yourdomain.com` |
| Sertifikat expired | `sudo certbot renew` atau cek cron job: `sudo systemctl list-timers` |
| HTTPS redirect loop | Pastikan Nginx config tidak double redirect |
| Mixed content | Pastikan semua resource menggunakan HTTPS |

### 7.6 Permission Issues

```bash
# Fix ownership aplikasi
sudo chown -R root:root /var/www/porto

# Fix permission file
sudo chmod -R 755 /var/www/porto

# Fix PostgreSQL data directory (jika permission error)
sudo chown -R postgres:postgres /var/lib/postgresql/16/
```
