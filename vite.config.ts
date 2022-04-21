import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "DockerSetupAction"
    },
    sourcemap: true
  },
  resolve: {
    alias: { "@": resolve(__dirname, "src") }
  }
});
