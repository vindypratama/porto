/**
 * app/admin/posts/new/page.tsx — Editor artikel baru.
 *
 * Split-panel editor: kiri textarea Markdown, kanan live preview.
 * Form submit via API route POST /api/admin/posts.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MarkdownRenderer from "@/modules/blog/components/MarkdownRenderer";
import {
  Save, Eye, EyeOff, Loader2, Plus, X, ArrowLeft, FileText, Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";

type SaveStatus = "DRAFT" | "PUBLISHED";

export default function NewPostPage() {
  const router = useRouter();

  const [title,      setTitle]      = useState("");
  const [slug,       setSlug]       = useState("");
  const [excerpt,    setExcerpt]    = useState("");
  const [content,    setContent]    = useState("## Mulai menulis di sini...\n\nGunakan **Markdown** untuk memformat artikel kamu.\n\n```typescript\nconsole.log('Hello World');\n```");
  const [coverImage, setCoverImage] = useState("");
  const [tagInput,   setTagInput]   = useState("");
  const [tags,       setTags]       = useState<string[]>([]);
  const [preview,    setPreview]    = useState(false);
  const [mobileTab,  setMobileTab]  = useState<"metadata" | "editor" | "preview">("editor");
  const [loading,    setLoading]    = useState<SaveStatus | null>(null);
  const [error,      setError]      = useState("");

  // Auto-generate slug dari title
  function handleTitleChange(val: string) {
    setTitle(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
    );
  }

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!tags.includes(newTag)) setTags((prev) => [...prev, newTag]);
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  async function handleSave(status: SaveStatus) {
    if (!title.trim() || !slug.trim() || !excerpt.trim() || !content.trim()) {
      setError("Judul, slug, excerpt, dan konten wajib diisi.");
      return;
    }
    setError("");
    setLoading(status);

    const res = await fetch("/api/admin/posts", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, excerpt, content, coverImage, tags, status }),
    });

    setLoading(null);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Gagal menyimpan artikel.");
    } else {
      router.push("/admin/posts");
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Toolbar */}
      <header className="flex items-center justify-between px-4 md:px-6 h-16 border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/admin/posts" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <span className="text-sm font-semibold text-slate-300 hidden sm:inline">Artikel Baru</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile tab toggle */}
          <div className="flex md:hidden rounded-lg border border-slate-700/60 overflow-hidden">
            {(["metadata", "editor", "preview"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMobileTab(tab)}
                className={`px-3 py-1.5 text-xs font-medium transition-all ${
                  mobileTab === tab
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab === "metadata" ? "Info" : tab === "editor" ? "Editor" : "Preview"}
              </button>
            ))}
          </div>
          {/* Desktop preview toggle */}
          <button
            onClick={() => setPreview((v) => !v)}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            {preview ? <EyeOff size={14} /> : <Eye size={14} />}
            {preview ? "Editor" : "Preview"}
          </button>
          {/* Save draft */}
          <button
            onClick={() => handleSave("DRAFT")}
            disabled={!!loading}
            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 transition-all disabled:opacity-50"
          >
            {loading === "DRAFT" ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            <span className="hidden sm:inline">Simpan Draft</span>
          </button>
          {/* Publish */}
          <button
            onClick={() => handleSave("PUBLISHED")}
            disabled={!!loading}
            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all disabled:opacity-50"
          >
            {loading === "PUBLISHED" ? <Loader2 size={13} className="animate-spin" /> : <FileText size={13} />}
            <span className="hidden sm:inline">Publish</span>
          </button>
        </div>
      </header>

      {/* Error */}
      {error && (
        <div className="mx-6 mt-4 px-4 py-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Body */}
      <div className="flex flex-1 min-h-0">

        {/* Metadata sidebar — mobile: show when tab=metadata, desktop: always visible */}
        <aside className={`${mobileTab === "metadata" ? "flex" : "hidden"} md:flex w-full md:w-64 shrink-0 border-r border-slate-800/60 overflow-y-auto p-4 flex-col gap-4`}>
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500">Judul *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Judul artikel..."
              className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500">Slug *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="url-artikel"
              className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm font-mono focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
            <span className="text-xs text-slate-600">/blog/{slug || "..."}</span>
          </div>

          {/* Excerpt */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500">Excerpt *</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Ringkasan singkat artikel (untuk card preview)..."
              rows={3}
              className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* Cover Image */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
              <ImageIcon size={11} />
              Cover Image URL
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-xs focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500">Tags (Enter untuk tambah)</label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
              placeholder="Tulis tag + Enter"
              className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs text-indigo-300 bg-indigo-950/50 border border-indigo-500/20 pl-2 pr-1 py-0.5 rounded-full"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-red-400 transition-colors">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Editor / Preview — mobile: show based on tab, desktop: based on preview toggle */}
        <div className={`${mobileTab === "editor" || mobileTab === "preview" ? "flex" : "hidden"} md:flex flex-1 min-w-0`}>
          {!preview && mobileTab !== "preview" ? (
            /* Markdown editor */
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              spellCheck={false}
              className="flex-1 p-6 bg-[#0d0d14] text-slate-300 text-sm font-mono leading-relaxed resize-none focus:outline-none"
              placeholder="Tulis konten artikel dalam format Markdown..."
            />
          ) : (
            /* Preview */
            <div className="flex-1 overflow-y-auto p-8 bg-[#0a0a0f]">
              <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-bold text-white mb-4">
                  {title || "Judul Artikel"}
                </h1>
                {tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap mb-6">
                    {tags.map((tag) => (
                      <span key={tag} className="text-xs text-indigo-300 bg-indigo-950/40 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <MarkdownRenderer content={content} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
