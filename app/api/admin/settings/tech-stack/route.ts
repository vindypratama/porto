import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth";
import { getTechStackWithFallback, createTechStackGroup } from "@/modules/settings";

export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const groups = await getTechStackWithFallback();
  return NextResponse.json(groups);
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { name, color, sortOrder } = body;
    if (!name) {
      return NextResponse.json({ error: "Nama group wajib diisi." }, { status: 400 });
    }
    const group = await createTechStackGroup({
      name,
      color: color ?? "indigo",
      sortOrder: sortOrder ?? 0,
    });
    return NextResponse.json(group, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal membuat group.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
