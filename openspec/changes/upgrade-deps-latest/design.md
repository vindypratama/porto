## Context

Project Next.js 16 portfolio dengan 17 file yang menggunakan lucide-react, Tailwind CSS 3.4 dengan custom theme (fonts, colors, animations), dan TypeScript 5.9. Dependencies sudah tertinggal dari versi terbaru, terutama Tailwind CSS 4, TypeScript 6, ESLint 10, dan lucide-react 1.x yang memiliki breaking changes.

Current state:
- `tailwind.config.ts` menggunakan JS-based config dengan custom theme (Inter, JetBrains Mono, accent colors, animations)
- `postcss.config.js` menggunakan plugin `tailwindcss` dan `autoprefixer`
- Tidak ada file eslint config terpisah (menggunakan default Next.js)
- 17 file komponen mengimport icon dari `lucide-react`

## Goals / Non-Goals

**Goals:**
- Upgrade semua dependencies ke versi terbaru stable
- Menangani breaking changes pada Tailwind CSS 4, TypeScript 6, ESLint 10, lucide-react 1.x
- Memastikan `npm run build` dan `npm run lint` berhasil setelah upgrade
- Memastikan semua komponen tetap berfungsi dengan icon lucide-react yang baru

**Non-Goals:**
- Tidak mengubah fitur atau behavior aplikasi
- Tidak menambahkan dependency baru
- Tidak mengoptimalkan bundle size (hanya upgrade)

## Decisions

### Decision 1: Upgrade Tailwind CSS 3 → 4 dengan CSS-based config
**Rationale**: Tailwind v4 menggunakan CSS-based config dengan `@theme` directive, lebih cepat dan tidak perlu JS config file. Konfigurasi custom (fonts, colors, animations) harus di-migrate dari `tailwind.config.ts` ke CSS.
**Alternatives yang dipertimbangkan**:
- Tetap di Tailwind 3 — ditolak karena kehilangan performance improvements dan compatibility dengan ecosystem terbaru
- Menggunakan compatibility mode — ditolak karena hanya sementara, tidak menyelesaikan masalah

### Decision 2: Upgrade TypeScript 5 → 6
**Rationale**: TypeScript 6 membawa type inference yang lebih baik dan beberapa strict checks baru. Perubahan biasanya minor dan dapat diselesaikan dengan type annotation adjustments.
**Alternatives yang dipertimbangkan**:
- Tetap di TS 5 — ditolak karena kehilangan fitur baru dan security patches

### Decision 3: Upgrade ESLint 9 → 10 dengan flat config
**Rationale**: ESLint 10 menggunakan flat config secara default. Karena project tidak memiliki custom eslint config, upgrade relatif straightforward dengan mengikuti Next.js eslint-config-next 16.
**Alternatives yang dipertimbangkan**:
- Tetap di ESLint 9 — ditolak karena compatibility dengan eslint-config-next 16

### Decision 4: Upgrade lucide-react 0.x → 1.x
**Rationale**: lucide-react 1.x membawa perbaikan performa dan tree-shaking yang lebih baik. Import path tetap sama (`from "lucide-react"`), tetapi beberapa icon mungkin sudah di-rename atau dihapus.
**Alternatives yang dipertimbangkan**:
- Tetap di 0.x — ditolak karena tidak mendapat update icon baru dan bug fixes

### Decision 5: Upgrade @types/node 20 → 25
**Rationale**: Mengikuti Node.js LTS terbaru. Type definitions harus sesuai dengan runtime yang digunakan.

## Risks / Trade-offs

- **[Risk]** Tailwind v4 migration bisa mempengaruhi styling → **Mitigation**: Test semua halaman setelah migrate, pastikan visual tidak berubah
- **[Risk]** lucide-react 1.x beberapa icon di-rename → **Mitigation**: Cek semua 17 file yang menggunakan lucide-react, pastikan icon masih tersedia
- **[Risk]** TypeScript 6 strict checks bisa menyebabkan type errors baru → **Mitigation**: Fix type errors satu per satu setelah upgrade
- **[Risk]** ESLint 10 bisa menunjukkan lint errors baru → **Mitigation**: Fix lint errors atau adjust rules jika diperlukan
- **[Risk]** PostCSS config berubah untuk Tailwind v4 → **Mitigation**: Update postcss.config.js sesuai dokumentasi Tailwind v4
