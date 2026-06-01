/**
 * components/BlogCard.tsx — Card untuk preview artikel blog.
 * Digunakan di halaman /blog (listing).
 */

import Link from "next/link";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";

export interface BlogPost {
  id:          string;
  title:       string;
  slug:        string;
  excerpt:     string;
  coverImage?: string | null;
  tags:        string[];
  publishedAt: Date | string | null;
  author: {
    name: string;
  };
}

interface BlogCardProps {
  post:  BlogPost;
  index: number;
}

function formatDate(date: Date | string | null): string {
  if (!date) return "Unpublished";
  return new Date(date).toLocaleDateString("id-ID", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  });
}

function readingTime(excerpt: string): string {
  const words = excerpt.split(" ").length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden card-glass hover:glow-accent transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 to-cyan-500" />

      {/* Cover image (opsional) */}
      {post.coverImage && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 p-6 flex-1">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <Tag size={11} className="text-indigo-400 shrink-0" />
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-indigo-300 bg-indigo-950/60 border border-indigo-500/20 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-lg font-bold text-white leading-snug group-hover:text-indigo-300 transition-colors">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {readingTime(post.excerpt)}
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group/link"
            aria-label={`Baca artikel: ${post.title}`}
          >
            Baca
            <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
