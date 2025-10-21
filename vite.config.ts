import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import path from "path"

export default defineConfig({
  root: '.',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "_components": path.resolve(__dirname, "./src/components"),
      "_library": path.resolve(__dirname, "./src/library"),
    }
  },
  plugins: [tailwindcss(), react()],
  // Remove tsconfigPaths() for now
})