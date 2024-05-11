/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  resolve: {
    alias: { 
      components: '/src/components',
      app: '/src/app',
      pages: '/src/pages',
      layout: '/src/layout',
      utils: '/src/utils',
      assets: '/src/assets',
      styles: 'src/styles'
    },
  },
});
