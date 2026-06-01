/**
 * app/api/admin/posts/route.ts — API CRUD untuk Blog Posts.
 * GET: Ambil semua post.
 * POST: Buat post baru.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth, findUserByEmail } from "@/modules/auth";
import { getAllPosts, createPost } from "@/modules/blog";

// GET /api/admin/posts
export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

// POST /api/admin/posts
export async function POST(req: NextRequest) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, slug, excerpt, content, coverImage, tags, status } = body;

  if (!title || !slug || !excerpt || !content) {
    return NextResponse.json({ error: "Field wajib tidak lengkap." }, { status: 400 });
  }

  const author = await findUserByEmail(session.user?.email ?? "");
  if (!author) {
    return NextResponse.json({ error: "Author tidak ditemukan." }, { status: 404 });
  }

  try {
    const post = await createPost({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      tags,
      status,
      authorId: author.id,
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal membuat post.";
    const status = message === "Slug sudah dipakai." ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
