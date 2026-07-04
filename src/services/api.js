const API_URL =
  window.location.hostname === "dwaryarr.github.io"
    ? "https://portfolio.dwaryarr.workers.dev"
    : "";

export async function loadCollection(collection) {
  const res = await fetch(`${API_URL}/api/load?collection=${collection}`);

  if (!res.ok) {
    throw new Error("Load failed");
  }

  return res.json();
}

export async function saveCollection(collection, content) {
  const res = await fetch(`${API_URL}/api/save`, {
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
  const res = await fetch(`${API_URL}/api/commit`, {
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

export async function getCollectionStatus(collection) {
  const res = await fetch(`${API_URL}/api/status?collection=${collection}`);

  return res.json();
}

export async function discardCollection(collection) {
  const res = await fetch(`${API_URL}/api/discard`, {
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

export async function syncCollection(collection) {
  const res = await fetch(`${API}/api/sync`, {
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
