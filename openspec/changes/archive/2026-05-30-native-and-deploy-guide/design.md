## Context

Portfolio project "2026-porto" saat ini memiliki dokumentasi deployment di dua file: `README.md` dan `DEPLOYMENT.md`. Keduanya hanya mencakup pendekatan Docker-based untuk production dan Docker-for-PostgreSQL-only untuk development.

Pendekatan native (PostgreSQL langsung di sistem, Node.js tanpa container) belum terdokumentasi. Hal ini penting untuk:
- Developer yang tidak ingin install Docker
- Server dengan resource terbatas (Docker memakan overhead)
- Debugging dan troubleshooting yang lebih mudah
- Pemahaman yang lebih baik tentang stack yang digunakan

### Dokumentasi Saat Ini
- `README.md` — ringkasan tech stack, system requirements, instalasi Windows (Docker untuk DB), instalasi Ubuntu (full Docker)
- `DEPLOYMENT.md` — panduan detail yang sama, lebih verbose
- Kedua file redundan dan hanya cover Docker path

## Goals / Non-Goals

**Goals:**
- Buat panduan native development untuk Windows (PostgreSQL langsung di Windows, tanpa Docker)
- Buat panduan native development untuk Ubuntu (PostgreSQL langsung di Ubuntu, tanpa Docker)
- Buat panduan deploy ke Ubuntu VPS dari nol menggunakan native stack (PostgreSQL + Node.js + Nginx + systemd, tanpa Docker)
- Reorganisasi `DEPLOYMENT.md` menjadi panduan terstruktur dengan dua jalur: Native vs Docker
- Tambahkan troubleshooting section yang lebih lengkap

**Non-Goals:**
- Tidak mengubah Dockerfile atau docker-compose (Docker path tetap ada)
- Tidak menambahkan npm package baru
- Tidak mengubah kode aplikasi
- Tidak membuat script otomatis (shell script) — tetap manual step-by-step
- Tidak menambahkan CI/CD pipeline

## Decisions

### 1. Dua Jalur: Native vs Docker

**Keputusan**: Dokumentasi akan menyediakan dua jalur — Native dan Docker — sebagai alternatif.

**Alasan**:
- Memberikan fleksibilitas sesuai kebutuhan dan preference developer
- Native lebih ringan dan mudah di-debug
- Docker lebih konsisten dan mudah di-deploy
- Tidak memaksa satu pendekatan

### 2. Native PostgreSQL di Windows

**Keputusan**: Gunakan PostgreSQL resmi untuk Windows (installer dari postgresql.org), bukan WSL.

**Alasan**:
- Lebih straightforward untuk developer Windows
- Tidak memerlukan WSL setup
- PostgreSQL Windows installer sudah include pgAdmin
- DATABASE_URL tetap sama: `postgresql://user:pass@localhost:5432/db`

### 3. Systemd untuk Production Native

**Keputusan**: Gunakan systemd untuk manage Next.js process di production Ubuntu, bukan PM2 atau process manager lain.

**Alasan**:
- systemd sudah built-in di Ubuntu, tidak perlu install package tambahan
- Sudah terintegrasi dengan logging (journalctl)
- Support auto-restart, dependency ordering
- Standar untuk Ubuntu server management

### 4. Struktur DEPLOYMENT.md

**Keputusan**: Reorganisasi `DEPLOYMENT.md` menjadi 3 bagian utama:
1. Development (Windows) — dengan sub-section Native dan Docker
2. Production (Ubuntu) — dengan sub-section Native dan Docker
3. Maintenance & Troubleshooting

**Alasan**:
- Lebih mudah navigasi
- User bisa pilih jalur yang sesuai
- Troubleshooting terpusat

### 5. PostgreSQL Authentication

**Keputusan**: Untuk native setup, gunakan password authentication (md5/scram-sha-256), bukan peer authentication.

**Alasan**:
- Konsisten dengan Docker approach (password-based)
- DATABASE_URL format sama untuk semua environment
- Lebih mudah di-troubleshoot

## Risks / Trade-offs

**[Risk] Dokumentasi terlalu panjang** → Mitigasi: Pisahkan menjadi section-section yang jelas dengan table of contents. User bisa langsung lompat ke section yang relevan.

**[Risk] Native setup lebih banyak step manual** → Mitigasi: Setiap step punya verifikasi command. Jika gagal, user tahu persis di step mana.

**[Risk] PostgreSQL version mismatch** → Mitigasi: Specify exact version (PostgreSQL 16) di semua instruksi. Berikan cara cek versi.

**[Trade-off] Dua jalur = lebih banyak maintenance** → Diterima karena manfaat fleksibilitas lebih besar. Kedua jalur tested dan didokumentasikan.

## Migration Plan

1. Buat section "Native Development (Windows)" di DEPLOYMENT.md
2. Buat section "Native Development (Ubuntu)" di DEPLOYMENT.md
3. Buat section "Deploy ke Ubuntu dari Nol (Native)" di DEPLOYMENT.md
4. Reorganisasi existing Docker sections
5. Tambahkan troubleshooting untuk native path
6. Update README.md dengan link ke kedua jalur

**Rollback**: Karena ini hanya perubahan dokumentasi, rollback adalah revert ke versi sebelumnya.

## Open Questions

_(Tidak ada — semua keputusan sudah diambil.)_
