import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-styled-components', { displayName: true, fileName: false }]],
      },
    }),
  ],
});
