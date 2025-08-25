import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { generateSitemap } from "tanstack-router-sitemap";
import { sitemap } from "./src/utils/sitemap";
// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0", // listen on all IPs
    port: 3000, // optional, choose your port
  },
  plugins: [
    generateSitemap(sitemap),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
