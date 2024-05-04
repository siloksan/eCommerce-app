import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { 
      components: '/src/components',
      app: '/src/app',
      pages: '/src/pages',
      layout: '/src/layout',
      utils: '/src/utils'
    },
  },
});
