/**
 * lib/localStore.js
 *
 * A tiny, dependency-free local "CRUD" layer that simulates a database
 * using the browser's localStorage, seeded from the bundled JSON files.
 *
 * How it works:
 *  - On first load, each collection (profile, projects, skills, ...) is
 *    copied from the static JSON import into localStorage under the key
 *    `portfolio:<collection>`.
 *  - All reads/writes after that go through localStorage so edits made in
 *    the Admin page persist across reloads (per-browser, client-side only).
 *  - The Admin page can also sync writes into the selected local data folder
 *    or push changes to GitHub, but localStorage remains the runtime cache.
 */

const PREFIX = "portfolio:";

function readSeed(collection, seedData) {
  try {
    const raw = localStorage.getItem(PREFIX + collection);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(PREFIX + collection, JSON.stringify(seedData));
    return seedData;
  } catch {
    return seedData;
  }
}

function persist(collection, data) {
  localStorage.setItem(PREFIX + collection, JSON.stringify(data));
}

/**
 * Creates a CRUD interface for a given collection.
 * `seedData` should be the imported JSON (array or object).
 */
export function createStore(collection, seedData) {
  const isArray = Array.isArray(seedData);

  return {
    /** Get all items (array collections) or the object (singleton collections) */
    getAll() {
      return readSeed(collection, seedData);
    },

    /** Get a single item by id (array collections only) */
    getById(id) {
      const data = readSeed(collection, seedData);
      if (!isArray) return data;
      return data.find((item) => item.id === id) || null;
    },

    /** Create a new item (array collections only) */
    create(item) {
      const data = readSeed(collection, seedData);
      if (!isArray)
        throw new Error(`${collection} is a singleton, use update() instead`);
      const newItem = { ...item, id: item.id || `${collection}-${Date.now()}` };
      const next = [...data, newItem];
      persist(collection, next);
      return newItem;
    },

    /** Update an item by id (array) or merge into the object (singleton) */
    update(idOrPatch, patch) {
      const data = readSeed(collection, seedData);
      if (!isArray) {
        const next = { ...data, ...idOrPatch };
        persist(collection, next);
        return next;
      }
      const next = data.map((item) =>
        item.id === idOrPatch ? { ...item, ...patch } : item,
      );
      persist(collection, next);
      return next.find((item) => item.id === idOrPatch);
    },

    /** Delete an item by id (array collections only) */
    remove(id) {
      const data = readSeed(collection, seedData);
      if (!isArray)
        throw new Error(`${collection} is a singleton and cannot be deleted`);
      const next = data.filter((item) => item.id !== id);
      persist(collection, next);
      return next;
    },

    /** Replace the entire collection (used by JSON import) */
    replaceAll(newData) {
      persist(collection, newData);
      return newData;
    },

    /** Reset collection back to the bundled seed JSON */
    reset() {
      persist(collection, seedData);
      return seedData;
    },

    /** Export collection as a downloadable JSON file */
    exportJSON() {
      const data = readSeed(collection, seedData);
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${collection}.json`;
      a.click();
      URL.revokeObjectURL(url);
    },
  };
}
