/**
 * app/blog/[slug]/page.tsx — Halaman detail artikel blog.
 *
 * Mengambil artikel berdasarkan slug, lalu merender konten Markdown.
 * Mendukung generateStaticParams untuk SSG saat ada artikel published.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, MarkdownRenderer } from "@/modules/blog";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Artikel tidak ditemukan" };

  return {
    title:       `${post.title} — Blog Vindy`,
    description: post.excerpt,
    openGraph: {
      title:       post.title,
      description: post.excerpt,
      images:      post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("id-ID", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  });
}

function readingTime(content: string): string {
  const words   = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} menit baca`;
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post || post.status !== "PUBLISHED") notFound();

  return (
    <main className="min-h-screen px-4 py-32">
      <div className="mx-auto max-w-3xl">

        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          Kembali ke Blog
        </Link>

        {/* Cover image */}
        {post.coverImage && (
          <div className="rounded-2xl overflow-hidden border border-slate-700/60 mb-10">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
          </div>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <Tag size={13} className="text-indigo-400" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-indigo-300 bg-indigo-950/60 border border-indigo-500/20 px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-500 pb-8 border-b border-slate-800 mb-8">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            {readingTime(post.content)}
          </span>
          <span className="text-slate-600">
            Oleh <span className="text-slate-400">{post.author.name}</span>
          </span>
        </div>

        {/* Markdown content */}
        <MarkdownRenderer content={post.content} />

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            Lihat semua artikel
          </Link>
        </div>
      </div>
    </main>
  );
}
