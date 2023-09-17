import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

console.log(process.env.SERVER_URL);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.SERVER_URL ?? "http://localhost:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
