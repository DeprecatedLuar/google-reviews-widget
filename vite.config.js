import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({ exclude: ["crypto"] }),
  ],
  root: "dev",
  publicDir: "public",
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/widget-entry.jsx"),
      name: "ReviewsWidget",
      formats: ["iife"],
      fileName: () => "reviews-widget.js",
    },
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
