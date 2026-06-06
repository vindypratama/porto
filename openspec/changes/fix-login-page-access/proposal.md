## Why

Halaman login admin (`/admin/login`) tidak bisa diakses oleh user yang belum login. Ketika user membuka `/admin/login`, layout admin (`app/admin/layout.tsx`) melakukan pengecekan session server-side dan me-redirect ke `/admin/login` karena tidak ada session — menciptakan infinite redirect loop. Proxy (`proxy.ts`) sudah benar mengecualikan `/admin/login`, tetapi layout tidak.

## What Changes

- Modifikasi `app/admin/layout.tsx` untuk mengecualikan halaman login dari pengecekan session
- Pastikan `/admin/login` dapat diakses tanpa autentikasi
- Pastikan semua route `/admin/*` lainnya tetap membutuhkan session valid

## Capabilities

### New Capabilities

_Tidak ada capability baru — ini adalah bug fix._

### Modified Capabilities

- `proxy-migration`: Memperbaiki logika proteksi route agar login page tidak terkena session check di layout

## Impact

- **File yang berubah**: `app/admin/layout.tsx`
- **Tidak ada breaking change**: Perubahan hanya memperbaiki akses login page
- **Tidak ada perubahan API atau dependency**
