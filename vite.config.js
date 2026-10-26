import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Source lives in app/, the build lands in the repo root because GitHub Pages
// serves this repository from `main` / `/` (legacy branch deployment).
// Keeping the output at the root means no workflow or Pages settings change.
export default defineConfig({
  root: 'app',
  base: './',
  publicDir: 'public',
  plugins: [react()],
  build: {
    outDir: '..',
    emptyOutDir: false,
    assetsDir: 'assets',
    cssCodeSplit: false,
    target: 'es2020',
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion-')) {
            return 'motion';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'react';
          }
          return undefined;
        },
      },
    },
  },
});
