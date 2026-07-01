import { useEffect, useState } from 'react';

/**
 * A simple client-side visitor counter using localStorage. Since this is a
 * static site with no backend, this counts visits from the current browser
 * only (it is NOT a global visitor count). For a real global counter,
 * swap this out for a free service like Vercel's countapi or similar.
 */
export function useVisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const key = 'portfolio:visits';
    const sessionKey = 'portfolio:visited-this-session';
    const already = sessionStorage.getItem(sessionKey);
    let current = Number(localStorage.getItem(key) || 0);
    if (!already) {
      current += 1;
      localStorage.setItem(key, String(current));
      sessionStorage.setItem(sessionKey, '1');
    }
    setCount(current);
  }, []);

  return count;
}
