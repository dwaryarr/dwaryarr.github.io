export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    switch (url.pathname) {
      case "/api/load":
        return handleLoad(request, env);

      case "/api/save":
        return handleSave(request, env);

      case "/api/commit":
        return handleCommit(request, env);

      default:
        return new Response("Not Found", {
          status: 404,
        });
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
        status: 400,
      },
    );
  }

  const data = await env.PORTFOLIO_DATA.get(collection);

  return Response.json({
    success: true,
    data: data ? JSON.parse(data) : null,
  });
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
        status: 400,
      },
    );
  }

  await env.PORTFOLIO_DATA.put(collection, JSON.stringify(content, null, 2));

  return Response.json({
    success: true,
    message: `${collection} saved to Cloudflare KV`,
  });
}

// =========================
// COMMIT TO GITHUB
// =========================
async function handleCommit(request, env) {
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
      { status: 404 },
    );
  }

  const owner = "dwaryarr";
  const repo = "dwaryarr.github.io";
  const branch = "main";
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

  return Response.json({
    success: true,
    github: JSON.parse(commitText),
  });
}
