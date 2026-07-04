import { useState } from "react";
import { LogOut, Settings } from "lucide-react";
import toast from "react-hot-toast";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import defaultData from "../../data";
import useCollection from "../../hooks/useCollection";

import {
  saveGithubConfig,
  clearGithubConfig,
  hasGithubConfig,
} from "../../lib/githubApi";

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
  const profile = useCollection("profile", defaultData.profile);
  const projects = useCollection("projects", defaultData.projects);
  const skills = useCollection("skills", defaultData.skills);
  const experience = useCollection("experience", defaultData.experience);
  const education = useCollection("education", defaultData.education);
  const certificates = useCollection("certificates", defaultData.certificates);
  const socials = useCollection("socials", defaultData.socials);
  const timeline = useCollection("timeline", defaultData.timeline);
  const blogs = useCollection("blogs", defaultData.blogs);
  const webConfig = useCollection("webConfig", defaultData.webConfig);

  const collections = {
    profile,
    projects,
    skills,
    experience,
    education,
    certificates,
    socials,
    timeline,
    blogs,
    webConfig,
  };

  const active = TABS.find((t) => t.key === tab);

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
          name={active.key}
          data={collections[active.key].data}
          onChange={collections[active.key].save}
          onCommit={collections[active.key].commit}
          isSingleton={!!active.singleton}
          titleField={active.titleField}
        />
      </div>

      {showSettings && (
        <GithubSettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}

function GithubSettingsModal({ onClose }) {
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
          GitHub Settings
        </h3>
        <p className="mb-5 text-xs text-white/40">
          Configure the GitHub repository used to publish your portfolio
          updates. Every change made from the admin panel will be committed to
          the repository and automatically deployed through GitHub Pages.
        </p>

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
