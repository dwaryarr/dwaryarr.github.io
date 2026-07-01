import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Download, Upload, Github } from "lucide-react";
import { commitCollectionToGithub, hasGithubConfig } from "../../lib/githubApi";
import { syncCollectionToDataFolder } from "../../lib/fileStorage";

/**
 * Generic CRUD editor for a single data collection.
 *
 * Props:
 *  - name: collection key (e.g. "projects")
 *  - store: the store object from lib/stores.js (getAll/create/update/remove/exportJSON/replaceAll)
 *  - isSingleton: true for "profile" (single object, not an array)
 *  - titleField: which field to display as the row title (array mode)
 *
 * Editing uses a raw JSON textarea per item — this keeps the editor generic
 * across every collection's differing shape without needing 9 bespoke forms,
 * while still giving full create/read/update/delete capability.
 */
export default function CollectionEditor({
  name,
  store,
  isSingleton = false,
  titleField = "title",
  reloadToken = 0,
}) {
  const [data, setData] = useState(() => store.getAll());
  const [editing, setEditing] = useState(null); // item being edited, or 'new', or null
  const [draft, setDraft] = useState("");
  const fileInputRef = useRef(null);

  function refresh() {
    setData(store.getAll());
  }

  useEffect(() => {
    refresh();
  }, [name, reloadToken]);

  function startEdit(item) {
    setEditing(item ? item.id || "singleton" : "new");
    setDraft(JSON.stringify(item || {}, null, 2));
  }

  async function syncToDataFolder(nextData, successMessage) {
    try {
      const synced = await syncCollectionToDataFolder(name, nextData);
      toast.success(synced ? successMessage : "Saved");
    } catch (error) {
      toast.error(
        error.message || "Saved in browser, but failed to write the JSON file",
      );
    }
  }

  async function save() {
    try {
      const parsed = JSON.parse(draft);
      if (isSingleton) {
        store.update(parsed);
      } else if (editing === "new") {
        store.create(parsed);
      } else {
        store.update(editing, parsed);
      }
      const nextData = store.getAll();
      refresh();
      setEditing(null);
      await syncToDataFolder(
        nextData,
        `Saved and wrote ${name}.json to the connected data folder`,
      );
    } catch {
      toast.error("Invalid JSON — please fix and try again");
    }
  }

  async function remove(id) {
    if (!confirm("Delete this item?")) return;
    store.remove(id);
    const nextData = store.getAll();
    refresh();
    await syncToDataFolder(
      nextData,
      `Deleted and wrote ${name}.json to the connected data folder`,
    );
  }

  function importJSON(e) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const parsed = JSON.parse(reader.result);
        store.replaceAll(parsed);
        const nextData = store.getAll();
        refresh();
        await syncToDataFolder(
          nextData,
          `${name}.json imported and synced to the connected data folder`,
        );
      } catch {
        toast.error("Invalid JSON file");
      }
    };
    reader.readAsText(file);
    input.value = "";
  }

  async function pushToGithub() {
    try {
      await commitCollectionToGithub(name, data);
      toast.success(`Committed ${name}.json to GitHub`);
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
              onClick={() => startEdit(null)}
              className="btn-secondary !px-3 !py-1.5 text-xs">
              <Plus size={14} /> Add
            </button>
          )}
          <button
            onClick={() => store.exportJSON()}
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
          {hasGithubConfig() && (
            <button
              onClick={pushToGithub}
              className="btn-secondary !px-3 !py-1.5 text-xs">
              <Github size={14} /> Push
            </button>
          )}
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
            className="glass w-full max-w-lg rounded-2xl p-5"
            onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-3 font-display text-sm font-semibold text-white">
              {editing === "new" ? "New item" : "Edit item"} — raw JSON
            </h3>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={14}
              className="form-input font-mono text-xs"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditing(null)}
                className="btn-secondary !px-4 !py-2 text-sm">
                Cancel
              </button>
              <button
                onClick={save}
                className="btn-primary !px-4 !py-2 text-sm">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
