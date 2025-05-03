import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: "./lib/index.ts",
      name: "CreateContextState",
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        format: "es",
        dir: "dist",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name][extname]",
        preserveModules: true,
        preserveModulesRoot: "lib",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    minify: "terser",
    sourcemap: true,
  },
});
