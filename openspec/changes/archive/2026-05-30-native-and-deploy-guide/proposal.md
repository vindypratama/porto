## Why

Dokumentasi deployment saat ini (README.md, DEPLOYMENT.md) hanya mencakup pendekatan Docker-based. Belum ada panduan untuk menjalankan aplikasi secara native (PostgreSQL langsung di sistem, Node.js tanpa container) yang berguna untuk development tanpa Docker atau troubleshooting. Selain itu, panduan deploy ke Ubuntu dari nol belum terstruktur secara lengkap dari setup VPS fresh hingga aplikasi live.

## What Changes

- **Panduan Native Development** — instruksi menjalankan aplikasi tanpa Docker: install PostgreSQL langsung di Windows/Ubuntu, jalankan Next.js dengan `npm run dev` atau `npm run start`.
- **Panduan Deploy Ubuntu dari Nol** — step-by-step dari VPS fresh (Ubuntu 24.04) hingga aplikasi live dengan HTTPS, mencakup: setup user, firewall, PostgreSQL native, Node.js, Nginx, SSL, systemd service, dan maintenance.
- **Perapihan DEPLOYMENT.md** — reorganisasi menjadi panduan yang lebih terstruktur dengan dua jalur: Native vs Docker.
- **Penambahan troubleshooting section** yang lebih lengkap untuk kedua jalur.

## Capabilities

### New Capabilities

- `native-setup`: Panduan menjalankan aplikasi secara native tanpa Docker — install PostgreSQL langsung di sistem, konfigurasi database, jalankan Next.js langsung dengan Node.js.
- `ubuntu-deploy-from-scratch`: Panduan deploy ke VPS Ubuntu 24.04 dari nol — dari fresh VPS hingga aplikasi live dengan HTTPS, menggunakan PostgreSQL native + Node.js + Nginx + systemd.

### Modified Capabilities

_(Tidak ada existing specs yang perlu dimodifikasi.)_

## Impact

- **Affected files**: `DEPLOYMENT.md` akan di-reorganisasi, `README.md` mungkin perlu update link ke section baru.
- **APIs**: Tidak ada perubahan.
- **Dependencies**: Tidak ada penambahan npm package. Untuk native setup, user perlu install PostgreSQL dan Node.js langsung di sistem.
- **Systems**: Tidak ada perubahan pada Dockerfile atau docker-compose. Ini hanya dokumentasi.
