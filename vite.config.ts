import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    },
    devOptions: {
      enabled: true
    },
    manifest: {
      id: "phinpho.github.io/sceneforge",
      name: "Scene Forge",
      short_name: "Scene Forge",
      description: "3D Scene Editor and Exporter with Hotspots and Camera Handlings",
      start_url: "/index.html",
      display_override: ["window-controls-overlay", "minimal-ui"],
      display: "standalone",
      orientation: "landscape",
      background_color: "#000000",
      theme_color: "#000000",
      icons: [
        {
          src: "icons/favicon.ico",
          sizes: "48x48",
          type: "image/x-icon"
        },
        {
          src: "icons/1024-full.png",
          sizes: "1024x1024",
          type: "image/png"
        },
        {
          src: "icons/1024-full.webp",
          sizes: "1024x1024",
          type: "image/webp"
        },
        {
          src: "icons/icon.svg",
          sizes: "any",
          type: "image/svg+xml"
        },
        {
          src: "icons/512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "icons/monochrome-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "monochrome"
        },
        {
          src: "icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "icons/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png"
        },
        {
          src: "icons/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png"
        }
      ]
    }
  })],
  server: {
    port: 9000,
  }
})