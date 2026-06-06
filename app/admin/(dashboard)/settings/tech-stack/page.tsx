"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Loader2, ChevronDown, ChevronRight, X } from "lucide-react";

interface TechStackItem {
  id: string;
  name: string;
  icon: string | null;
  sortOrder: number;
  groupId: string;
}

interface TechStackGroup {
  id: string;
  name: string;
  color: string;
  sortOrder: number;
  items: TechStackItem[];
}

const COLORS = ["indigo", "cyan", "emerald", "amber", "rose", "violet", "slate"];

export default function TechStackSettingsPage() {
  const [groups, setGroups] = useState<TechStackGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupColor, setNewGroupColor] = useState("indigo");

  async function loadGroups() {
    try {
      const res = await fetch("/api/admin/settings/tech-stack");
      const data = await res.json();
      setGroups(data);
    } catch {
      setError("Gagal memuat tech stack.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadGroups(); }, []);

  async function handleCreateGroup() {
    if (!newGroupName.trim()) return;
    setError("");
    try {
      const res = await fetch("/api/admin/settings/tech-stack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newGroupName,
          color: newGroupColor,
          sortOrder: groups.length + 1,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Gagal membuat group.");
      } else {
        setNewGroupName("");
        loadGroups();
      }
    } catch {
      setError("Gagal membuat group.");
    }
  }

  async function handleDeleteGroup(id: string) {
    if (!confirm("Hapus group ini dan semua itemnya?")) return;
    try {
      await fetch(`/api/admin/settings/tech-stack/${id}`, { method: "DELETE" });
      loadGroups();
    } catch {
      setError("Gagal menghapus group.");
    }
  }

  async function handleUpdateGroup(id: string, data: Partial<TechStackGroup>) {
    try {
      await fetch(`/api/admin/settings/tech-stack/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      loadGroups();
    } catch {
      setError("Gagal mengupdate group.");
    }
  }

  async function handleAddItem(groupId: string, name: string, icon: string) {
    if (!name.trim()) return;
    try {
      const group = groups.find((g) => g.id === groupId);
      await fetch("/api/admin/settings/tech-stack/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          icon: icon || null,
          sortOrder: (group?.items.length ?? 0) + 1,
          groupId,
        }),
      });
      loadGroups();
    } catch {
      setError("Gagal menambah item.");
    }
  }

  async function handleDeleteItem(id: string) {
    try {
      await fetch(`/api/admin/settings/tech-stack/items/${id}`, { method: "DELETE" });
      loadGroups();
    } catch {
      setError("Gagal menghapus item.");
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
    <div className="max-w-3xl">
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Create new group */}
      <div className="mb-6 p-4 rounded-xl border border-slate-800/60 bg-slate-900/40">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Tambah Group Baru</h3>
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-xs text-slate-500">Nama Group</label>
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="e.g. Frontend & UI"
              className="px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-500">Warna</label>
            <select
              value={newGroupColor}
              onChange={(e) => setNewGroupColor(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 text-sm focus:outline-none focus:border-indigo-500/60 transition-all"
            >
              {COLORS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleCreateGroup}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Groups list */}
      <div className="flex flex-col gap-3">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            expanded={expandedGroup === group.id}
            onToggle={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
            onDelete={() => handleDeleteGroup(group.id)}
            onUpdate={(data) => handleUpdateGroup(group.id, data)}
            onAddItem={(name, icon) => handleAddItem(group.id, name, icon)}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </div>
    </div>
  );
}

function GroupCard({
  group,
  expanded,
  onToggle,
  onDelete,
  onUpdate,
  onAddItem,
  onDeleteItem,
}: {
  group: TechStackGroup;
  expanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (data: Partial<TechStackGroup>) => void;
  onAddItem: (name: string, icon: string) => void;
  onDeleteItem: (id: string) => void;
}) {
  const [itemName, setItemName] = useState("");
  const [itemIcon, setItemIcon] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(group.name);

  return (
    <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 overflow-hidden">
      {/* Group header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 cursor-pointer hover:bg-slate-800/20 transition-colors" onClick={onToggle}>
        <div className="flex items-center gap-3">
          {expanded ? <ChevronDown size={16} className="text-slate-500" /> : <ChevronRight size={16} className="text-slate-500" />}
          {editingName ? (
            <input
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onBlur={() => { setEditingName(false); if (nameValue.trim()) onUpdate({ name: nameValue }); }}
              onKeyDown={(e) => { if (e.key === "Enter") { setEditingName(false); if (nameValue.trim()) onUpdate({ name: nameValue }); } }}
              onClick={(e) => e.stopPropagation()}
              autoFocus
              className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 text-sm focus:outline-none"
            />
          ) : (
            <span className="text-sm font-semibold text-white" onClick={(e) => { e.stopPropagation(); setEditingName(true); }}>
              {group.name}
            </span>
          )}
          <span className={`text-xs px-2 py-0.5 rounded-full bg-${group.color}-950/50 text-${group.color}-400 border border-${group.color}-500/20`}>
            {group.color}
          </span>
          <span className="text-xs text-slate-600">{group.items.length} items</span>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={group.sortOrder}
            onChange={(e) => { e.stopPropagation(); onUpdate({ sortOrder: parseInt(e.target.value) }); }}
            onClick={(e) => e.stopPropagation()}
            className="px-2 py-1 rounded bg-slate-800/60 border border-slate-700/60 text-slate-400 text-xs focus:outline-none"
          >
            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
              <option key={n} value={n}>Order: {n}</option>
            ))}
          </select>
          <select
            value={group.color}
            onChange={(e) => { e.stopPropagation(); onUpdate({ color: e.target.value }); }}
            onClick={(e) => e.stopPropagation()}
            className="px-2 py-1 rounded bg-slate-800/60 border border-slate-700/60 text-slate-400 text-xs focus:outline-none"
          >
            {COLORS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-all"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Items list (expanded) */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-800/40 pt-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {group.items.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800/60 text-slate-300 border border-slate-700/50"
              >
                {item.icon && <span className="text-slate-500">{item.icon}</span>}
                {item.name}
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="ml-0.5 hover:text-red-400 transition-colors"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>

          {/* Add item form */}
          <div className="flex flex-col sm:flex-row gap-2 items-end">
            <div className="flex-1 flex flex-col gap-1">
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { onAddItem(itemName, itemIcon); setItemName(""); setItemIcon(""); } }}
                placeholder="Nama item..."
                className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-xs focus:outline-none focus:border-indigo-500/60 transition-all"
              />
            </div>
            <input
              type="text"
              value={itemIcon}
              onChange={(e) => setItemIcon(e.target.value)}
              placeholder="Icon (emoji/name)"
              className="w-32 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 text-xs focus:outline-none focus:border-indigo-500/60 transition-all"
            />
            <button
              onClick={() => { onAddItem(itemName, itemIcon); setItemName(""); setItemIcon(""); }}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
