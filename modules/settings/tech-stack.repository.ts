import { prisma } from "@/lib/prisma";
import type { TechStackGroup, TechStackItem } from "@prisma/client";

export type TechStackGroupWithItems = TechStackGroup & {
  items: TechStackItem[];
};

export async function getAllGroups(): Promise<TechStackGroupWithItems[]> {
  return prisma.techStackGroup.findMany({
    include: { items: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "asc" },
  });
}

export async function createGroup(
  data: Omit<TechStackGroup, "id" | "createdAt" | "updatedAt">,
): Promise<TechStackGroup> {
  return prisma.techStackGroup.create({ data });
}

export async function updateGroup(
  id: string,
  data: Partial<Omit<TechStackGroup, "id" | "createdAt" | "updatedAt">>,
): Promise<TechStackGroup> {
  return prisma.techStackGroup.update({ where: { id }, data });
}

export async function deleteGroup(id: string): Promise<void> {
  await prisma.techStackGroup.delete({ where: { id } });
}

export async function createItem(
  data: Omit<TechStackItem, "id" | "createdAt" | "updatedAt">,
): Promise<TechStackItem> {
  return prisma.techStackItem.create({ data });
}

export async function updateItem(
  id: string,
  data: Partial<Omit<TechStackItem, "id" | "createdAt" | "updatedAt">>,
): Promise<TechStackItem> {
  return prisma.techStackItem.update({ where: { id }, data });
}

export async function deleteItem(id: string): Promise<void> {
  await prisma.techStackItem.delete({ where: { id } });
}
