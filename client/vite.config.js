import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function syncDistPlugin() {
  return {
    name: 'sync-dist-plugin',
    closeBundle() {
      try {
        const clientDist = path.resolve(__dirname, 'dist');
        const rootDist = path.resolve(__dirname, '../dist');
        if (clientDist !== rootDist && fs.existsSync(clientDist)) {
          fs.rmSync(rootDist, { recursive: true, force: true });
          fs.cpSync(clientDist, rootDist, { recursive: true });
          console.log('✓ Successfully synchronized build artifacts to root /dist');
        }
      } catch (err) {
        console.warn('Warning: Could not sync dist to ../dist:', err.message);
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), syncDistPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: true,
    fs: {
      strict: false
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }
})


