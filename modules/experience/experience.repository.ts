import { prisma } from "@/lib/prisma";

export async function findManyExperience(options?: {
  where?: Record<string, unknown>;
  orderBy?: Record<string, string>;
}) {
  return prisma.experience.findMany({
    where:   options?.where,
    orderBy: options?.orderBy ?? { sortOrder: "asc" },
  });
}

export async function findUniqueExperience(id: string) {
  return prisma.experience.findUnique({ where: { id } });
}

export async function createExperience(data: Record<string, unknown>) {
  return prisma.experience.create({ data: data as never });
}

export async function updateExperience(
  id: string,
  data: Record<string, unknown>,
) {
  return prisma.experience.update({
    where: { id },
    data:  data as never,
  });
}

export async function deleteExperience(id: string) {
  return prisma.experience.delete({ where: { id } });
}
