const API_BASE = "https://portfolio.dwaryarr.workers.dev";

export async function saveDraft(collection, content) {
  const res = await fetch(`${API_BASE}/api/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collection,
      content,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to save draft");
  }

  return res.json();
}

export async function loadDraft(collection) {
  const res = await fetch(`${API_BASE}/api/load?collection=${collection}`);

  if (!res.ok) {
    throw new Error("Failed to load draft");
  }

  return res.json();
}

export async function loadAllCollections(names) {
  const result = {};

  for (const name of names) {
    const res = await loadDraft(name);

    result[name] = res.data;
  }

  return result;
}
