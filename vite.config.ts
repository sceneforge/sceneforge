import React from "@vitejs/plugin-react-swc";
import { type UserConfig, defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import VitePluginBrowserSync from "vite-plugin-browser-sync";
import VitePluginMetaEnv from "vite-plugin-meta-env";
import UnoCSS from "unocss/vite";

export default defineConfig(async ({ command, mode, isPreview }) => {
  const { description, version } = await import("./package.json");

  const isDev = () => command === "serve" || mode === "development";
  const isProd = () =>
    command === "build" && mode === "production" && !isPreview;

  const metaEnv = {
    VITE_APP_NAME: "Scene Forge",
    VITE_APP_DESCRIPTION: description,
    VITE_APP_VERSION: isProd()
      ? version
      : isDev()
      ? `dev-${version}`
      : "unknown",
  };

  return {
    plugins: [
      VitePluginMetaEnv(metaEnv, "import.meta.env"),
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
          id: "phinpho.github.io/scene-forge",
          name: metaEnv.VITE_APP_NAME,
          short_name: metaEnv.VITE_APP_NAME,
          description: metaEnv.VITE_APP_DESCRIPTION,
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
      }),
    ],
    server: {
      port: 9000,
    },
    build: {
      manifest: isProd() ? ".vite/manifest.json" : false,
      ssr: false,
      minify: isProd() ? "terser" : isDev() ? false : "esbuild",
      terserOptions: {
        keep_classnames: false,
      },
      sourcemap: isDev() ? "inline" : "hidden",
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
  } as UserConfig;
});
