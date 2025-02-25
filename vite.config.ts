import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),    
    themePlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Alias '@' to 'src' directory
    },
  },
})
