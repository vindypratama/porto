## Why

Project memiliki beberapa file dan directory yang tidak lagi diperlukan: `.claude/` (leftover dari Claude Code), `.github/prompts/` dan `.github/skills/` (duplikat dari `.kilocode/`), `ROADMAP.md` (outdated — semua item sudah selesai atau terdokumentasi di README/DEPLOYMENT.md), dan `.gitignore` yang tidak lengkap (missing `.next/`, `*.tsbuildinfo`).

## What Changes

- **Hapus `.claude/`** — Config Claude Code, tidak digunakan karena project menggunakan Kilo
- **Hapus `.github/prompts/`** — Duplikat dari `.kilocode/skills/`
- **Hapus `.github/skills/`** — Duplikat dari `.kilocode/skills/`
- **Hapus `.github/`** (jika kosong setelah hapus prompts dan skills)
- **Hapus `ROADMAP.md`** — Outdated, semua item sudah selesai atau terdokumentasi di README.md dan DEPLOYMENT.md
- **Update `.gitignore`** — Tambahkan `.next/`, `*.tsbuildinfo`, `next-env.d.ts` untuk mencegah file generated masuk ke version control

## Capabilities

### New Capabilities

- `file-cleanup`: Hapus file dan directory yang tidak diperlukan, update .gitignore

### Modified Capabilities

_(Tidak ada existing specs yang perlu dimodifikasi.)_

## Impact

- **Affected files**: `.claude/`, `.github/`, `ROADMAP.md`, `.gitignore`
- **APIs**: Tidak ada perubahan
- **Dependencies**: Tidak ada
- **Systems**: Tidak ada — ini hanya cleanup file non-code
