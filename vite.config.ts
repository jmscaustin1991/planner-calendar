
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use VITE_BASE to set the correct base path for GitHub Pages (e.g., "/repo-name/")
const base = process.env.VITE_BASE || '/'

export default defineConfig({
  plugins: [react()],
  base,
  server: { port: 5173 },
  preview: { port: 5173 }
})
