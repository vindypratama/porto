## Context

Portfolio admin panel menggunakan layout sidebar tetap `w-56` (224px) yang tidak pernah collapse. Di mobile (375px), sidebar memakan >60% lebar layar. Semua halaman admin terpengaruh: dashboard, posts (list + editor), projects (list + form), settings. Public-facing pages sudah responsive.

Breakpoint strategi: Tailwind CSS default — `sm` (640px), `md` (768px), `lg` (1024px). Admin sidebar harus collapse di bawah `md` (768px).

## Goals / Non-Goals

**Goals:**
- Admin panel usable di tablet (768px+) dan mobile (< 768px)
- Sidebar menjadi drawer overlay di mobile
- Tabel bisa di-scroll horizontal di mobile
- Form layout stack di mobile
- Post editor usable di mobile

**Non-Goals:**
- Tidak mengubah public-facing pages (sudah responsive)
- Tidak mengubah behavior/logic — hanya layout dan CSS
- Tidak menambah fitur baru
- Tidak mengubah design system (colors, fonts, dll)

## Decisions

### 1. Sidebar → Drawer overlay di mobile

**Keputusan**: Sidebar di-hide di `<md`. Tambahkan hamburger button di top bar yang membuka sidebar sebagai slide-over drawer dengan backdrop overlay.

**Alasan**:
- Pattern standar untuk admin panels di mobile
- Tidak memerlukan perubahan route atau state management yang kompleks
- Drawer bisa di-close dengan tap backdrop atau link click

**Alternatif yang dipertimbangkan**:
- **Collapsible sidebar**: Sidebar tetap visible tapi narrow (icons only). Masih memakan ~60px di mobile — kurang ideal.
- **Bottom navigation**: Tidak cocok untuk admin dengan banyak menu items.

### 2. Tabel → Horizontal scroll + hidden columns

**Keputusan**: Wrapper tabel menggunakan `overflow-x-auto`. Kolom secondary (Tags, Tanggal di posts; Domain, Tech di projects) di-hide di mobile dengan `hidden md:table-cell`.

**Alasan**:
- `overflow-x-auto` adalah solusi paling sederhana untuk tabel lebar
- Menyembunyikan kolom secondary mengurangi lebar tabel di mobile
- User masih bisa scroll untuk melihat kolom yang tersembunyi

### 3. Post editor → Tab interface di mobile

**Keputusan**: Di mobile, metadata sidebar dan editor di-switch menggunakan tab toggle (Metadata | Editor | Preview). Di desktop, tetap split-panel.

**Alasan**:
- Split-panel 256px + textarea tidak feasible di mobile
- Tab interface memberikan full-width untuk masing-masing view
- Preview toggle sudah ada — tinggal extend ke metadata tab

### 4. Form grids → Responsive breakpoints

**Keputusan**: Semua `grid-cols-2` → `grid-cols-1 sm:grid-cols-2`. Semua `grid-cols-3` → `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`. Padding `p-8` → `p-4 md:p-6 lg:p-8`.

**Alasan**:
- Perubahan class-only, tidak memerlukan logic baru
- Konsisten dengan responsive pattern yang sudah ada di public pages

## Risks / Trade-offs

- **[Risk]** Drawer sidebar memerlukan state management (open/close) → **Mitigation**: Gunakan `useState` sederhana di layout, atau buat client component wrapper
- **[Risk]** Tab interface di post editor mobile menambah complexity → **Mitigation**: Reuse preview toggle yang sudah ada, tambah metadata tab
- **[Risk]** Hidden columns di tabel menyembunyikan informasi → **Mitigation**: Kolom yang di-hide (tags, tanggal) adalah secondary info; title + status tetap visible
