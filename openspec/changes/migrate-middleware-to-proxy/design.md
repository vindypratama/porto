## Context

Project Next.js 16.2.6 memiliki file `middleware.ts` yang menggunakan NextAuth `auth()` wrapper untuk proteksi route `/admin/*`. Next.js 16 mengganti konvensi `middleware.ts` menjadi `proxy.ts`. Saat ini muncul warning setiap kali build atau dev server dijalankan.

Current state:
- `middleware.ts` berisi `export default auth(...)` dengan config matcher `["/admin/:path*"]`
- Logic: redirect ke `/admin/login` jika tidak ada sesi Auth.js
- File berada di root project (sama level dengan `app/`)

## Goals / Non-Goals

**Goals:**
- Menghilangkan deprecation warning dari Next.js 16
- Mengikuti konvensi terbaru Next.js (`proxy.ts`)
- Memastikan behavior autentikasi admin route tetap sama

**Non-Goals:**
- Tidak mengubah logic autentikasi
- Tidak mengubah config matcher
- Tidak menambah fitur baru

## Decisions

### Decision 1: Rename file saja, tanpa ubah logic
**Rationale**: Karena `export default auth(...)` sudah merupakan default export, dan Next.js proxy convention mendukung default export, tidak perlu mengubah function signature. Cukup rename file dari `middleware.ts` ke `proxy.ts`.
**Alternatives yang dipertimbangkan**:
- Menggunakan `npx @next/codemod@canary middleware-to-proxy .` — ditolak karena codemod hanya rename file dan function name, sedangkan kita menggunakan default export yang tidak perlu diubah
- Mengubah ke named export `proxy` — ditolak karena `auth()` wrapper mengembalikan function yang perlu di-export sebagai default

### Decision 2: Hapus file lama, buat file baru
**Rationale**: Lebih clean daripada menggunakan `git mv` karena memastikan tidak ada cache atau referensi lama.

## Risks / Trade-offs

- **[Risk]** NextAuth `auth()` wrapper mungkin tidak kompatibel dengan proxy convention → **Mitigation**: Sudah diverifikasi di dokumentasi Next.js — default export didukung
- **[Risk]** Cache build lama masih mereferensikan middleware → **Mitigation**: Jalankan `rm -rf .next` sebelum build pertama setelah migrasi
