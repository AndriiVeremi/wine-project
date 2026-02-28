/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    env: {
      VITE_FIREBASE_CONFIG: '{"apiKey":"test","authDomain":"test.firebaseapp.com","projectId":"test","storageBucket":"test.appspot.com","messagingSenderId":"123","appId":"1:123:web:test"}',
      VITE_AI_ASSISTANT_ENABLED: 'false',
      VITE_API_URL: 'http://localhost:5005/api',
    },
  },
}));
