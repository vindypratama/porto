# Admin Login

Halaman login (`/admin/login`) adalah pintu masuk ke dashboard admin. Hanya pengguna terdaftar yang dapat mengakses fitur manajemen.

## Cara Login

1. Buka halaman `/admin/login` di browser
2. Masukkan **email** dan **password** yang telah terdaftar
3. Klik tombol **Login**
4. Jika berhasil, Anda akan diarahkan ke dashboard admin (`/admin`)

## Form Login

| Field | Keterangan |
|---|---|
| Email | Alamat email yang terdaftar di sistem |
| Password | Password akun (dihashing dengan bcrypt) |

### Fitur Form

- **Show/Hide password** — klik ikon mata untuk menampilkan atau menyembunyikan password
- **Loading state** — tombol menampilkan indikator loading saat proses autentikasi
- **Error handling** — pesan error ditampilkan jika email/password salah

## Setelah Login

Setelah login berhasil, Anda memiliki akses ke:

- **Dashboard** (`/admin`) — ringkasan statistik
- **Kelola Artikel** (`/admin/posts`) — CRUD artikel blog
- **Kelola Proyek** (`/admin/projects`) — CRUD proyek portfolio

## Akses yang Dilindungi

Semua halaman di bawah `/admin/*` dilindungi oleh middleware autentikasi. Jika Anda belum login dan mencoba mengakses halaman admin, Anda akan dialihkan ke halaman login.

## Logout

Untuk keluar dari dashboard admin, gunakan fungsi logout yang tersedia di sidebar admin.
