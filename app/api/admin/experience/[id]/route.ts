/**
 * app/api/admin/experience/[id]/route.ts
 * PATCH: Update experience.
 * DELETE: Hapus experience.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth";
import { updateExperience, deleteExperience } from "@/modules/experience";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json();
  const entry = await updateExperience(id, body);
  return NextResponse.json(entry);
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await deleteExperience(id);
  return NextResponse.json({ success: true });
}
