import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration - Update this URL with your actual Vercel deployment
const VERCEL_URL = 'https://align-iq.vercel.app' // ← Your actual Vercel deployment

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Default to production mode for testing Vercel deployment
  const isLocalMode = mode === 'local'
  
  const proxyConfig = {
    target: isLocalMode ? 'http://localhost:3001' : VERCEL_URL,
    changeOrigin: true,
    secure: !isLocalMode,
    ...(isLocalMode && { rewrite: (path) => path.replace(/^\/api/, '') })
  }
  
  console.log(`🚀 Vite Configuration:`)
  console.log(`   Mode: ${isLocalMode ? 'Local Development' : 'Production (Vercel)'}`)
  console.log(`   API Target: ${proxyConfig.target}`)
  console.log(`   Path Rewrite: ${isLocalMode ? 'Enabled' : 'Disabled'}`)
  
  if (!isLocalMode) {
    console.log(`   📝 To use local development, run: npm run dev:local`)
    console.log(`   🌐 To update Vercel URL, edit vite.config.js`)
  }
  
  return {
    plugins: [react()],
    build: {
      target: 'es2020'
    },
    server: {
      proxy: {
        '/api': proxyConfig
      }
    }
  }
})