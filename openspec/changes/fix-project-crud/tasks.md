## 1. Service Layer

- [x] 1.1 Tambahkan `createProject(data)` di `modules/projects/project.service.ts`
- [x] 1.2 Tambahkan `getProjectById(id)` di `modules/projects/project.service.ts`
- [x] 1.3 Ekspor `createProject` dan `getProjectById` dari `modules/projects/index.ts`

## 2. API Routes

- [x] 2.1 Buat `app/api/admin/projects/route.ts` dengan POST handler (create project)
- [x] 2.2 Tambahkan GET handler di `app/api/admin/projects/[id]/route.ts` (ambil satu project)

## 3. Form Component

- [x] 3.1 Buat komponen `ProjectForm` di `app/admin/(dashboard)/projects/_components/ProjectForm.tsx` — form dengan field: title, subtitle, description, domain, highlights (tag input), tech (tag input), gradient, icon, order, published toggle

## 4. Admin Pages

- [x] 4.1 Buat halaman `app/admin/(dashboard)/projects/new/page.tsx` — wrapper yang menggunakan `ProjectForm` untuk create
- [x] 4.2 Buat halaman `app/admin/(dashboard)/projects/[id]/edit/page.tsx` — wrapper yang fetch data via GET API dan menggunakan `ProjectForm` untuk edit

## 5. Verifikasi

- [x] 5.1 Jalankan `npm run build` dan pastikan tidak ada error
