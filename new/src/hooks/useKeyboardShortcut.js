import { useEffect } from 'react';

/**
 * Listens for a keyboard combo, e.g. useKeyboardShortcut('k', () => {...}, { meta: true })
 */
export function useKeyboardShortcut(key, callback, { meta = false, ctrl = false } = {}) {
  useEffect(() => {
    function handler(e) {
      const metaOk = meta ? e.metaKey || e.ctrlKey : true;
      const ctrlOk = ctrl ? e.ctrlKey : true;
      if (e.key.toLowerCase() === key.toLowerCase() && metaOk && ctrlOk) {
        e.preventDefault();
        callback(e);
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [key, callback, meta, ctrl]);
}
