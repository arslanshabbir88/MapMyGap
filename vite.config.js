import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel deployment URL
const VERCEL_URL = 'https://aligniq.com'

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
      target: 'es2020',
      // Code obfuscation and protection
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false, // Keep console logs for debugging
          drop_debugger: true,
        },
        mangle: {
          // Mangle variable names to make code harder to read
          toplevel: true,
          reserved: ['React', 'ReactDOM']
        },
        format: {
          // Remove comments and formatting
          comments: false,
          beautify: false
        }
      },
      // Split chunks to make reverse engineering harder
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom']
          }
        }
      }
    },
    server: {
      proxy: {
        '/api': proxyConfig
      }
    }
  }
})