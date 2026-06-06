"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Eye, EyeOff } from "lucide-react";

interface SectionToggles {
  showHero: boolean;
  showAbout: boolean;
  showTechStack: boolean;
  showProjects: boolean;
  showExperience: boolean;
  showContact: boolean;
}

const SECTIONS: { key: keyof SectionToggles; label: string; description: string }[] = [
  { key: "showHero",       label: "Hero",       description: "Section landing dengan nama, headline, dan CTA" },
  { key: "showAbout",      label: "About Me",   description: "Section bio, spesialisasi, dan sentuhan personal" },
  { key: "showTechStack",  label: "Tech Stack",  description: "Section keahlian dan teknologi yang dikuasai" },
  { key: "showProjects",   label: "Projects",    description: "Section proyek unggulan dengan screenshot dan links" },
  { key: "showExperience", label: "Experience",  description: "Section riwayat kerja dan download CV" },
  { key: "showContact",    label: "Contact",     description: "Section kontak dengan email, social links" },
];

export default function SectionsSettingsPage() {
  const [toggles, setToggles] = useState<SectionToggles>({
    showHero: true,
    showAbout: true,
    showTechStack: true,
    showProjects: true,
    showExperience: true,
    showContact: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        setToggles({
          showHero:       data.showHero ?? true,
          showAbout:      data.showAbout ?? true,
          showTechStack:  data.showTechStack ?? true,
          showProjects:   data.showProjects ?? true,
          showExperience: data.showExperience ?? true,
          showContact:    data.showContact ?? true,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat settings.");
        setLoading(false);
      });
  }, []);

  function toggle(key: keyof SectionToggles) {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    setSuccess("");
  }

  async function handleSave() {
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toggles),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Gagal menyimpan.");
      } else {
        setSuccess("Section toggles berhasil disimpan!");
      }
    } catch {
      setError("Gagal menyimpan settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-slate-500">
        <Loader2 size={16} className="animate-spin" />
        Memuat...
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-sm">
          {success}
        </div>
      )}

      <p className="text-sm text-slate-500 mb-6">
        Aktifkan atau nonaktifkan section yang tampil di halaman publik portfolio.
      </p>

      <div className="flex flex-col gap-3">
        {SECTIONS.map(({ key, label, description }) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
              toggles[key]
                ? "bg-slate-900/40 border-indigo-500/30"
                : "bg-slate-900/20 border-slate-800/40 opacity-60"
            }`}
          >
            <div className="text-left">
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{description}</p>
            </div>
            <div className={`p-2 rounded-lg ${toggles[key] ? "text-indigo-400" : "text-slate-600"}`}>
              {toggles[key] ? <Eye size={18} /> : <EyeOff size={18} />}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all disabled:opacity-50"
      >
        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
        Simpan
      </button>
    </div>
  );
}
