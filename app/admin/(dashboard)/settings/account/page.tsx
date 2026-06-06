"use client";

import { useState } from "react";
import { Save, Loader2, KeyRound } from "lucide-react";

export default function AccountSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSave() {
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password baru minimal 8 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/account/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Gagal mengubah password.");
      } else {
        setSuccess("Password berhasil diubah!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setError("Gagal mengubah password.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-lg">
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
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center">
            <KeyRound size={18} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Ubah Password</h3>
            <p className="text-xs text-slate-500">Pastikan password baru minimal 8 karakter.</p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-500">Password Lama</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => { setCurrentPassword(e.target.value); setSuccess(""); }}
            className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-500">Password Baru</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => { setNewPassword(e.target.value); setSuccess(""); }}
            placeholder="Minimal 8 karakter"
            className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-500">Konfirmasi Password Baru</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setSuccess(""); }}
            placeholder="Ketik ulang password baru"
            className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all disabled:opacity-50"
      >
        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
        Ubah Password
      </button>
    </div>
  );
}
