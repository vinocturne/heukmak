import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    proxy: {
      '/api/gameinfo': {
        target: 'https://aion2.plaync.com',
        changeOrigin: true,
        secure: false,
      },
      '/api/character': {
        target: 'https://aion2.plaync.com',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'https://aion2.plaync.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/ko-kr/api'),
        secure: false,
      },
    },
  },
})
