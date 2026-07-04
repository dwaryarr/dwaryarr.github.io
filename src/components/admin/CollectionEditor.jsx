import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Download, Upload, Github } from "lucide-react";
import FormEditor from "../form/FormEditor";
import { schemas } from "../../data/schema";
import { defaults } from "../../data/defaults";

export default function CollectionEditor({
  name,
  data,
  onChange,
  onCommit,
  isSingleton = false,
  titleField = "title",
}) {
  const [editing, setEditing] = useState(null); // item being edited, or 'new', or null
  const [currentData, setCurrentData] = useState({});
  const fileInputRef = useRef(null);
  const schema = schemas[name] ?? [];

  function startEdit(item) {
    setEditing(item ? item.id || "singleton" : "new");

    if (item) {
      setCurrentData(structuredClone(item));
    } else {
      setCurrentData({});
    }
  }

  function buildNextData(parsed) {
    if (isSingleton) {
      return { ...data, ...parsed };
    }

    if (editing === "new") {
      const nextItem = { ...parsed, id: parsed.id || `${name}-${Date.now()}` };
      return [...data, nextItem];
    }

    return data.map((item) =>
      item.id === editing ? { ...item, ...parsed } : item,
    );
  }

  async function save() {
    let nextData;

    if (isSingleton) {
      nextData = currentData;
    } else if (editing === "new") {
      nextData = [
        ...data,
        {
          id: crypto.randomUUID(),
          ...currentData,
        },
      ];
    } else {
      nextData = data.map((item) => (item.id === editing ? currentData : item));
    }

    try {
      await onChange(nextData);

      toast.success("Draft berhasil disimpan");

      setEditing(null);
    } catch (e) {
      toast.error(e.message);
    }
  }

  async function remove(id) {
    if (!confirm("Delete this item?")) return;

    const nextData = data.filter((item) => item.id !== id);

    try {
      await onChange(nextData);

      toast.success("Draft berhasil dihapus");
    } catch (err) {
      toast.error(err.message);
    }
  }

  function importJSON(e) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      let parsed;

      try {
        parsed = JSON.parse(reader.result);
      } catch {
        toast.error("Invalid JSON file");
        return;
      }

      try {
        await onChange(parsed);
        toast.success("Draft berhasil diimport");
      } catch (error) {
        toast.error(error.message || "Failed to write the JSON file");
      }
    };
    reader.readAsText(file);
    input.value = "";
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function commit() {
    try {
      const res = await fetch("/api/commit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collection: name,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || "Commit gagal");
      }

      toast.success("Commit ke GitHub berhasil");
    } catch (err) {
      toast.error(err.message);
    }
  }

  const items = isSingleton ? [data] : data;

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold capitalize text-white">
          {name}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {!isSingleton && (
            <button
              onClick={() => startEdit(structuredClone(schemas[name]))}
              className="btn-secondary !px-3 !py-1.5 text-xs">
              <Plus size={14} /> Add
            </button>
          )}
          <button
            onClick={() => exportJSON()}
            className="btn-secondary !px-3 !py-1.5 text-xs">
            <Download size={14} /> Export
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-secondary !px-3 !py-1.5 text-xs">
            <Upload size={14} /> Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={importJSON}
          />
          <button
            onClick={commit}
            className="btn-primary !px-3 !py-1.5 text-xs">
            <Github size={14} />
            Commit
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={item.id || i}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
            <span className="truncate text-sm text-white/80">
              {isSingleton
                ? "Profile data"
                : item[titleField] || item.name || item.role || item.id}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => startEdit(item)}
                className="rounded-lg p-1.5 text-white/50 hover:bg-white/5 hover:text-white">
                <Pencil size={14} />
              </button>
              {!isSingleton && (
                <button
                  onClick={() => remove(item.id)}
                  className="rounded-lg p-1.5 text-white/50 hover:bg-red-500/10 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="py-6 text-center text-sm text-white/30">
            No items yet.
          </p>
        )}
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-[200] grid place-items-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setEditing(null)}>
          <div
            className="glass w-full max-w-3xl rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-5 text-xl font-bold">
              {editing === "new" ? "Tambah Data" : "Edit Data"}
            </h3>

            {schema.length > 0 ? (
              <FormEditor
                schema={schema}
                value={currentData}
                onChange={setCurrentData}
              />
            ) : (
              <textarea
                rows={18}
                value={JSON.stringify(currentData, null, 2)}
                onChange={(e) => {
                  try {
                    setCurrentData(JSON.parse(e.target.value));
                  } catch {}
                }}
                className="form-input font-mono"
              />
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="btn-secondary"
                onClick={() => setEditing(null)}>
                Cancel
              </button>

              <button className="btn-primary" onClick={save}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
