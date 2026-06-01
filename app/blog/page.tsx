/**
 * app/blog/page.tsx — Halaman daftar artikel blog.
 *
 * Mengambil semua artikel yang berstatus PUBLISHED dari PostgreSQL.
 * Menampilkan grid BlogCard yang responsif.
 */

import type { Metadata } from "next";
import { getPublishedPosts, BlogCard } from "@/modules/blog";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Vindy | Fullstack Developer",
  description:
    "Artikel tentang software engineering, arsitektur sistem, IIoT, dan pengalaman membangun produk enterprise.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="min-h-screen px-4 py-32">
      <div className="mx-auto max-w-6xl">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/50 px-4 py-1.5">
            <BookOpen size={14} className="text-indigo-400" />
            <span className="text-xs font-medium text-indigo-300 tracking-wide">
              Writing & Ideas
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            The{" "}
            <span className="text-gradient">Blog</span>
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-slate-400">
            Tulisan tentang software engineering, arsitektur sistem, IIoT, dan
            pengalaman membangun produk dari nol hingga production.
          </p>
        </div>

        {/* Posts grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📝</div>
            <h2 className="text-xl font-semibold text-slate-400">
              Belum ada artikel.
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Artikel pertama akan segera hadir.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
