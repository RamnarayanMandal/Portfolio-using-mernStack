import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    globals: true,
  },
  server: {
    open: false, // Set to false to prevent automatic opening
    host: "0.0.0.0",
    fs: {
      strict: false,
    },
  },
  build: {
    chunkSizeWarningLimit: 1600, // Adjust the chunk size warning limit
  },
  // Add Swiper to optimize dependencies
  optimizeDeps: {
    include: ['swiper'],
  },
});
