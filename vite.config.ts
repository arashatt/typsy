import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
	  server: {
    host: '0.0.0.0', // listen on all IPs
    port: 3000,      // optional, choose your port
  },
    plugins: [    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),

    },
  },

})
