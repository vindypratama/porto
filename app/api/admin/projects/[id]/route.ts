/**
 * app/api/admin/projects/[id]/route.ts
 * GET:    Ambil 1 project.
 * PATCH:  Update project (termasuk toggle published).
 * DELETE: Hapus project.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth";
import { getProjectById, updateProject, deleteProject } from "@/modules/projects";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json();
  const project = await updateProject(id, body);
  return NextResponse.json(project);
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await deleteProject(id);
  return NextResponse.json({ success: true });
}
