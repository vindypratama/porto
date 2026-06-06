"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, X } from "lucide-react";

interface ContactLink {
  label: string;
  url: string;
  icon: string;
}

interface ContactSettings {
  contactHeading: string;
  contactDescription: string;
  contactEmail: string;
  contactLinkedIn: string;
  additionalContactLinks: ContactLink[];
}

export default function ContactSettingsPage() {
  const [settings, setSettings] = useState<ContactSettings>({
    contactHeading: "",
    contactDescription: "",
    contactEmail: "",
    contactLinkedIn: "",
    additionalContactLinks: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newLink, setNewLink] = useState<ContactLink>({ label: "", url: "", icon: "" });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        let links: ContactLink[] = [];
        if (Array.isArray(data.additionalContactLinks)) {
          links = data.additionalContactLinks;
        }
        setSettings({
          contactHeading:         data.contactHeading ?? "",
          contactDescription:     data.contactDescription ?? "",
          contactEmail:           data.contactEmail ?? "",
          contactLinkedIn:        data.contactLinkedIn ?? "",
          additionalContactLinks: links,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat settings.");
        setLoading(false);
      });
  }, []);

  function update(field: keyof Omit<ContactSettings, "additionalContactLinks">, value: string) {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSuccess("");
  }

  function addLink() {
    if (!newLink.label.trim() || !newLink.url.trim()) return;
    setSettings((prev) => ({
      ...prev,
      additionalContactLinks: [...prev.additionalContactLinks, newLink],
    }));
    setNewLink({ label: "", url: "", icon: "" });
  }

  function removeLink(index: number) {
    setSettings((prev) => ({
      ...prev,
      additionalContactLinks: prev.additionalContactLinks.filter((_, i) => i !== index),
    }));
  }

  async function handleSave() {
    if (!settings.contactEmail.trim()) {
      setError("Email wajib diisi.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(settings.contactEmail)) {
      setError("Format email tidak valid.");
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
        setSuccess("Contact settings berhasil disimpan!");
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
        <Field label="Heading" value={settings.contactHeading} onChange={(v) => update("contactHeading", v)} />
        <Field label="Description" value={settings.contactDescription} onChange={(v) => update("contactDescription", v)} textarea />
        <Field label="Email" value={settings.contactEmail} onChange={(v) => update("contactEmail", v)} type="email" required />
        <Field label="LinkedIn URL" value={settings.contactLinkedIn} onChange={(v) => update("contactLinkedIn", v)} type="url" />

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-slate-500">Additional Links</label>
          {settings.additionalContactLinks.map((link, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/40 border border-slate-700/40">
              <span className="text-xs text-slate-400 flex-1">{link.label}</span>
              <span className="text-xs text-slate-600 truncate flex-1">{link.url}</span>
              <button onClick={() => removeLink(i)} className="text-slate-500 hover:text-red-400 transition-colors">
                <X size={12} />
              </button>
            </div>
          ))}
          <div className="flex gap-2 items-end">
            <input
              type="text"
              value={newLink.label}
              onChange={(e) => setNewLink((p) => ({ ...p, label: e.target.value }))}
              placeholder="Label (e.g. GitHub)"
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-xs focus:outline-none focus:border-indigo-500/60 transition-all"
            />
            <input
              type="url"
              value={newLink.url}
              onChange={(e) => setNewLink((p) => ({ ...p, url: e.target.value }))}
              placeholder="https://..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-xs focus:outline-none focus:border-indigo-500/60 transition-all"
            />
            <input
              type="text"
              value={newLink.icon}
              onChange={(e) => setNewLink((p) => ({ ...p, icon: e.target.value }))}
              placeholder="Icon"
              className="w-20 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-xs focus:outline-none focus:border-indigo-500/60 transition-all"
            />
            <button
              onClick={addLink}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all"
            >
              Add
            </button>
          </div>
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

function Field({
  label,
  value,
  onChange,
  textarea,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  required?: boolean;
  type?: string;
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
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
        />
      )}
    </div>
  );
}
