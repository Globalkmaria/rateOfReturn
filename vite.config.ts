/// <reference types="vite/client" />

import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { splitFiles } from './configUtils';

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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          return splitFiles(id);
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
