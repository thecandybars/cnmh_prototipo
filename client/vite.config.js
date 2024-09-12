import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import glsl from "vite-plugin-glsl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), glsl()],
  server: {
    mimeTypes: {
      "model/gltf-binary": [".glb"], // Ensure .glb files are served with the correct mime type
    },
  },
  assetsInclude: ["**/*.glb"],
});
