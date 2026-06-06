/**
 * app/api/admin/experience/route.ts — API CRUD untuk Experience.
 * GET: Ambil semua experience.
 * POST: Buat experience baru.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth";
import { getAllExperience, createExperience } from "@/modules/experience";

export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const entries = await getAllExperience();
  return NextResponse.json(entries);
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { role, company, duration, description, impact, current, sortOrder } = body;

  if (!role || !company || !duration || !description) {
    return NextResponse.json(
      { error: "Field wajib tidak lengkap. Role, company, duration, dan description wajib diisi." },
      { status: 400 },
    );
  }

  try {
    const entry = await createExperience({
      role,
      company,
      duration,
      description,
      impact:    impact ?? "",
      current:   current ?? false,
      sortOrder: sortOrder ?? 0,
    });
    return NextResponse.json(entry, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal membuat experience.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
