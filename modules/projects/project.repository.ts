import { prisma } from "@/lib/prisma";

export async function findManyProjects(options?: {
  where?: Record<string, unknown>;
  orderBy?: Record<string, string>;
}) {
  return prisma.project.findMany({
    where:   options?.where,
    orderBy: options?.orderBy ?? { order: "asc" },
  });
}

export async function findUniqueProject(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export async function createProject(data: Record<string, unknown>) {
  return prisma.project.create({ data: data as never });
}

export async function updateProject(
  id: string,
  data: Record<string, unknown>,
) {
  return prisma.project.update({
    where: { id },
    data:  data as never,
  });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({ where: { id } });
}

export async function countProjects(where?: Record<string, unknown>) {
  return prisma.project.count({ where });
}
