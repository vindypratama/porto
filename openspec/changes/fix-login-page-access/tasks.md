## 1. Fix Admin Layout Session Check

- [ ] 1.1 Import `headers` from `next/headers` di `app/admin/layout.tsx`
- [ ] 1.2 Dapatkan pathname dari `headers()` dan cek apakah route adalah `/admin/login`
- [ ] 1.3 Skip redirect ke `/admin/login` jika user sudah berada di halaman login
- [ ] 1.4 Pastikan sidebar dan elemen layout lainnya tetap dirender untuk login page (atau di-sesuaikan)

## 2. Verifikasi

- [ ] 2.1 Test akses `/admin/login` tanpa session — harusnya menampilkan form login
- [ ] 2.2 Test akses `/admin/posts` tanpa session — harusnya redirect ke `/admin/login`
- [ ] 2.3 Test akses `/admin` dengan session — harusnya menampilkan dashboard
- [ ] 2.4 Jalankan `npm run build` dan pastikan tidak ada error
