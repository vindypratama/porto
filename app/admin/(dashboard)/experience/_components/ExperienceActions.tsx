"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PenSquare, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";

interface ExperienceActionsProps {
  experienceId: string;
}

export default function ExperienceActions({ experienceId }: ExperienceActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Hapus experience ini?")) return;
    setLoading(true);
    await fetch(`/api/admin/experience/${experienceId}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1">
      <Link
        href={`/admin/experience/${experienceId}/edit`}
        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
        title="Edit"
      >
        <PenSquare size={14} />
      </Link>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors disabled:opacity-50"
        title="Hapus"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
      </button>
    </div>
  );
}
