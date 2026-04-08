import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/widget-entry.jsx",
      name: "ReviewsWidget",
      formats: ["iife"],
      fileName: () => "reviews-widget.js",
    },
  },
});
