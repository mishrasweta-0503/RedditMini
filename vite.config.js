import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/reddit': {
        target: 'https://www.reddit.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/reddit/, ''),
        // Adding a User-Agent makes the request much more likely to succeed
        headers: {
          'User-Agent': 'web:mini-reddit-app:v1.0 (by /u/yourusername)'
        }
      },
    },
  },
})