## 1. File Migration

- [x] 1.1 Buat file `proxy.ts` dengan isi yang sama dari `middleware.ts` (copy content)
- [x] 1.2 Hapus file `middleware.ts`

## 2. Verification

- [x] 2.1 Hapus cache build `.next` untuk memastikan tidak ada referensi lama
- [x] 2.2 Jalankan `npm run build` — pastikan tidak ada warning "middleware is deprecated"
- [x] 2.3 Jalankan `npm run dev` — pastikan tidak ada warning "middleware is deprecated"
- [x] 2.4 Verifikasi admin route protection masih berfungsi (redirect ke /admin/login jika tidak login)
