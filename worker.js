const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    const url = new URL(request.url);

    switch (url.pathname) {
      case "/api/load":
        return handleLoad(request, env);

      case "/api/save":
        return handleSave(request, env);

      case "/api/commit":
        return handleCommit(request, env);

      default:
        return env.ASSETS.fetch(request);
    }
  },
};

// =========================
// LOAD
// =========================
async function handleLoad(request, env) {
  const url = new URL(request.url);

  const collection = url.searchParams.get("collection");

  if (!collection) {
    return Response.json(
      {
        success: false,
        message: "Collection is required",
      },
      {
        headers: corsHeaders,
      },
      { status: 400 },
    );
  }

  // ==========================
  // 1. cek draft di KV
  // ==========================

  const draft = await env.PORTFOLIO_DATA.get(collection);

  if (draft) {
    return Response.json(
      {
        success: true,
        source: "kv",
        data: JSON.parse(draft),
      },
      {
        headers: corsHeaders,
      },
    );
  }

  // ==========================
  // 2. kalau belum ada draft,
  // baca file bawaan
  // ==========================

  const asset = await fetch(
    `https://raw.githubusercontent.com/dwaryarr/dwaryarr.github.io/main/src/data/${collection}.json`,
  );

  if (!asset.ok) {
    return Response.json(
      {
        success: false,
        message: "Collection not found",
      },
      {
        status: 404,
        headers: corsHeaders,
      },
    );
  }

  return Response.json(
    {
      success: true,
      source: "github",
      data: await asset.json(),
    },
    {
      headers: corsHeaders,
    },
  );
}

// =========================
// SAVE (KV)
// =========================
async function handleSave(request, env) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
    });
  }

  const { collection, content } = await request.json();

  if (!collection) {
    return Response.json(
      {
        success: false,
        message: "Collection is required",
      },
      {
        headers: corsHeaders,
      },
      {
        status: 400,
      },
    );
  }

  await env.PORTFOLIO_DATA.put(collection, JSON.stringify(content, null, 2));

  return Response.json(
    {
      success: true,
      message: `${collection} saved to Cloudflare KV`,
    },
    {
      headers: corsHeaders,
    },
  );
}

// =========================
// COMMIT TO GITHUB
// =========================
async function handleCommit(request, env) {
  console.log("TOKEN =", env.GITHUB_TOKEN);
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { collection } = await request.json();

  if (!collection) {
    return Response.json(
      {
        success: false,
        message: "Collection is required",
      },
      {
        headers: corsHeaders,
      },
      { status: 400 },
    );
  }

  const json = await env.PORTFOLIO_DATA.get(collection);

  if (!json) {
    return Response.json(
      {
        success: false,
        message: "Draft not found",
      },
      {
        headers: corsHeaders,
      },
      { status: 404 },
    );
  }

  const owner = env.GITHUB_OWNER;
  const repo = env.GITHUB_REPO;
  const branch = env.GITHUB_BRANCH;
  const path = `src/data/${collection}.json`;

  const headers = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "dwaryarr-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // ============================
  // Test Token
  // ============================

  const userRes = await fetch("https://api.github.com/user", {
    headers,
  });

  const userText = await userRes.text();

  console.log("USER =", userText);

  if (!userRes.ok) {
    return Response.json(
      {
        success: false,
        error: "GitHub Token Invalid",
        github: userText,
      },
      {
        headers: corsHeaders,
      },
      { status: 401 },
    );
  }

  // ============================
  // Ambil SHA
  // ============================

  const fileRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    {
      headers,
    },
  );

  const fileText = await fileRes.text();

  console.log("FILE =", fileText);

  if (!fileRes.ok) {
    return Response.json(
      {
        success: false,
        error: "Cannot get file",
        github: fileText,
      },
      {
        headers: corsHeaders,
      },
      { status: 500 },
    );
  }

  const file = JSON.parse(fileText);

  // ============================
  // Encode UTF-8 Base64
  // ============================

  const encoded = btoa(String.fromCharCode(...new TextEncoder().encode(json)));

  // ============================
  // Commit
  // ============================

  const commitRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Update ${collection}`,
        content: encoded,
        sha: file.sha,
        branch,
      }),
    },
  );

  const commitText = await commitRes.text();

  console.log("COMMIT =", commitText);

  if (!commitRes.ok) {
    return Response.json(
      {
        success: false,
        error: "Commit failed",
        github: commitText,
      },
      { status: 500 },
    );
  }

  return Response.json(
    {
      success: true,
      github: JSON.parse(commitText),
    },
    {
      headers: corsHeaders,
    },
  );
}
