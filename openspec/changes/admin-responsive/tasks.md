## 1. Admin Sidebar — Mobile Drawer

- [x] 1.1 Buat komponen `MobileNav.tsx` di `app/admin/(dashboard)/_components/` — drawer sidebar dengan backdrop overlay, hamburger toggle, auto-close on link click
- [x] 1.2 Modifikasi `app/admin/(dashboard)/layout.tsx` — hide sidebar di mobile (`hidden md:flex`), tambahkan top bar dengan hamburger button di mobile, integrasikan `MobileNav`

## 2. Admin Tables — Responsive

- [x] 2.1 Modifikasi `app/admin/(dashboard)/posts/page.tsx` — `overflow-x-auto` pada wrapper, sembunyikan kolom Tags+Tanggal di mobile (`hidden md:table-cell`), responsive padding
- [x] 2.2 Modifikasi `app/admin/(dashboard)/projects/page.tsx` — `overflow-x-auto` pada wrapper, sembunyikan kolom Domain+Tech di mobile, responsive padding

## 3. Post Editor — Mobile Tabs

- [x] 3.1 Modifikasi `app/admin/(dashboard)/posts/new/page.tsx` — tambah tab toggle (Metadata | Editor | Preview) di mobile, stack layout di mobile, split-panel di desktop

## 4. Forms — Responsive Grids

- [x] 4.1 Modifikasi `app/admin/(dashboard)/projects/_components/ProjectForm.tsx` — responsive grid breakpoints (`grid-cols-1 sm:grid-cols-2`, dll), responsive padding
- [x] 4.2 Modifikasi `app/admin/(dashboard)/projects/new/page.tsx` — pastikan wrapper responsive
- [x] 4.3 Modifikasi `app/admin/(dashboard)/projects/[id]/edit/page.tsx` — pastikan wrapper responsive

## 5. Settings — Responsive

- [x] 5.1 Modifikasi `app/admin/(dashboard)/settings/layout.tsx` — `overflow-x-auto` pada tab nav, responsive padding
- [x] 5.2 Modifikasi `app/admin/(dashboard)/settings/tech-stack/page.tsx` — form inline stack di mobile
- [x] 5.3 Modifikasi `app/admin/(dashboard)/settings/contact/page.tsx` — form inline stack di mobile

## 6. Dashboard — Responsive Padding

- [x] 6.1 Modifikasi `app/admin/(dashboard)/page.tsx` — responsive padding `p-4 md:p-6 lg:p-8`

## 7. Verifikasi

- [x] 7.1 Jalankan `npm run build` dan pastikan tidak ada error
