## Why

Project ini (Next.js portfolio dengan Prisma + PostgreSQL) sudah memiliki `DEPLOYMENT.md` yang cukup lengkap, namun dokumentasi tersebut belum terstruktur dalam format yang mudah diikuti untuk setiap skenario deployment. Diperlukan panduan deployment yang lebih terorganisir dan mencakup 4 skenario utama: Windows Native, Windows Docker, Ubuntu Native, dan Ubuntu Docker — sehingga developer dapat langsung mengikuti langkah yang sesuai dengan environment mereka.

## What Changes

- Membuat panduan deployment terstruktur untuk 4 skenario:
  - **Windows Native** — PostgreSQL + Node.js langsung di Windows (development)
  - **Windows Docker** — Docker untuk PostgreSQL, Node.js native untuk Next.js (development)
  - **Ubuntu Native** — Deploy ke VPS Ubuntu tanpa Docker (production dengan systemd + Nginx + SSL)
  - **Ubuntu Docker** — Deploy ke VPS Ubuntu dengan Docker (production dengan docker-compose + Nginx + SSL)
- Setiap panduan mencakup: prasyarat, instalasi, konfigurasi, migrasi database, menjalankan aplikasi, dan troubleshooting
- Menambahkan section maintenance (update, backup, restore, monitoring)

## Capabilities

### New Capabilities
- `deployment-guide`: Panduan deployment lengkap untuk Windows dan Ubuntu, dengan dan tanpa Docker

### Modified Capabilities

## Impact

- File yang berubah: `DEPLOYMENT.md` (atau file dokumentasi baru)
- Tidak ada perubahan pada kode aplikasi, API, atau dependencies
- Dokumentasi ini akan menjadi referensi utama untuk deployment dan maintenance
