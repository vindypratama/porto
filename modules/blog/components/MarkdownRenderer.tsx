/**
 * components/MarkdownRenderer.tsx — Renderer konten Markdown.
 *
 * Menggunakan react-markdown + remark-gfm + rehype-highlight
 * untuk mengubah string Markdown dari database menjadi HTML yang styled.
 *
 * "use client" diperlukan karena react-markdown berjalan di sisi klien.
 */

"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose-custom ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-white mt-8 mb-4 leading-tight">{children}</h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 {...props} className="text-2xl font-bold text-white mt-8 mb-3 pb-2 border-b border-slate-800">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-2">{children}</h3>
          ),
          // Paragraphs
          p: ({ children }) => (
            <p className="text-slate-300 leading-relaxed mb-4">{children}</p>
          ),
          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
            >
              {children}
            </a>
          ),
          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1.5 mb-4 text-slate-300 pl-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1.5 mb-4 text-slate-300 pl-2">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          // Code blocks
          code: ({ className: cls, children, ...props }) => {
            const isBlock = cls?.startsWith("language-");
            return isBlock ? (
              <code
                className={`${cls} block overflow-x-auto rounded-xl p-4 text-sm bg-slate-900 border border-slate-700/60 font-mono`}
                {...props}
              >
                {children}
              </code>
            ) : (
              <code
                className="text-cyan-300 bg-slate-800 border border-slate-700/50 rounded px-1.5 py-0.5 text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="mb-5 overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900">
              {children}
            </pre>
          ),
          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-400 my-4">
              {children}
            </blockquote>
          ),
          // Table
          table: ({ children }) => (
            <div className="overflow-x-auto mb-5">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-slate-700 bg-slate-800 px-4 py-2 text-left font-semibold text-slate-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-slate-700/60 px-4 py-2 text-slate-300">{children}</td>
          ),
          // Horizontal rule
          hr: () => <hr className="border-slate-800 my-8" />,
          // Image
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-xl border border-slate-700/60 max-w-full my-4"
            />
          ),
          // Strong / Em
          strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
          em: ({ children }) => <em className="italic text-slate-300">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
