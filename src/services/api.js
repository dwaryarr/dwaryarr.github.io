const API = "";

export async function loadCollection(collection) {
  const res = await fetch(`${API}/api/load?collection=${collection}`);

  if (!res.ok) {
    throw new Error("Load failed");
  }

  return res.json();
}

export async function saveCollection(collection, content) {
  const res = await fetch(`${API}/api/save`, {
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
    throw new Error("Save failed");
  }

  return res.json();
}

export async function commitCollection(collection) {
  const res = await fetch("/api/commit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collection,
    }),
  });

  return res.json();
}
