"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Upload, X } from "lucide-react";

interface LogoSettings {
  logoIcon: string;
  logoText: string;
  logoImageUrl: string | null;
}

const ICON_OPTIONS = [
  "code-2", "terminal", "server", "database", "cpu", "globe",
  "zap", "layers", "shield", "key", "monitor", "radio",
];

export default function LogoSettingsPage() {
  const [settings, setSettings] = useState<LogoSettings>({
    logoIcon: "code-2",
    logoText: "<dev />",
    logoImageUrl: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings({
          logoIcon:     data.logoIcon ?? "code-2",
          logoText:     data.logoText ?? "<dev />",
          logoImageUrl: data.logoImageUrl ?? null,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat settings.");
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logoIcon: settings.logoIcon,
          logoText: settings.logoText,
          logoImageUrl: settings.logoImageUrl,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Gagal menyimpan.");
      } else {
        setSuccess("Logo settings berhasil disimpan!");
      }
    } catch {
      setError("Gagal menyimpan settings.");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/svg+xml", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Tipe file tidak diizinkan. Gunakan PNG, SVG, JPG, atau WEBP.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran file maksimal 2MB.");
      return;
    }

    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/settings/logo/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Gagal mengupload.");
      } else {
        const data = await res.json();
        setSettings((prev) => ({ ...prev, logoImageUrl: data.url }));
        setSuccess("Logo berhasil diupload!");
      }
    } catch {
      setError("Gagal mengupload file.");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemoveImage() {
    setSettings((prev) => ({ ...prev, logoImageUrl: null }));
    try {
      await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logoImageUrl: null }),
      });
      setSuccess("Logo image dihapus.");
    } catch {
      setError("Gagal menghapus logo image.");
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
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-500">Logo Icon (Lucide)</label>
          <div className="flex flex-wrap gap-2">
            {ICON_OPTIONS.map((icon) => (
              <button
                key={icon}
                onClick={() => setSettings((p) => ({ ...p, logoIcon: icon }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  settings.logoIcon === icon
                    ? "bg-indigo-600 border-indigo-500 text-white"
                    : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-600"
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={settings.logoIcon}
            onChange={(e) => setSettings((p) => ({ ...p, logoIcon: e.target.value }))}
            placeholder="atau ketik nama icon..."
            className="mt-1 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm font-mono focus:outline-none focus:border-indigo-500/60 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-500">Brand Text</label>
          <input
            type="text"
            value={settings.logoText}
            onChange={(e) => setSettings((p) => ({ ...p, logoText: e.target.value }))}
            className="px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm font-mono focus:outline-none focus:border-indigo-500/60 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-500">Logo Image (opsional, override icon+text)</label>
          {settings.logoImageUrl ? (
            <div className="flex items-center gap-3">
              <div className="px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <img src={settings.logoImageUrl} alt="Logo" className="h-8 w-auto" />
              </div>
              <button
                onClick={handleRemoveImage}
                className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-all"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:text-white text-sm cursor-pointer transition-all hover:border-slate-600 w-fit">
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              {uploading ? "Mengupload..." : "Upload Image"}
              <input type="file" accept="image/png,image/svg+xml,image/jpeg,image/webp" onChange={handleUpload} className="hidden" />
            </label>
          )}
          <span className="text-xs text-slate-600">PNG, SVG, JPG, WEBP — maks 2MB</span>
        </div>
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
