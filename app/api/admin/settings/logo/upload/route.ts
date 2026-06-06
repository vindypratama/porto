import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth";
import { updateSettings } from "@/modules/settings";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ALLOWED_TYPES = ["image/png", "image/svg+xml", "image/jpeg", "image/webp"];
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

export async function POST(req: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipe file tidak diizinkan. Gunakan PNG, SVG, JPG, atau WEBP." },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Ukuran file maksimal 2MB." },
        { status: 400 },
      );
    }

    const ext = file.name.split(".").pop() ?? "png";
    const fileName = `logo-${Date.now()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, fileName), buffer);

    const imageUrl = `/uploads/${fileName}`;
    await updateSettings({ logoImageUrl: imageUrl });

    return NextResponse.json({ url: imageUrl }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal mengupload file.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
