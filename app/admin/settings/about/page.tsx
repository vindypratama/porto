"use client";

import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";

interface SiteSettings {
  heroHeadline: string;
  heroDescription: string;
  heroAvailability: string;
  heroResumeUrl: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
}

export default function AboutSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    heroHeadline: "",
    heroDescription: "",
    heroAvailability: "",
    heroResumeUrl: "",
    heroCtaPrimary: "",
    heroCtaSecondary: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings({
          heroHeadline:     data.heroHeadline ?? "",
          heroDescription:  data.heroDescription ?? "",
          heroAvailability: data.heroAvailability ?? "",
          heroResumeUrl:    data.heroResumeUrl ?? "",
          heroCtaPrimary:   data.heroCtaPrimary ?? "",
          heroCtaSecondary: data.heroCtaSecondary ?? "",
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat settings.");
        setLoading(false);
      });
  }, []);

  function update(field: keyof SiteSettings, value: string) {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSuccess("");
  }

  async function handleSave() {
    if (!settings.heroHeadline.trim()) {
      setError("Headline wajib diisi.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Gagal menyimpan.");
      } else {
        setSuccess("Settings berhasil disimpan!");
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

      <div className="flex flex-col gap-5">
        <Field label="Headline" value={settings.heroHeadline} onChange={(v) => update("heroHeadline", v)} required />
        <Field label="Description" value={settings.heroDescription} onChange={(v) => update("heroDescription", v)} textarea />
        <Field label="Availability Badge" value={settings.heroAvailability} onChange={(v) => update("heroAvailability", v)} />
        <Field label="Resume URL" value={settings.heroResumeUrl} onChange={(v) => update("heroResumeUrl", v)} placeholder="/resume.pdf" />
        <Field label="Primary CTA Text" value={settings.heroCtaPrimary} onChange={(v) => update("heroCtaPrimary", v)} />
        <Field label="Secondary CTA Text" value={settings.heroCtaSecondary} onChange={(v) => update("heroCtaSecondary", v)} />
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

function Field({
  label,
  value,
  onChange,
  textarea,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-500">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
        />
      )}
    </div>
  );
}
