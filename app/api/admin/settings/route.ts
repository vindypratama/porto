import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth";
import { getSettingsWithFallback, updateSettings } from "@/modules/settings";

export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const settings = await getSettingsWithFallback();
  return NextResponse.json(settings);
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const settings = await updateSettings(body);
    return NextResponse.json(settings);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal mengupdate settings.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
