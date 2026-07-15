import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages deployment için relative path ayarı
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
