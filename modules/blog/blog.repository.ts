import { prisma } from "@/lib/prisma";

export async function findManyPosts(options?: {
  where?: Record<string, unknown>;
  orderBy?: Record<string, string>;
  select?: Record<string, unknown>;
  include?: Record<string, unknown>;
}) {
  const args: Record<string, unknown> = {
    where:   options?.where,
    orderBy: options?.orderBy ?? { createdAt: "desc" },
  };
  if (options?.select) args.select = options.select;
  else if (options?.include) args.include = options.include;

  return prisma.post.findMany(args as never);
}

export async function findUniquePost(
  where: { id: string } | { slug: string },
  include?: Record<string, unknown>,
) {
  return prisma.post.findUnique({
    where,
    ...(include ? { include } : {}),
  } as never);
}

export async function createPost(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  tags?: string[];
  status?: string;
  publishedAt?: Date | null;
  authorId: string;
}) {
  return prisma.post.create({ data: data as never });
}

export async function updatePost(
  id: string,
  data: Record<string, unknown>,
) {
  return prisma.post.update({
    where: { id },
    data:  data as never,
  });
}

export async function deletePost(id: string) {
  return prisma.post.delete({ where: { id } });
}

export async function countPosts(where?: Record<string, unknown>) {
  return prisma.post.count({ where });
}
