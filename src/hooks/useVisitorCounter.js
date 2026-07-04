import { useEffect, useState } from "react";

/**
 * A simple in-memory visitor counter. Without browser storage or a backend,
 * this only counts the current session mount.
 */
export function useVisitorCounter() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(1);
  }, []);

  return count;
}
