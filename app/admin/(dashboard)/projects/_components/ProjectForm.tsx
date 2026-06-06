"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Plus, X, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export interface ProjectFormData {
  title:       string;
  subtitle:    string;
  description: string;
  domain:      string;
  highlights:  string[];
  tech:        string[];
  gradient:    string;
  icon:        string;
  imageUrl:    string;
  liveUrl:     string;
  githubUrl:   string;
  order:       number;
  published:   boolean;
}

interface ProjectFormProps {
  mode:     "create" | "edit";
  initial?: ProjectFormData;
  projectId?: string;
}

const GRADIENT_OPTIONS = [
  { label: "Indigo → Purple",  value: "from-indigo-500 to-purple-600" },
  { label: "Amber → Orange",   value: "from-amber-500 to-orange-600" },
  { label: "Emerald → Teal",   value: "from-emerald-500 to-teal-600" },
  { label: "Rose → Pink",      value: "from-rose-500 to-pink-600" },
  { label: "Cyan → Blue",      value: "from-cyan-500 to-blue-600" },
  { label: "Yellow → Red",     value: "from-yellow-500 to-red-600" },
  { label: "Violet → Fuchsia", value: "from-violet-500 to-fuchsia-600" },
  { label: "Slate → Gray",     value: "from-slate-500 to-gray-600" },
];

export default function ProjectForm({ mode, initial, projectId }: ProjectFormProps) {
  const router = useRouter();

  const [title,       setTitle]       = useState(initial?.title ?? "");
  const [subtitle,    setSubtitle]    = useState(initial?.subtitle ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [domain,      setDomain]      = useState(initial?.domain ?? "");
  const [highlights,  setHighlights]  = useState<string[]>(initial?.highlights ?? []);
  const [tech,        setTech]        = useState<string[]>(initial?.tech ?? []);
  const [gradient,    setGradient]    = useState(initial?.gradient ?? "from-indigo-500 to-purple-600");
  const [icon,        setIcon]        = useState(initial?.icon ?? "📁");
  const [imageUrl,    setImageUrl]    = useState(initial?.imageUrl ?? "");
  const [liveUrl,     setLiveUrl]     = useState(initial?.liveUrl ?? "");
  const [githubUrl,   setGithubUrl]   = useState(initial?.githubUrl ?? "");
  const [order,       setOrder]       = useState(initial?.order ?? 0);
  const [published,   setPublished]   = useState(initial?.published ?? true);

  const [highlightInput, setHighlightInput] = useState("");
  const [techInput,      setTechInput]      = useState("");
  const [loading,        setLoading]        = useState(false);
  const [error,          setError]          = useState("");

  function addHighlight(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && highlightInput.trim()) {
      e.preventDefault();
      const val = highlightInput.trim();
      if (!highlights.includes(val)) setHighlights((p) => [...p, val]);
      setHighlightInput("");
    }
  }

  function addTech(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && techInput.trim()) {
      e.preventDefault();
      const val = techInput.trim();
      if (!tech.includes(val)) setTech((p) => [...p, val]);
      setTechInput("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !subtitle.trim() || !description.trim() || !domain.trim()) {
      setError("Title, subtitle, description, dan domain wajib diisi.");
      return;
    }
    setError("");
    setLoading(true);

    const payload = { title, subtitle, description, domain, highlights, tech, gradient, icon, imageUrl, liveUrl, githubUrl, order, published };
    const url    = mode === "edit" ? `/api/admin/projects/${projectId}` : "/api/admin/projects";
    const method = mode === "edit" ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Gagal menyimpan project.");
    } else {
      router.push("/admin/projects");
      router.refresh();
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/projects" className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-bold text-white">
          {mode === "create" ? "Project Baru" : "Edit Project"}
        </h1>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Title + Subtitle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="SIPLah Gramedia"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Subtitle *</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="National School Procurement Platform"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </div>

        {/* Domain + Icon + Gradient */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Domain *</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="B2B E-Commerce"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Icon (emoji)</label>
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="🛒"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Gradient</label>
            <select
              value={gradient}
              onChange={(e) => setGradient(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            >
              {GRADIENT_OPTIONS.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-400">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi lengkap tentang project..."
            rows={4}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Image URL + Live URL + GitHub URL */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Screenshot URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Live Demo URL</label>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">GitHub URL</label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </div>

        {/* Highlights (tag input) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-400">Highlights (Enter untuk tambah)</label>
          <input
            type="text"
            value={highlightInput}
            onChange={(e) => setHighlightInput(e.target.value)}
            onKeyDown={addHighlight}
            placeholder="Tulis highlight + Enter"
            className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          />
          {highlights.length > 0 && (
            <div className="flex flex-col gap-1.5 mt-1">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/40 border border-slate-700/40 px-3 py-1.5 rounded-lg">
                  <span className="flex-1">{h}</span>
                  <button type="button" onClick={() => setHighlights((p) => p.filter((_, j) => j !== i))} className="text-slate-500 hover:text-red-400 transition-colors">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tech (tag input) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-400">Tech Stack (Enter untuk tambah)</label>
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={addTech}
            placeholder="React, Node.js, dll + Enter"
            className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          />
          {tech.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 text-xs text-indigo-300 bg-indigo-950/50 border border-indigo-500/20 pl-2 pr-1 py-0.5 rounded-full"
                >
                  {t}
                  <button type="button" onClick={() => setTech((p) => p.filter((x) => x !== t))} className="hover:text-red-400 transition-colors">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Order + Published */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Urutan (order)</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              min={0}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Status</label>
            <button
              type="button"
              onClick={() => setPublished((v) => !v)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                published
                  ? "bg-emerald-950/50 border-emerald-500/30 text-emerald-400"
                  : "bg-slate-800/60 border-slate-700/60 text-slate-500"
              }`}
            >
              {published ? <Eye size={14} /> : <EyeOff size={14} />}
              {published ? "Visible" : "Hidden"}
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <Link
            href="/admin/projects"
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-700/60 transition-all"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {mode === "create" ? "Simpan Project" : "Update Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
