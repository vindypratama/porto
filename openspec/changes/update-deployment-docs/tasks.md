## 1. Prisma 7 Updates

- [ ] 1.1 Update Bagian 1.6 (Migrasi & Seed): tambahkan alternatif `npx prisma db push` jika migrate dev gagal CREATEDB
- [ ] 1.2 Update Bagian 2.5 (Migrasi & Seed): tambahkan alternatif `npx prisma db push`
- [ ] 1.3 Update Bagian 3.6 (Migrasi & Seed): tambahkan alternatif `npx prisma db push`
- [ ] 1.4 Update Bagian 4.7 (Database Migration & Seed): tambahkan alternatif `npx prisma db push`
- [ ] 1.5 Update catatan seed password: referensi `prisma.config.ts` bukan `package.json#prisma`

## 2. Docker Dev Port Note

- [ ] 2.1 Tambah catatan di Bagian 2.3: jika port 5432 sudah digunakan oleh PostgreSQL lokal, ganti port di docker-compose.dev.yml ke `5433:5432` dan sesuaikan DATABASE_URL

## 3. Verification

- [ ] 3.1 Review seluruh DEPLOYMENT.md untuk memastikan tidak ada referensi lama yang terlewat
