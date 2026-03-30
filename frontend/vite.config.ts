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
            if (id.includes('firebase')) {
              return 'firebase';
            }
            if (id.includes('leaflet')) {
              return 'leaflet';
            }
            if (id.includes('@tanstack')) {
              return 'query';
            }
            if (id.includes('react-hook-form')) {
              return 'react-hook-form';
            }
            if (id.includes('zod')) {
              return 'zod';
            }
            if (id.includes('@tiptap')) {
              return 'tiptap';
            }
            if (id.includes('swiper')) {
              return 'swiper';
            }
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 5173,
    open: true,
  },
});
