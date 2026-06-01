import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function requireAuth() {
  const session = await auth();
  return session ?? null;
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
