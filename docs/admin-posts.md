# Kelola Artikel Blog

Halaman manajemen artikel (`/admin/posts`) memungkinkan admin untuk membuat, mengedit, dan menghapus artikel blog.

## Daftar Artikel

### URL: `/admin/posts`

Menampilkan tabel semua artikel (termasuk draft). Kolom yang ditampilkan:

| Kolom | Keterangan |
|---|---|
| Judul | Nama artikel |
| Slug | URL-friendly identifier (contoh: `my-first-post`) |
| Status | Badge `Published` (hijau) atau `Draft` (kuning) |
| Tag | Label kategori (maksimal 2 ditampilkan, sisanya ditandai `+N`) |
| Tanggal | Tanggal pembuatan atau publikasi |
| Aksi | Tombol edit dan hapus |

### Aksi pada Daftar

- **Edit** — membuka halaman edit untuk artikel tersebut
- **Hapus** — menghapus artikel (dengan konfirmasi)
- **Toggle status** — mengubah status antara Draft dan Published

## Membuat Artikel Baru

### URL: `/admin/posts/new`

Halaman editor artikel dengan layout split-panel:

#### Panel Kiri (Sidebar)

| Field | Keterangan |
|---|---|
| Title | Judul artikel |
| Slug | URL identifier, otomatis di-generate dari judul (dapat diedit manual) |
| Excerpt | Ringkasan singkat artikel |
| Cover Image URL | URL gambar sampul (opsional) |
| Tags | Label kategori, tekan `Enter` untuk menambahkan tag baru |

#### Panel Tengah (Editor)

- **Textarea Markdown** — tulis konten artikel dalam format Markdown
- **Live Preview** — klik tombol preview untuk melihat hasil render Markdown secara real-time

#### Menyimpan Artikel

- **Save as Draft** — menyimpan sebagai draft (tidak tampil di blog publik)
- **Publish** — menyimpan dan langsung mempublikasikan ke blog publik

## Format Markdown yang Didukung

Konten artikel mendukung syntax Markdown standar:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Teks tebal**
*Teks miring*

- Daftar item
1. Daftar bernomor

[Tautan](https://example.com)

![Gambar](url-gambar)

> Blockquote

```code block```
```

## Edit Artikel

Klik tombol edit pada daftar artikel untuk membuka editor. Form yang tersedia sama dengan form pembuatan artikel. Perubahan disimpan dengan tombol update.
