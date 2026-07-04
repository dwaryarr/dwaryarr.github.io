import { createContext, useContext, useState, useMemo } from "react";

const AdminAuthContext = createContext(null);

// NOTE: This is a client-side-only gate meant to deter casual access to the
// Admin UI on a static site (no backend = no real auth). Don't store secrets
// here. Change the default password before deploying, or better, set
// VITE_ADMIN_PASSWORD in your .env file (not committed to git).
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export function AdminAuthProvider({ children }) {
  const [authed, setAuthed] = useState(false);

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthed(false);
  };

  const value = useMemo(() => ({ authed, login, logout }), [authed]);
  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx)
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
