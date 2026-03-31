import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) return 'firebase';
            if (id.includes('leaflet')) return 'leaflet';
            if (id.includes('@tiptap')) return 'editor';
            if (id.includes('swiper')) return 'swiper';
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom') ||
              id.includes('styled-components')
            ) {
              return 'framework';
            }
            if (id.includes('@tanstack') || id.includes('axios') || id.includes('zustand')) {
              return 'data-layer';
            }
            if (id.includes('react-hook-form') || id.includes('zod')) {
              return 'forms';
            }
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  server: {
    port: 5173,
    open: true,
    headers: {
      'Content-Security-Policy':
        "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://*.firebaseapp.com https://apis.google.com;",
    },
  },
  optimizeDeps: {
    include: ['react-hook-form', 'zod', '@hookform/resolvers/zod'],
  },
});
