/**
 * app/api/admin/posts/[id]/route.ts — API untuk post individual.
 * GET:    Ambil 1 post.
 * PATCH:  Update post (termasuk toggle status).
 * DELETE: Hapus post.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth";
import { getPostById, updatePost, deletePost } from "@/modules/blog";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/admin/posts/:id
export async function GET(_req: NextRequest, { params }: RouteContext) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

// PATCH /api/admin/posts/:id
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body  = await req.json();
  const { title, slug, excerpt, content, coverImage, tags, status } = body;

  const updateData: Record<string, unknown> = {};
  if (title       !== undefined) updateData.title       = title;
  if (slug        !== undefined) updateData.slug        = slug;
  if (excerpt     !== undefined) updateData.excerpt     = excerpt;
  if (content     !== undefined) updateData.content     = content;
  if (coverImage  !== undefined) updateData.coverImage  = coverImage;
  if (tags        !== undefined) updateData.tags        = tags;
  if (status      !== undefined) updateData.status      = status;

  const post = await updatePost(id, updateData);
  return NextResponse.json(post);
}

// DELETE /api/admin/posts/:id
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await deletePost(id);
  return NextResponse.json({ success: true });
}
