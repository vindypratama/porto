# Blog

Halaman blog (`/blog`) menampilkan artikel-artikel yang telah dipublikasikan oleh admin. Pengunjung dapat menjelajahi dan membaca artikel secara gratis.

## Halaman Blog Listing

### URL: `/blog`

Menampilkan daftar semua artikel dengan status `PUBLISHED` dalam bentuk kartu (card grid). Setiap kartu menampilkan:

- **Gambar sampul** (cover image) — jika tersedia
- **Judul artikel**
- **Ringkasan** (excerpt)
- **Tanggal publikasi**
- **Tag/label** artikel

Jika belum ada artikel yang dipublikasikan, halaman menampilkan pesan kosong.

### Navigasi

Klik pada kartu artikel untuk membuka halaman detail artikel.

## Halaman Detail Artikel

### URL: `/blog/[slug]`

Menampilkan konten lengkap dari satu artikel. Elemen yang ditampilkan:

- **Gambar sampul** (cover image) — di bagian atas
- **Tag/label** — kategori artikel
- **Judul artikel**
- **Metadata** — tanggal publikasi, estimasi waktu baca, nama penulis
- **Konten** — ditulis dalam format Markdown, dirender dengan syntax highlighting untuk blok kode

### Fitur

- **Markdown rendering** — konten mendukung teks tebal, miring, daftar, tabel, blok kode dengan syntax highlighting, dan tautan
- **SEO** — halaman memiliki meta tag yang optimal untuk mesin pencari dan social media sharing (Open Graph)
- **Reading time** — estimasi waktu baca dihitung otomatis berdasarkan jumlah kata

### Kembali ke Blog

Gunakan tautan navigasi atau tombol browser untuk kembali ke halaman blog listing.
