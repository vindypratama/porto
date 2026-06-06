## Context

Portfolio admin panel menggunakan Auth.js v5 dengan JWT + Credentials provider. Route `/admin/*` diproteksi oleh dua lapisan:

1. **Proxy (`proxy.ts`)** — Auth.js middleware yang me-redirect unauthenticated request ke `/admin/login`. Sudah benar mengecualikan `/admin/login`.
2. **Admin Layout (`app/admin/layout.tsx`)** — Server component yang melakukan `await auth()` dan me-redirect ke `/admin/login` jika tidak ada session. **Tidak** mengecualikan `/admin/login`.

Masalah: Login page (`app/admin/login/page.tsx`) berada di dalam admin layout. Ketika user mengakses `/admin/login` tanpa session, layout melakukan redirect ke `/admin/login` → infinite loop.

## Goals / Non-Goals

**Goals:**
- Halaman `/admin/login` dapat diakses tanpa autentikasi
- Semua route `/admin/*` lainnya tetap membutuhkan session valid
- Tidak mengubah behavior proxy.ts yang sudah benar

**Non-Goals:**
- Tidak mengubah struktur folder atau memindahkan login page
- Tidak mengubah mekanisme autentikasi (Auth.js config)
- Tidak menambah fitur baru

## Decisions

### 1. Cek pathname di admin layout

**Keputusan**: Tambahkan pengecekan `pathname` di `app/admin/layout.tsx` untuk me-redirect hanya jika bukan halaman login.

**Alasan**:
- Perubahan minimal — hanya 1 file yang diubah
- Tidak memerlukan restrukturisasi folder (route groups, dll)
- Konsisten dengan pendekatan yang sama di `proxy.ts`

**Alternatif yang dipertimbangkan**:
- **Route group `(admin)/`**: Memindahkan login ke luar layout admin. Terlalu banyak perubahan struktur folder.
- **Conditional layout**: Membuat layout terpisah untuk login. Over-engineering untuk bug fix sederhana.

### 2. Menggunakan `headers()` untuk mendapatkan pathname

**Keputusan**: Gunakan `headers()` dari `next/headers` untuk mendapatkan URL dan extract pathname.

**Alasan**: Di server component, `usePathname()` dari `next/navigation` tidak tersedia. `headers()` adalah cara standar untuk mendapatkan request URL di server.

## Risks / Trade-offs

- **[Risk]** Jika ada route `/admin/login/*` (nested), pengecekan `pathname === "/admin/login"` tidak akan mencakupnya → **Mitigation**: Gunakan `pathname.startsWith("/admin/login")` untuk mencakup semua nested routes di bawah login.
- **[Risk]** Perubahan pada layout bisa mempengaruhi rendering login page → **Mitigation**: Login page tetap dirender sebagai children, hanya skip redirect.
