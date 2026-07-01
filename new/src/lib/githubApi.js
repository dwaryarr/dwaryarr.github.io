/**
 * lib/githubApi.js
 *
 * Optional integration that lets the Admin page commit updated JSON files
 * directly to your GitHub repository using a fine-grained Personal Access
 * Token (PAT) with "Contents: Read and write" permission, stored only in
 * the browser's localStorage (never sent anywhere except the GitHub API).
 *
 * This is entirely optional — without a token, use Export/Import JSON
 * buttons in the Admin page instead.
 */

const GITHUB_API = 'https://api.github.com';

function getConfig() {
  const raw = localStorage.getItem('portfolio:github-config');
  return raw ? JSON.parse(raw) : null;
}

export function saveGithubConfig({ token, owner, repo, branch = 'main' }) {
  localStorage.setItem('portfolio:github-config', JSON.stringify({ token, owner, repo, branch }));
}

export function clearGithubConfig() {
  localStorage.removeItem('portfolio:github-config');
}

export function hasGithubConfig() {
  return !!getConfig();
}

/**
 * Commits a JSON collection (e.g. "projects") to src/data/<collection>.json
 * by fetching the current file SHA, then creating a commit via the GitHub
 * Contents API.
 */
export async function commitCollectionToGithub(collection, data) {
  const config = getConfig();
  if (!config) throw new Error('GitHub not configured. Add a token in Admin Settings first.');
  const { token, owner, repo, branch } = config;
  const path = `src/data/${collection}.json`;
  const apiUrl = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
  };

  // 1. Get current file SHA (required for updates)
  let sha;
  try {
    const existing = await fetch(`${apiUrl}?ref=${branch}`, { headers });
    if (existing.ok) {
      const json = await existing.json();
      sha = json.sha;
    }
  } catch {
    // file may not exist yet; sha stays undefined for a create
  }

  const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));

  const res = await fetch(apiUrl, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `chore(data): update ${collection}.json via Admin panel`,
      content,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `GitHub API error (${res.status})`);
  }

  return res.json();
}
