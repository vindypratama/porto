/**
 * app/api/admin/projects/route.ts — API CRUD untuk Projects.
 * POST: Buat project baru.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth";
import { createProject } from "@/modules/projects";

// POST /api/admin/projects
export async function POST(req: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, subtitle, description, domain, highlights, tech, gradient, icon, order, published } = body;

  if (!title || !subtitle || !description || !domain) {
    return NextResponse.json(
      { error: "Field wajib tidak lengkap. Title, subtitle, description, dan domain wajib diisi." },
      { status: 400 },
    );
  }

  try {
    const project = await createProject({
      title,
      subtitle,
      description,
      domain,
      highlights: highlights ?? [],
      tech:       tech ?? [],
      gradient:   gradient ?? "from-indigo-500 to-purple-600",
      icon:       icon ?? "📁",
      order:      order ?? 0,
      published:  published ?? true,
    });
    return NextResponse.json(project, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal membuat project.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
