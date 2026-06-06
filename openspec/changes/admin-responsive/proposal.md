## Why

Halaman admin panel tidak responsive di mobile. Sidebar admin (`w-56`) selalu tampil dan tidak bisa di-collapse — di layar 375px, konten utama hanya tersisa ~150px. Tabel posts dan projects overflow tanpa horizontal scroll. Form editor post memiliki metadata sidebar tetap 256px. Grid form project menggunakan `grid-cols-2`/`grid-cols-3` tanpa breakpoint. Tab navigasi settings overflow tanpa scroll. Public pages sudah responsive, semua masalah terisolasi di admin dashboard.

## What Changes

- **Admin sidebar**: Tambahkan hamburger menu + drawer overlay di mobile, hide sidebar di `<md`
- **Admin tables** (posts, projects): Tambahkan `overflow-x-auto`, sembunyikan kolom secondary di mobile, responsive padding
- **Post editor**: Buat metadata sidebar collapsible/stackable di mobile, responsive toolbar
- **Project form**: Tambahkan breakpoint `sm:`/`md:` pada semua grid layout
- **Settings layout**: Tambahkan `overflow-x-auto` pada tab nav, responsive padding
- **Settings forms**: Buat inline forms stack di mobile (`flex-col sm:flex-row`)
- **Dashboard page**: Responsive padding

## Capabilities

### New Capabilities

- `admin-responsive`: Semua halaman admin dashboard responsive di mobile — sidebar, tabel, form, editor, settings

### Modified Capabilities

_Tidak ada spec existing yang berubah._

## Impact

- **File berubah**: 8 file di `app/admin/(dashboard)/`
- **File baru**: 1 komponen `MobileNav.tsx` untuk drawer sidebar
- **Tidak ada breaking change**: Perubahan hanya CSS/layout, tidak mengubah behavior
- **Tidak ada perubahan API atau dependency**
