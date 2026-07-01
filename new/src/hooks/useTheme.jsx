import { createContext, useContext, useEffect, useState, useMemo } from 'react';

const ThemeContext = createContext(null);
const ACCENTS = ['blue', 'purple', 'cyan', 'green'];

export function ThemeProvider({ children }) {
  const [accent, setAccentState] = useState(() => localStorage.getItem('portfolio:accent') || 'blue');

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    localStorage.setItem('portfolio:accent', accent);
  }, [accent]);

  // Dark mode is always-on by default per spec, but we expose a toggle
  // in case the user wants a light mode in the future.
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const value = useMemo(
    () => ({ accent, setAccent: setAccentState, accents: ACCENTS, dark, setDark }),
    [accent, dark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
