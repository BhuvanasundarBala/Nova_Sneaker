import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Use absolute base for GitHub Pages (repo name subfolder)
  base: '/Nova_Sneaker/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
