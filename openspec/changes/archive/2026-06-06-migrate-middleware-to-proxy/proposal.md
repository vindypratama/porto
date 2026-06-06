## Why

Next.js 16 mengganti konvensi file `middleware.ts` menjadi `proxy.ts`. Setiap kali build atau dev server dijalankan, muncul warning: *"The 'middleware' file convention is deprecated. Please use 'proxy' instead."* Migrasi ini menghilangkan warning tersebut dan memastikan project mengikuti konvensi terbaru Next.js 16.

## What Changes

- **Rename** `middleware.ts` → `proxy.ts`
- Tidak ada perubahan pada logic autentikasi — `export default auth(...)` tetap berfungsi sebagai default export yang didukung oleh proxy convention
- `config.matcher` tetap sama: `["/admin/:path*"]`

## Capabilities

### New Capabilities
- `proxy-migration`: Migrasi file middleware.ts ke proxy.ts sesuai konvensi Next.js 16

### Modified Capabilities

## Impact

- File `middleware.ts` dihapus, diganti `proxy.ts`
- Tidak ada perubahan behavior — logic autentikasi admin route tetap sama
- Warning "middleware is deprecated" hilang dari build output
