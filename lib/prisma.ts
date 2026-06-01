/**
 * lib/prisma.ts — Singleton Prisma Client
 *
 * Pola singleton ini WAJIB dipakai di Next.js.
 * Saat mode development, Next.js me-reload modul secara berkala (Hot Reload),
 * yang akan membuat koneksi database baru terus-menerus jika tidak menggunakan
 * singleton. Pola ini menyimpan instance ke `globalThis` untuk mencegah hal itu.
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL ?? "";
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
