import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: change `base` to match your GitHub repo name for GitHub Pages,
// e.g. base: '/my-portfolio/'  (must match the repo name exactly, with slashes)
// If deploying to a custom domain or username.github.io root repo, use base: '/'
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
          markdown: [
            "react-markdown",
            "remark-gfm",
            "react-syntax-highlighter",
          ],
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8787",
        changeOrigin: true,
      },
    },
  },
});
