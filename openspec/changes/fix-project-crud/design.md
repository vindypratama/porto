## Context

Portfolio admin panel memiliki CRUD untuk blog posts (lengkap: list, create, edit, delete) tetapi untuk projects hanya ada list, toggle publish, dan delete. Tidak ada form create/edit, tidak ada API POST/GET by ID. Repository layer sudah memiliki `createProject` dan `findUniqueProject`, tetapi service layer tidak mengeksposnya.

Pola yang sudah ada untuk blog posts:
- Repository → Service → API Route → Admin Page (Client Component form)
- Create: `POST /api/admin/posts` + form di `/admin/posts/new`
- Edit: `GET /api/admin/posts/[id]` + `PATCH /api/admin/posts/[id]` + form di `/admin/posts/[id]/edit`

## Goals / Non-Goals

**Goals:**
- Lengkapi CRUD project: create, read (single), update (via form edit)
- Ikuti pola arsitektur yang sama dengan blog posts (repository → service → API → UI)
- Form create dan edit menggunakan style yang konsisten dengan admin panel

**Non-Goals:**
- Tidak mengubah schema database (model Project sudah lengkap)
- Tidak mengubah public-facing project page
- Tidak menambah fitur drag-and-drop ordering (bisa di follow-up)

## Decisions

### 1. Reuse form component untuk create dan edit

**Keputusan**: Buat satu komponen `ProjectForm` yang digunakan oleh halaman create dan edit.

**Alasan**:
- Menghindari duplikasi kode form
- Konsisten dengan pendekatan DRY
- Blog posts belum melakukan ini (create dan edit terpisah), tapi untuk projects kita bisa improve

**Alternatif yang dipertimbangkan**:
- **Halaman terpisah**: Membuat `new/page.tsx` dan `edit/page.tsx` dengan form masing-masing. Lebih sederhana tapi duplikasi kode.

### 2. Form layout single-column (bukan split-panel)

**Keputusan**: Gunakan form layout single-column dengan card sections, bukan split-panel seperti blog editor.

**Alasan**:
- Project form tidak butuh markdown editor/preview
- Field project (title, subtitle, description, domain, tech, highlights, gradient, icon) lebih cocok dengan form layout standar
- Lebih mobile-friendly

### 3. Tech dan highlights menggunakan tag input

**Keputusan**: Gunakan pattern tag input (Enter to add, X to remove) untuk field `tech` dan `highlights`, sama seperti tags di blog post form.

**Alasan**:
- Sudah ada pattern ini di blog post form
- Array fields cocok dengan tag input UX

### 4. Service layer menambahkan createProject dan getProjectById

**Keputusan**: Tambahkan `createProject(data)` dan `getProjectById(id)` di service layer, export dari barrel.

**Alasan**:
- Repository sudah memiliki fungsi-fungsi ini
- Service layer perlu mengeksposnya untuk API routes
- Konsisten dengan pattern blog service

## Risks / Trade-offs

- **[Risk]** Form edit perlu fetch data project via API → perlu GET endpoint yang belum ada → **Mitigation**: Tambahkan GET handler di `[id]/route.ts`
- **[Risk]** Field `highlights` dan `tech` adalah array — validasi perlu memastikan tidak kosong → **Mitigation**: Validasi di API route dan di form client-side
