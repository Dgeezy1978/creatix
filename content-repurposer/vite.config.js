import { defineConfig } from 'vite';

export default defineConfig({
  // Specify the root directory for the application
  root: '.',

  // Build configuration
  build: {
    outDir: 'dist', // Output directory for the build
    sourcemap: true, // Generate source maps for better tracking
  },

  // Server configuration
  server: {
    port: 3000, // Development server port
    open: true, // Automatically open the app in the browser
  },

  // Plugins can be added here
  plugins: [], // Add Vite plugins as necessary
});