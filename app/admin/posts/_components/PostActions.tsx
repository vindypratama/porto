/**
 * app/admin/posts/_components/PostActions.tsx
 * Client component untuk aksi delete & toggle publish/draft pada post.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Eye, EyeOff, Loader2 } from "lucide-react";

interface PostActionsProps {
  postId:     string;
  postStatus: string;
}

export default function PostActions({ postId, postStatus }: PostActionsProps) {
  const router   = useRouter();
  const [loading, setLoading] = useState<"delete" | "toggle" | null>(null);

  async function handleToggleStatus() {
    setLoading("toggle");
    const newStatus = postStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    await fetch(`/api/admin/posts/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setLoading(null);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Hapus artikel ini? Tindakan ini tidak dapat dibatalkan.")) return;
    setLoading("delete");
    await fetch(`/api/admin/posts/${postId}`, { method: "DELETE" });
    setLoading(null);
    router.refresh();
  }

  return (
    <>
      <button
        onClick={handleToggleStatus}
        disabled={!!loading}
        className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-950/30 transition-colors disabled:opacity-50"
        title={postStatus === "PUBLISHED" ? "Jadikan Draft" : "Publish"}
      >
        {loading === "toggle" ? (
          <Loader2 size={14} className="animate-spin" />
        ) : postStatus === "PUBLISHED" ? (
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
        {loading === "delete" ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Trash2 size={14} />
        )}
      </button>
    </>
  );
}
