import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  // This app is served from the root (/) on GitHub Pages.
  // Keep base as "/" so built assets resolve correctly.
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias '@' to 'src' directory
    },
  },
});
