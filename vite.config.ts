import React from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import VitePluginBrowserSync from "vite-plugin-browser-sync";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [
    React(),
    UnoCSS(),
    VitePWA({
      srcDir: "src",
      filename: "service-worker.ts",
      strategies: "injectManifest",
      registerType: "prompt",
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
      },
      injectManifest: {
        sourcemap: "inline",
        maximumFileSizeToCacheInBytes: 40 * 1024 * 1024, // 40MB
        globPatterns: ["**/*.{js,css,html,png,svg,jpg,ico,gif}"],
      },
      manifest: {
        id: "phinpho.github.io/sceneforge",
        name: "Scene Forge",
        short_name: "Scene Forge",
        description:
          "3D Scene Editor and Exporter with Hotspots and Camera Handlings",
        start_url: "/index.html",
        display_override: ["window-controls-overlay", "minimal-ui"],
        display: "standalone",
        orientation: "landscape",
        background_color: "#86159d",
        theme_color: "#86159d",
        icons: [
          {
            src: "icons/favicon.ico",
            sizes: "48x48",
            type: "image/x-icon",
          },
          {
            src: "icons/1024-full.png",
            sizes: "1024x1024",
            type: "image/png",
          },
          {
            src: "icons/1024-full.webp",
            sizes: "1024x1024",
            type: "image/webp",
          },
          {
            src: "icons/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
          {
            src: "icons/512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/monochrome-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "monochrome",
          },
          {
            src: "icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "icons/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
        ],
      },
    }),
    VitePluginBrowserSync({
      dev: {
        enable: true,
        mode: "snippet",
        bs: {
          logFileChanges: true,
          notify: true,
        },
      },
      preview: {
        enable: true,
      },
    }),
  ],
  server: {
    port: 9000,
  },
  build: {
    sourcemap: "inline",
    chunkSizeWarningLimit: 40 * 1024,
    rollupOptions: {
      treeshake: {
        preset: "safest",
      },
      output: {
        compact: true,
      },
    },
  },
});
