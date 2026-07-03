import { useEffect, useState } from "react";
import {
  loadCollection,
  saveCollection,
  commitCollection,
} from "../services/api";
export default function useCollection(name, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const result = await loadCollection(name);

        if (result.success && result.data) {
          setData(result.data);
        }
      } catch (err) {
        console.log(`${name} fallback -> JSON`);
      }

      setLoading(false);
    }

    init();
  }, [name]);

  async function save(nextData) {
    setData(nextData);

    await saveCollection(name, nextData);
  }

  async function reload() {
    const result = await loadCollection(name);

    if (result.success) {
      setData(result.data);
    }
  }

  async function commit() {
    return await commitCollection(name);
  }

  return {
    data,
    save,
    reload,
    commit,
    loading,
  };
}
