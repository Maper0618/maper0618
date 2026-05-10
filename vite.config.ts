import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: true,
    cssMinify: true,
  },
  server: {
    port: 5173,
    open: true,
  },
})
