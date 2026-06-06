/**
 * proxy.ts — Proteksi route /admin/*
 *
 * Menggunakan Auth.js proxy pattern untuk Next.js 16.
 * Semua route /admin/* (kecuali /admin/login) membutuhkan sesi valid.
 */

export { auth as proxy } from "@/auth";

export const config = {
  matcher: ["/admin/:path*"],
};
