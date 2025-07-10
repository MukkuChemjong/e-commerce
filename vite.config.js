import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    react(),
    {
      name: "csp-inject",
      transformIndexHtml(html) {
        return html.replace("%VITE_CSP%", useCSP());
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/e-commerce/",
  build: {
    assetsInlineLimit: 4096, // Smaller files inline automatically
  },
});
