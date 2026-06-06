## Why

Admin panel tidak bisa menambahkan atau mengedit project. Halaman "Project Baru" (`/admin/projects/new`) dan "Edit" (`/admin/projects/[id]/edit`) tidak ada. API route untuk membuat project (POST) dan mengambil satu project (GET) juga belum dibuat. Service layer belum mengekspos `createProject` dan `getProjectById`. Akibatnya, admin hanya bisa melihat daftar, toggle publish, dan hapus project — tapi tidak bisa membuat atau mengubah data.

## What Changes

- Tambahkan `POST /api/admin/projects` — endpoint untuk membuat project baru
- Tambahkan `GET /api/admin/projects/[id]` — endpoint untuk mengambil satu project (untuk form edit)
- Buat halaman `/admin/projects/new` — form untuk menambah project baru
- Buat halaman `/admin/projects/[id]/edit` — form untuk mengedit project yang sudah ada
- Tambahkan `createProject` dan `getProjectById` di service layer
- Ekspor fungsi baru dari barrel `modules/projects/index.ts`

## Capabilities

### New Capabilities

- `project-management`: CRUD lengkap untuk admin projects — create, read, update, delete melalui API dan form UI

### Modified Capabilities

_Tidak ada — ini adalah penambahan fitur baru, bukan perubahan behavior yang sudah ada._

## Impact

- **File baru**: `app/api/admin/projects/route.ts`, `app/admin/(dashboard)/projects/new/page.tsx`, `app/admin/(dashboard)/projects/[id]/edit/page.tsx`
- **File berubah**: `app/api/admin/projects/[id]/route.ts` (tambah GET), `modules/projects/project.service.ts` (tambah createProject, getProjectById), `modules/projects/index.ts` (tambah export)
- **Tidak ada breaking change**: Penambahan fitur, tidak mengubah behavior existing
- **Tidak ada perubahan schema/database**: Menggunakan model Project yang sudah ada
