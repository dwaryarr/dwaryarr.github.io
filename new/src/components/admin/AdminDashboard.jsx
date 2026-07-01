import { useEffect, useState } from "react";
import { LogOut, Settings } from "lucide-react";
import toast from "react-hot-toast";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { allStores } from "../../lib/stores";
import {
  saveGithubConfig,
  clearGithubConfig,
  hasGithubConfig,
} from "../../lib/githubApi";
import {
  connectDataFolder,
  disconnectDataFolder,
  getDataFolderStatus,
  loadCollectionsFromDataFolder,
} from "../../lib/fileStorage";
import CollectionEditor from "./CollectionEditor";

const TABS = [
  { key: "profile", label: "Profile", singleton: true },
  { key: "projects", label: "Projects", titleField: "title" },
  { key: "skills", label: "Skills", titleField: "category" },
  { key: "experience", label: "Experience", titleField: "role" },
  { key: "education", label: "Education", titleField: "degree" },
  { key: "certificates", label: "Certificates", titleField: "title" },
  { key: "socials", label: "Socials", titleField: "label" },
  { key: "timeline", label: "Timeline", titleField: "title" },
  { key: "blogs", label: "Blog Posts", titleField: "title" },
];

export default function AdminDashboard() {
  const { logout } = useAdminAuth();
  const [tab, setTab] = useState("profile");
  const [showSettings, setShowSettings] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const [dataFolderStatus, setDataFolderStatus] = useState({
    supported: true,
    connected: false,
    name: null,
  });

  const active = TABS.find((t) => t.key === tab);

  useEffect(() => {
    if (!showSettings) return;

    void refreshDataFolderStatus();
  }, [showSettings]);

  async function refreshDataFolderStatus() {
    const status = await getDataFolderStatus();
    setDataFolderStatus(status);
  }

  async function handleConnectDataFolder() {
    try {
      const handle = await connectDataFolder();
      const loadedCollections = await loadCollectionsFromDataFolder(
        Object.keys(allStores),
      );

      Object.entries(loadedCollections).forEach(([collection, value]) => {
        allStores[collection].replaceAll(value);
      });

      setReloadToken((value) => value + 1);
      setDataFolderStatus({
        supported: true,
        connected: true,
        name: handle.name,
      });
      toast.success(`Connected data folder: ${handle.name}`);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleDisconnectDataFolder() {
    try {
      await disconnectDataFolder();
      setReloadToken((value) => value + 1);
      setDataFolderStatus({ supported: true, connected: false, name: null });
      toast.success("Disconnected data folder");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-ink-950">
      <header className="glass sticky top-0 z-20 flex items-center justify-between px-6 py-4">
        <h1 className="font-display text-lg font-semibold text-white">
          Admin Panel
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(true)}
            className="btn-secondary !px-3 !py-1.5 text-xs">
            <Settings size={14} /> Storage Settings
          </button>
          <button
            onClick={logout}
            className="btn-secondary !px-3 !py-1.5 text-xs">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                tab === t.key
                  ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "border-white/10 bg-white/5 text-white/60 hover:text-white"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        <CollectionEditor
          key={active.key}
          name={active.key}
          store={allStores[active.key]}
          isSingleton={!!active.singleton}
          titleField={active.titleField}
          reloadToken={reloadToken}
        />
      </div>

      {showSettings && (
        <GithubSettingsModal
          dataFolderStatus={dataFolderStatus}
          onConnectDataFolder={handleConnectDataFolder}
          onDisconnectDataFolder={handleDisconnectDataFolder}
          onRefreshDataFolderStatus={refreshDataFolderStatus}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

function GithubSettingsModal({
  dataFolderStatus,
  onConnectDataFolder,
  onDisconnectDataFolder,
  onRefreshDataFolderStatus,
  onClose,
}) {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [branch, setBranch] = useState("main");
  const [token, setToken] = useState("");

  function save() {
    saveGithubConfig({ token, owner, repo, branch });
    toast.success("GitHub config saved (stored locally in your browser)");
    onClose();
  }

  function clear() {
    clearGithubConfig();
    toast.success("GitHub config cleared");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}>
      <div
        className="glass w-full max-w-md rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}>
        <h3 className="mb-1 font-display text-lg font-semibold text-white">
          Storage Settings
        </h3>
        <p className="mb-5 text-xs text-white/40">
          Connect a local data folder to write changes straight into the JSON
          files under src/data. This works on Chromium-based browsers over
          localhost or HTTPS.
        </p>

        <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-white">Data folder</p>
              <p className="text-xs text-white/40">
                {dataFolderStatus.supported
                  ? dataFolderStatus.connected
                    ? `Connected: ${dataFolderStatus.name}`
                    : "Not connected"
                  : "File System Access API is not supported in this browser"}
              </p>
            </div>
            <button
              onClick={
                dataFolderStatus.connected
                  ? onDisconnectDataFolder
                  : onConnectDataFolder
              }
              className="btn-secondary !px-4 !py-2 text-sm">
              {dataFolderStatus.connected ? "Disconnect" : "Connect folder"}
            </button>
          </div>
          <button
            onClick={onRefreshDataFolderStatus}
            className="mt-2 text-xs text-[var(--accent)] hover:underline">
            Refresh status
          </button>
        </div>

        <h4 className="mb-2 text-sm font-medium text-white">
          GitHub Integration
        </h4>
        <p className="mb-4 text-xs text-white/40">
          Optional fallback: commit edited JSON files directly to your repo
          using a fine-grained PAT with "Contents: Read and write" permission.
          Stored only in this browser's localStorage.
        </p>
        <div className="space-y-3">
          <input
            placeholder="Owner (username/org)"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="form-input"
          />
          <input
            placeholder="Repo name"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            className="form-input"
          />
          <input
            placeholder="Branch (default: main)"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="form-input"
          />
          <input
            placeholder="Personal Access Token"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="mt-5 flex justify-between gap-2">
          <button onClick={clear} className="btn-secondary !px-4 !py-2 text-sm">
            {hasGithubConfig() ? "Clear" : "Cancel"}
          </button>
          <button onClick={save} className="btn-primary !px-4 !py-2 text-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
