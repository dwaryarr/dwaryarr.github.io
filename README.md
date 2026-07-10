# Portfolio — React 19 + Vite + Tailwind CSS

### multi category dalam 1 project, setup contact forms, setup CRUD profile pict & projects+blogs pict

A modern, elegant, futuristic personal portfolio. Dark mode, glassmorphism,
animated aurora background, fully static, no backend, deployable to GitHub
Pages for free.

## Tech Stack

React 19 · Vite · React Router 7 · Tailwind CSS · Framer Motion ·
React Hook Form + Zod · Lucide Icons · React Hot Toast · react-markdown +
syntax highlighting · Google Apps Script (contact form) · GitHub Pages

## Getting Started

```bash
npm install
cp .env.example .env   # then fill in values (see below)
npm run dev
```

Visit `http://localhost:5173`.

## Project Structure

```
src/
  components/
    ui/          reusable primitives (SectionHeading, ScrollReveal, ...)
    layout/       Navbar, Footer, CommandPalette
    sections/     Home page sections (Hero, FeaturedProjects, ...)
    projects/     Project-specific components
    blog/         Blog-specific components
    admin/        Admin panel components
    common/       SEO, AuroraBackground, BackToTop, ScrollProgressBar
  pages/          one component per route
  layouts/        MainLayout wraps all public pages
  hooks/          useTheme, useAdminAuth, useLenis ...
  lib/            githubApi, contactSchema, utils
  data/           *.json — single source of truth for all content
  i18n/           English + Indonesian translations
  styles/         global Tailwind CSS
```

## Editing Content

All content lives in `src/data/*.json`:
`profile.json`, `projects.json`, `skills.json`, `experience.json`,
`education.json`, `certificates.json`, `socials.json`, `timeline.json`,
`blogs.json`.

You can either:

1. **Edit the JSON files directly** in your code editor (simplest, recommended for git history), or
2. **Use the Admin panel** at `/admin` (password protected) to edit data live in the browser, then connect your local `src/data/` folder so saves are written straight into the JSON files, or commit straight to GitHub via a Personal Access Token (see below).

> The Admin panel still keeps a local browser cache for fast editing (see `src/lib/localStore.js`), but it can now sync changes into the selected data folder so the source JSON files are updated too.

### Admin panel

- URL: `/admin`
- Default password: `admin123` — **change this** by setting `VITE_ADMIN_PASSWORD` in `.env`
- Each collection has Add / Edit / Delete, Export (download `.json`), and Import (`.json` upload)
- In **Storage Settings**, connect your local `src/data/` folder so edits are written directly into the JSON files on disk
- Optional: under the same settings, add a fine-grained Personal Access Token (scope: `Contents: Read and write` on your repo) to commit edited collections directly back to `src/data/*.json` in your repository

## Contact Form (Google Apps Script)

1. Create a Google Sheet with columns: `Timestamp | Name | Email | Subject | Message`
2. **Extensions → Apps Script**, paste:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.subject,
    data.message,
  ]);
  return ContentService.createTextOutput(
    JSON.stringify({ result: "success" }),
  ).setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the deployment URL into `.env` as `VITE_GOOGLE_SCRIPT_URL`

## Deploying to GitHub Pages

### Option A — GitHub Actions (recommended)

1. Push this repo to GitHub.
2. In **Settings → Pages**, set Source to **GitHub Actions**.
3. In **Settings → Secrets and variables → Actions**, add `VITE_GOOGLE_SCRIPT_URL` and `VITE_ADMIN_PASSWORD` as repository secrets (optional but recommended).
4. Edit `vite.config.js` and set `base: '/YOUR_REPO_NAME/'` to match your repo name exactly.
5. Edit `package.json`'s `homepage` field similarly.
6. Push to `main` — `.github/workflows/deploy.yml` builds and deploys automatically.

### Option B — `gh-pages` CLI

```bash
npm run deploy
```

This builds the project and pushes `dist/` to the `gh-pages` branch using the
`gh-pages` package. Make sure `base` in `vite.config.js` and `homepage` in
`package.json` match your repo name first.

### SPA routing on GitHub Pages

GitHub Pages serves static files only, so deep links like `/projects/my-app`
404 by default. This repo includes the standard
[spa-github-pages](https://github.com/rafgraph/spa-github-pages) trick:
`public/404.html` redirects unknown paths back into `index.html`, and
`src/main.jsx` decodes the redirect before React Router takes over. No
extra configuration needed.

## Customization Checklist

- [ ] Replace all content in `src/data/*.json` with your real info
- [ ] Add your avatar, project screenshots, blog covers, certificate images/PDFs to `public/assets/`
- [ ] Update `index.html` meta tags (title, description, OG image, JSON-LD, canonical URL)
- [ ] Update `public/robots.txt` and `public/sitemap.xml` with your real domain
- [ ] Set `base` in `vite.config.js` and `homepage` in `package.json` to your repo name
- [ ] Set `VITE_GOOGLE_SCRIPT_URL` and `VITE_ADMIN_PASSWORD` in `.env`
- [ ] Swap the favicon (`public/favicon.svg`)

## Features

Dark glassmorphism UI with aurora background and neon glow · 11 pages
(Home, About, Skills, Experience, Education, Projects, Certificates, Tech
Stack, Timeline, Blog, Contact) · Markdown blog with syntax highlighting,
table of contents, reading time, prev/next navigation · Project case studies
(challenges/solutions/results) with search & category filters · Animated
career timeline · Certificate grid with PDF/credential links · Animated
skill bars grouped by category · Command palette (⌘K / Ctrl+K) searching
pages, projects, and blog posts · Scroll progress bar, back-to-top, copy
email, download CV · 4-color accent theme switcher · English/Indonesian
i18n · Fully responsive, code-split, lazy-loaded routes · SEO meta tags,
Open Graph, JSON-LD, robots.txt, sitemap.xml · Client-side Admin CRUD with
JSON export/import and optional GitHub commit integration.

## License

MIT — use freely for your own portfolio.
