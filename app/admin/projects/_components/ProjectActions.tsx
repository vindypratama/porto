/**
 * app/admin/projects/_components/ProjectActions.tsx
 * Client component untuk aksi toggle visible/hidden dan delete project.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Trash2, PenSquare, Loader2 } from "lucide-react";
import Link from "next/link";

interface ProjectActionsProps {
  projectId: string;
  published: boolean;
}

export default function ProjectActions({ projectId, published }: ProjectActionsProps) {
  const router  = useRouter();
  const [loading, setLoading] = useState<"toggle" | "delete" | null>(null);

  async function handleToggle() {
    setLoading("toggle");
    await fetch(`/api/admin/projects/${projectId}`, {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ published: !published }),
    });
    setLoading(null);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Hapus project ini?")) return;
    setLoading("delete");
    await fetch(`/api/admin/projects/${projectId}`, { method: "DELETE" });
    setLoading(null);
    router.refresh();
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/admin/projects/${projectId}/edit`}
        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
        title="Edit"
      >
        <PenSquare size={14} />
      </Link>
      <button
        onClick={handleToggle}
        disabled={!!loading}
        className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-950/30 transition-colors disabled:opacity-50"
        title={published ? "Sembunyikan" : "Tampilkan"}
      >
        {loading === "toggle" ? (
          <Loader2 size={14} className="animate-spin" />
        ) : published ? (
          <EyeOff size={14} />
        ) : (
          <Eye size={14} />
        )}
      </button>
      <button
        onClick={handleDelete}
        disabled={!!loading}
        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors disabled:opacity-50"
        title="Hapus"
      >
        {loading === "delete" ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
      </button>
    </div>
  );
}
