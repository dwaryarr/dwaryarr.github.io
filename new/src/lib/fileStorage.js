const DB_NAME = "portfolio-admin-file-storage";
const DB_VERSION = 1;
const STORE_NAME = "handles";
const DATA_FOLDER_KEY = "data-folder";

function supportsFileSystemAccess() {
  return (
    typeof window !== "undefined" &&
    "showDirectoryPicker" in window &&
    "indexedDB" in window
  );
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(
        request.error || new Error("Unable to open file storage database"),
      );
  });
}

async function getStoredHandle() {
  if (!supportsFileSystemAccess()) return null;

  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(DATA_FOLDER_KEY);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () =>
      reject(
        request.error || new Error("Unable to read the saved data folder"),
      );

    tx.oncomplete = () => db.close();
    tx.onerror = () => db.close();
    tx.onabort = () => db.close();
  });
}

async function setStoredHandle(handle) {
  if (!supportsFileSystemAccess()) return;

  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put(handle, DATA_FOLDER_KEY);

    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error || new Error("Unable to save the data folder"));
    };
    tx.onabort = () => {
      db.close();
      reject(tx.error || new Error("Unable to save the data folder"));
    };
  });
}

async function clearStoredHandle() {
  if (!supportsFileSystemAccess()) return;

  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.delete(DATA_FOLDER_KEY);

    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error || new Error("Unable to clear the data folder"));
    };
    tx.onabort = () => {
      db.close();
      reject(tx.error || new Error("Unable to clear the data folder"));
    };
  });
}

async function ensureReadWritePermission(handle) {
  const current = await handle.queryPermission({ mode: "readwrite" });
  if (current === "granted") return true;

  const requested = await handle.requestPermission({ mode: "readwrite" });
  return requested === "granted";
}

async function readJsonFile(handle, fileName) {
  const fileHandle = await handle.getFileHandle(fileName, { create: false });
  const file = await fileHandle.getFile();
  return JSON.parse(await file.text());
}

export async function getDataFolderStatus() {
  if (!supportsFileSystemAccess()) {
    return { supported: false, connected: false, name: null };
  }

  const handle = await getStoredHandle();
  if (!handle) {
    return { supported: true, connected: false, name: null };
  }

  const connected = await ensureReadWritePermission(handle);
  return {
    supported: true,
    connected,
    name: connected ? handle.name : null,
  };
}

export async function connectDataFolder() {
  if (!supportsFileSystemAccess()) {
    throw new Error(
      "This browser does not support the File System Access API. Use Chromium on localhost or HTTPS.",
    );
  }

  const handle = await window.showDirectoryPicker({ mode: "readwrite" });
  const granted = await ensureReadWritePermission(handle);

  if (!granted) {
    throw new Error("Permission to the data folder was denied.");
  }

  await setStoredHandle(handle);
  return handle;
}

export async function disconnectDataFolder() {
  await clearStoredHandle();
}

export async function loadCollectionsFromDataFolder(collectionNames) {
  const handle = await getStoredHandle();
  if (!handle) return {};

  const granted = await ensureReadWritePermission(handle);
  if (!granted) return {};

  const entries = await Promise.all(
    collectionNames.map(async (collection) => {
      try {
        return [collection, await readJsonFile(handle, `${collection}.json`)];
      } catch {
        return [collection, null];
      }
    }),
  );

  return Object.fromEntries(entries.filter(([, value]) => value !== null));
}

export async function syncCollectionToDataFolder(collection, data) {
  const handle = await getStoredHandle();
  if (!handle) return false;

  const granted = await ensureReadWritePermission(handle);
  if (!granted) return false;

  const fileHandle = await handle.getFileHandle(`${collection}.json`, {
    create: true,
  });
  const writable = await fileHandle.createWritable();

  try {
    await writable.write(JSON.stringify(data, null, 2));
    await writable.close();
    return true;
  } catch (error) {
    await writable.abort().catch(() => {});
    throw error;
  }
}
