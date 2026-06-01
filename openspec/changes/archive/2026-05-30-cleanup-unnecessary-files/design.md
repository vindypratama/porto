## Context

Project "2026-porto" telah melalui beberapa iterasi development dengan berbagai AI tools (Claude Code, GitHub Copilot, Kilo). Setiap tool meninggalkan config directory masing-masing. Selain itu, `ROADMAP.md` yang dibuat di awal project sudah tidak relevan karena semua item sudah selesai atau terdokumentasi di README.md/DEPLOYMENT.md.

`.gitignore` juga perlu diupdate karena tidak mencakup file generated seperti `.next/` dan `next-env.d.ts`.

## Goals / Non-Goals

**Goals:**
- Hapus config directory yang tidak digunakan (`.claude/`, `.github/`)
- Hapus dokumentasi outdated (`ROADMAP.md`)
- Update `.gitignore` agar lebih lengkap

**Non-Goals:**
- Tidak menghapus `.kilocode/` (active config)
- Tidak menghapus `openspec/` (active workflow)
- Tidak mengubah kode aplikasi
- Tidak menghapus Docker atau Prisma related files

## Decisions

### 1. Hapus `.claude/` dan `.github/`

**Keputusan**: Hapus kedua directory.

**Alasan**: `.claude/` berisi config untuk Claude Code yang tidak digunakan. `.github/prompts/` dan `.github/skills/` berisi OpenSpec config yang duplikat dari `.kilocode/skills/`.

### 2. Hapus `ROADMAP.md`

**Keputusan**: Hapus file ini.

**Alasan**: Semua item di roadmap sudah selesai (Fase 1-3) atau sudah terdokumentasi di DEPLOYMENT.md (Fase 4-5). File ini hanya membingungkan user baru.

### 3. Update `.gitignore`

**Keputusan**: Tambahkan entries untuk Next.js generated files.

**Alasan**: `.next/`, `next-env.d.ts`, dan `*.tsbuildinfo` adalah file generated yang tidak boleh masuk version control.

## Risks / Trade-offs

**[Risk] Menghapus file yang masih dibutuhkan** → Mitigasi: Hanya hapus file yang sudah diverifikasi tidak digunakan.

**[Trade-off] Kehilangan history roadmap** → Diterima karena roadmap sudah tidak relevan dan informasinya sudah ada di README/DEPLOYMENT.
