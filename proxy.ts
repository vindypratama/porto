/**
 * proxy.ts — Proteksi route /admin/*
 *
 * Semua route /admin/* (kecuali /admin/login) membutuhkan sesi valid.
 * Menggunakan Auth.js v5 export pattern untuk Next.js 16 proxy convention.
 */

export { auth as proxy } from "@/auth";

export const config = {
  matcher: ["/admin/:path*"],
};
