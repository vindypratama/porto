"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export interface ExperienceFormData {
  role: string;
  company: string;
  duration: string;
  description: string;
  impact: string;
  current: boolean;
  sortOrder: number;
}

interface ExperienceFormProps {
  mode: "create" | "edit";
  initial?: ExperienceFormData;
  experienceId?: string;
}

export default function ExperienceForm({ mode, initial, experienceId }: ExperienceFormProps) {
  const router = useRouter();

  const [role, setRole]               = useState(initial?.role ?? "");
  const [company, setCompany]         = useState(initial?.company ?? "");
  const [duration, setDuration]       = useState(initial?.duration ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [impact, setImpact]           = useState(initial?.impact ?? "");
  const [current, setCurrent]         = useState(initial?.current ?? false);
  const [sortOrder, setSortOrder]     = useState(initial?.sortOrder ?? 0);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!role.trim() || !company.trim() || !duration.trim() || !description.trim()) {
      setError("Role, company, duration, dan description wajib diisi.");
      return;
    }
    setError("");
    setLoading(true);

    const payload = { role, company, duration, description, impact, current, sortOrder };
    const url    = mode === "edit" ? `/api/admin/experience/${experienceId}` : "/api/admin/experience";
    const method = mode === "edit" ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Gagal menyimpan experience.");
    } else {
      router.push("/admin/experience");
      router.refresh();
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/experience" className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-bold text-white">
          {mode === "create" ? "Tambah Experience" : "Edit Experience"}
        </h1>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Role + Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Role *</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Software Engineer"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Company *</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Kompas Gramedia"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </div>

        {/* Duration + Current */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Duration *</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="2022 — Present"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Status</label>
            <button
              type="button"
              onClick={() => setCurrent((v) => !v)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                current
                  ? "bg-emerald-950/50 border-emerald-500/30 text-emerald-400"
                  : "bg-slate-800/60 border-slate-700/60 text-slate-500"
              }`}
            >
              {current ? "Current Position" : "Past Position"}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-400">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan tanggung jawab dan kontribusi kamu..."
            rows={4}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Impact */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-400">Key Impact / Achievement</label>
          <textarea
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
            placeholder="Gunakan angka jika memungkinkan (e.g. Meningkatkan performa 40%)..."
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Sort Order */}
        <div className="flex flex-col gap-1.5 max-w-[120px]">
          <label className="text-xs font-medium text-slate-400">Urutan</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            min={0}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <Link
            href="/admin/experience"
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
            {mode === "create" ? "Simpan" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
