import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The dev server proxies /api requests to the Express server on port 5000,
// so the browser can call the API without any CORS setup during development.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
