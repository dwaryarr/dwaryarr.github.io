const e=[{id:"blog-1",slug:"building-glassmorphism-ui-with-tailwind",title:"Building Glassmorphism UI with Tailwind CSS",excerpt:"A practical guide to creating elegant frosted-glass interfaces using Tailwind utilities and CSS variables.",coverImage:"/assets/blog/glassmorphism.png",category:"Frontend",tags:["tailwindcss","css","design"],author:"Arya",date:"2026-05-10",content:`## Introduction

Glassmorphism has become a defining aesthetic in modern interfaces, popularized by products like macOS Big Sur and apps like Linear. In this post, we'll build a reusable glass-card component with Tailwind CSS.

## The core recipe

The effect relies on three CSS properties working together:

\`\`\`css
.glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
\`\`\`

## Adding depth with glow

To make cards feel alive, pair the glass effect with a soft neon glow on hover:

\`\`\`css
.glass-card:hover {
  box-shadow: 0 0 40px var(--accent-soft);
}
\`\`\`

## Performance considerations

\`backdrop-filter\` can be expensive on low-end devices. Limit the number of simultaneously blurred elements and avoid animating blur radius directly.

## Conclusion

Glassmorphism works best in dark themes with vibrant accent colors. Combine it with subtle motion (Framer Motion) for a premium feel.`},{id:"blog-2",slug:"vite-vs-cra-2026",title:"Why I Migrated From Create React App to Vite",excerpt:"A breakdown of the build time, DX, and bundle size improvements after switching to Vite.",coverImage:"/assets/blog/vite.png",category:"Tooling",tags:["vite","react","performance"],author:"Your Name",date:"2026-02-18",content:`## Why migrate?

Create React App had been unmaintained for a while, and our local dev server startup time had crept up to nearly 30 seconds.

## The migration process

1. Install Vite and the React plugin
2. Move \`public/index.html\` to the project root and adjust script tags
3. Replace \`process.env\` references with \`import.meta.env\`
4. Update absolute imports via \`vite.config.js\`

\`\`\`bash
npm install vite @vitejs/plugin-react -D
\`\`\`

## Results

Dev server cold start dropped from ~28s to under 1s thanks to native ESM and esbuild pre-bundling. Production build times improved roughly 3x.

## Final thoughts

If you're still on CRA, the migration pays for itself within a single sprint.`}];export{e as b};
