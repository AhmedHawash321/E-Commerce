import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split large libraries into their own chunks
          if (id.includes('node_modules')) {
            // Check for specific large libraries first
            if (id.includes('framer-motion')) {
              return 'vendor_framer-motion';
            }
            if (id.includes('recharts')) {
              return 'vendor_recharts';
            }
            if (id.includes('react-confetti')) {
              return 'vendor_confetti';
            }
            if (id.includes('lucide-react') || id.includes('@lucide')) {
              return 'vendor_icons';
            }
            if (id.includes('axios')) {
              return 'vendor_axios';
            }
            if (id.includes('zustand')) {
              return 'vendor_state';
            }
            return 'vendor';
          }
        }
      }
    }
  }
});