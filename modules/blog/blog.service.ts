import type { BlogPost } from "@/modules/blog/components/BlogCard";
import type { Post } from "@prisma/client";
import * as blogRepo from "./blog.repository";

type PostWithAuthor = Post & { author: { name: string } };

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    return await blogRepo.findManyPosts({
      where:   { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      select: {
        id:          true,
        title:       true,
        slug:        true,
        excerpt:     true,
        coverImage:  true,
        tags:        true,
        publishedAt: true,
        author: {
          select: { name: true },
        },
      },
    }) as unknown as BlogPost[];
  } catch {
    console.warn("[Blog Service] Database tidak tersedia.");
    return [];
  }
}

export async function getAllPosts() {
  try {
    return await blogRepo.findManyPosts({
      orderBy: { createdAt: "desc" },
      select: {
        id:          true,
        title:       true,
        slug:        true,
        status:      true,
        tags:        true,
        publishedAt: true,
        createdAt:   true,
        author: { select: { name: true } },
      },
    });
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PostWithAuthor | null> {
  try {
    return await blogRepo.findUniquePost(
      { slug },
      { author: { select: { name: true } } },
    ) as PostWithAuthor | null;
  } catch {
    return null;
  }
}

export async function getPostById(id: string): Promise<PostWithAuthor | null> {
  try {
    return await blogRepo.findUniquePost(
      { id },
      { author: { select: { name: true } } },
    ) as PostWithAuthor | null;
  } catch {
    return null;
  }
}

export async function createPost(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  status?: string;
  authorId: string;
}) {
  const existing = await blogRepo.findUniquePost({ slug: data.slug });
  if (existing) {
    throw new Error("Slug sudah dipakai.");
  }

  return blogRepo.createPost({
    ...data,
    coverImage:  data.coverImage || null,
    tags:        data.tags ?? [],
    status:      data.status ?? "DRAFT",
    publishedAt: data.status === "PUBLISHED" ? new Date() : null,
  });
}

export async function updatePost(
  id: string,
  data: Record<string, unknown>,
) {
  if (data.status !== undefined) {
    data.publishedAt =
      data.status === "PUBLISHED" ? new Date() : null;
  }
  return blogRepo.updatePost(id, data);
}

export async function deletePost(id: string) {
  return blogRepo.deletePost(id);
}

export async function getBlogStats() {
  try {
    const [totalPosts, publishedPosts] = await Promise.all([
      blogRepo.countPosts(),
      blogRepo.countPosts({ status: "PUBLISHED" }),
    ]);
    return {
      totalPosts,
      publishedPosts,
      draftPosts: totalPosts - publishedPosts,
    };
  } catch {
    return { totalPosts: 0, publishedPosts: 0, draftPosts: 0 };
  }
}
