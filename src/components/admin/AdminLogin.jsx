import { useState } from "react";
import { Lock } from "lucide-react";
import { useAdminAuth } from "../../hooks/useAdminAuth";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const ok = login(password);
    if (!ok) setError("Incorrect password");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="glass-card w-full max-w-sm rounded-2xl p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
            <Lock size={18} />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold text-white">
              Admin Access
            </h1>
            <p className="text-xs text-white/40">Client-side protected area</p>
          </div>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm text-white/70">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            autoFocus
          />
        </label>
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

        <button type="submit" className="btn-primary mt-6 w-full">
          Sign in
        </button>
        <p className="mt-4 text-center text-[11px] text-white/30">
          Default password: ? (set VITE_ADMIN_PASSWORD in .env to change)
        </p>
      </form>
    </div>
  );
}
