import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth";
import { createTechStackItem } from "@/modules/settings";

export async function POST(req: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { name, icon, sortOrder, groupId } = body;
    if (!name || !groupId) {
      return NextResponse.json({ error: "Nama item dan groupId wajib diisi." }, { status: 400 });
    }
    const item = await createTechStackItem({
      name,
      icon: icon ?? null,
      sortOrder: sortOrder ?? 0,
      groupId,
    });
    return NextResponse.json(item, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal membuat item.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
