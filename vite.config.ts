/// <reference types="vitest" />
/// <reference types="vite/client" />

import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-styled-components', { displayName: true, fileName: false }]],
      },
    }),
    visualizer({
      open: true,
    }),
  ],
  test: {
    exclude: ['**/node_modules/**', '**/dist/**'],
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
    globals: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('react-router-dom') || id.includes('@remix-run') || id.includes('react-router')) {
            return '@react-router';
          } else if (id.includes('react-dom')) {
            return 'react-dom';
          } else if (id.includes('zod')) {
            return 'zod';
          } else if (id.includes('chart.js')) {
            return 'chart';
          } else if (id.includes('axios')) {
            return 'axios';
          } else if (id.includes('redux')) {
            return 'redux';
          } else if (id.includes('styled-components')) {
            return 'styled-components';
          } else if (id.includes('node_modules')) {
            return 'node_modules';
          }
        },
      },
    },
  },
});
