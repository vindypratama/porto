import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth";
import { updateTechStackItem, deleteTechStackItem } from "@/modules/settings";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const item = await updateTechStackItem(id, body);
    return NextResponse.json(item);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal mengupdate item.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    await deleteTechStackItem(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menghapus item.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
