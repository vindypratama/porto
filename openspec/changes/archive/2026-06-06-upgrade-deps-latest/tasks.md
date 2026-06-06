## 1. Tailwind CSS v4 Migration

- [x] 1.1 Uninstall tailwindcss v3 dan autoprefixer, install @tailwindcss/postcss dan tailwindcss v4
- [x] 1.2 Update postcss.config.js: ganti plugin `tailwindcss` dengan `@tailwindcss/postcss`, hapus `autoprefixer`
- [x] 1.3 Migrate tailwind.config.ts ke CSS: pindahkan custom theme (fonts, colors, animations) ke `@theme` directive di global CSS
- [x] 1.4 Hapus tailwind.config.ts (tidak diperlukan lagi di Tailwind v4)
- [x] 1.5 Update import Tailwind di global CSS: ganti `@tailwind base/components/utilities` dengan `@import "tailwindcss"`
- [x] 1.6 Verifikasi build berhasil dan styling tetap sama

## 2. TypeScript v6 Upgrade

- [x] 2.1 Update typescript ke v6.0.3 di package.json
- [x] 2.2 Jalankan `npx tsc --noEmit` untuk cek type errors baru
- [x] 2.3 Fix type errors jika ada (biasanya minor strict check changes)
- [x] 2.4 Verifikasi `npm run build` berhasil tanpa type errors

## 3. ESLint v10 & eslint-config-next v16 Upgrade

- [x] 3.1 Update eslint ke v10.4.1 dan eslint-config-next ke v16.2.6 di package.json
- [x] 3.2 Jalankan `npm run lint` untuk cek lint errors baru
- [x] 3.3 Fix lint errors atau adjust config jika diperlukan

## 4. lucide-react v1 Upgrade

- [x] 4.1 Update lucide-react ke v1.17.0 di package.json
- [x] 4.2 Jalankan `npm run build` untuk cek icon imports yang mungkin broken
- [x] 4.3 Fix icon imports yang berubah (rename/remove) di 17 file yang menggunakan lucide-react

## 5. @types/node v25 Upgrade

- [x] 5.1 Update @types/node ke v25.9.1 di package.json

## 6. Final Verification

- [x] 6.1 Jalankan `npm install` untuk install semua dependencies baru
- [x] 6.2 Jalankan `npm run build` — pastikan production build berhasil
- [x] 6.3 Jalankan `npm run lint` — pastikan linting berhasil
- [x] 6.4 Jalankan `npx tsc --noEmit` — pastikan type checking berhasil
- [x] 6.5 Jalankan `npm run dev` — pastikan dev server berjalan dan halaman bisa diakses
