/**
 * app/admin/posts/page.tsx — Daftar semua blog post (CRUD).
 * Server Component: fetch data, tampilkan tabel, tombol aksi via client.
 */

import { getAllPosts } from "@/modules/blog";
import Link from "next/link";
import { PenSquare, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import PostActions from "./_components/PostActions";

async function getPosts() {
  return getAllPosts();
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="mt-1 text-sm text-slate-500">{posts.length} artikel ditemukan</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
        >
          <Plus size={15} />
          Artikel Baru
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-800/60 overflow-x-auto">
        {posts.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <p className="text-4xl mb-3">📝</p>
            <p>Belum ada artikel. Mulai tulis sekarang!</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800/60 bg-slate-900/60">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Judul</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Tags</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Tanggal</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-200 truncate max-w-xs">{post.title}</p>
                    <p className="text-xs text-slate-600 mt-0.5 font-mono">/blog/{post.slug}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        post.status === "PUBLISHED"
                          ? "bg-emerald-950/50 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-950/50 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {post.status === "PUBLISHED" ? <Eye size={11} /> : <EyeOff size={11} />}
                      {post.status === "PUBLISHED" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs text-indigo-300 bg-indigo-950/40 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="text-xs text-slate-600">+{post.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap hidden md:table-cell">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
                        title="Edit"
                      >
                        <PenSquare size={14} />
                      </Link>
                      <PostActions postId={post.id} postStatus={post.status} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
