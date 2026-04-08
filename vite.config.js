import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: "dev",
  publicDir: "public",
  build: {
    lib: {
      entry: resolve(__dirname, "src/widget-entry.jsx"),
      name: "ReviewsWidget",
      formats: ["iife"],
      fileName: () => "reviews-widget.js",
    },
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
