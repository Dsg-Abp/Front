//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//export default defineConfig({
//plugins: [react()],
//)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Divida bibliotecas específicas em chunks separados
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0]; // Usa o nome da biblioteca como chunk
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Aumenta o limite de chunk para 1 MB
  },
});
