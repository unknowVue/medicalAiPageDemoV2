import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  // base: './',
  base: '/medicalAiPageDemoV2/', 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    react(),
    // viteSingleFile()
  ],
  server: {
    port: 8087,
    host: true
  }
})
