# Kelola Proyek Portfolio

Halaman manajemen proyek (`/admin/projects`) memungkinkan admin untuk mengedit dan mengelola proyek yang ditampilkan di halaman portfolio publik.

## Daftar Proyek

### URL: `/admin/projects`

Menampilkan tabel semua proyek. Kolom yang ditampilkan:

| Kolom | Keterangan |
|---|---|
| Ikon | Ikon proyek |
| Judul | Nama proyek |
| Subtitle | Deskripsi singkat proyek |
| Domain | Kategori domain (contoh: B2B E-Commerce, Industrial IoT) |
| Tech | Teknologi yang digunakan (ditampilkan sebagai tag) |
| Status | Badge `Published` (hijau) atau `Draft` (kuning) |
| Aksi | Tombol edit dan hapus |

## Data Proyek

Setiap proyek memiliki field berikut:

| Field | Keterangan |
|---|---|
| Title | Judul proyek |
| Subtitle | Deskripsi singkat satu baris |
| Description | Deskripsi lengkap proyek |
| Domain | Kategori domain proyek (contoh: B2B E-Commerce, Enterprise WMS) |
| Highlights | Daftar keunggulan/fitur utama proyek |
| Tech | Array teknologi yang digunakan |
| Gradient | Warna gradient untuk tampilan kartu |
| Ikon | Ikon proyek |
| Order | Urutan tampilan (angka lebih kecil tampil lebih dulu) |
| Published | Status publikasi (true/false) |

## Aksi pada Daftar

- **Edit** — membuka form edit untuk proyek tersebut
- **Hapus** — menghapus proyek (dengan konfirmasi)

## Edit Proyek

Klik tombol edit untuk mengubah data proyek. Form edit menampilkan semua field proyek yang dapat diubah.

## Publikasi

Proyek hanya tampil di halaman portfolio publik (`/`) jika statusnya `published`. Ubah status publikasi melalui form edit proyek.
