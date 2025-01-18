/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React dependencies
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom')) {
            return 'react-core';
          }
          
          // Material UI core
          if (id.includes('@mui/material') || 
              id.includes('@mui/base') ||
              id.includes('@mui/system')) {
            return 'mui-core';
          }
          
          // Material UI icons
          if (id.includes('@mui/icons-material')) {
            return 'mui-icons';
          }

          // Emotion and styling
          if (id.includes('@emotion') || 
              id.includes('styled-components') ||
              id.includes('@mui/styled-engine')) {
            return 'styling';
          }

          // Other vendor dependencies
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          // Application code splitting
          if (id.includes('src/components/Select')) {
            return 'component-select';
          }
          if (id.includes('src/components/FormGenerator')) {
            return 'component-form';
          }
          if (id.includes('src/styles')) {
            return 'styles';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    chunkSizeWarningLimit: 800,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    },
    target: 'es2018',
    reportCompressedSize: true,
    cssCodeSplit: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  }
});
