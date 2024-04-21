import React from "@vitejs/plugin-react-swc";
import { type UserConfig, defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import VitePluginBrowserSync from "vite-plugin-browser-sync";
import VitePluginMetaEnv from "vite-plugin-meta-env";
import UnoCSS from "unocss/vite";
import i18nextLoader from "vite-plugin-i18next-loader";

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
      i18nextLoader({
        namespaceResolution: "basename",
        paths: ["locales"],
      }),
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
          dir: "ltr",
          lang: "en",
          id: "phinpho.github.io/scene-forge",
          name: metaEnv.VITE_APP_NAME,
          short_name: metaEnv.VITE_APP_NAME,
          description: metaEnv.VITE_APP_DESCRIPTION,
          start_url: "/index.html",
          display_override: [
            "window-controls-overlay",
            "fullscreen",
            "minimal-ui",
          ],
          file_handlers: [
            {
              action: "/#file",
              accept: {
                "application/json": [".scfg", ".sceneforge"],
              },
            },
          ],
          display: "standalone",
          orientation: "landscape",
          background_color: "#86159d",
          theme_color: "#86159d",
          categories: [
            "productivity",
            "utilities",
            "education",
            "entertainment",
          ],
          launch_handler: {
            client_mode: "focus-existing",
          },
          icons: [
            {
              src: "icons/favicon.ico",
              sizes: "48x48",
              type: "image/x-icon",
              purpose: "any",
            },
            {
              src: "icons/1024.png",
              sizes: "1024x1024",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "icons/1024.webp",
              sizes: "1024x1024",
              type: "image/webp",
              purpose: "maskable",
            },
            {
              src: "icons/icon.svg",
              sizes: "any",
              type: "image/svg+xml",
              purpose: "any",
            },
            {
              src: "icons/monochrome-1024.png",
              sizes: "1024x1024",
              type: "image/png",
              purpose: "monochrome",
            },
            {
              src: "icons/favicon-16x16.png",
              sizes: "16x16",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "icons/favicon-32x32.png",
              sizes: "32x32",
              type: "image/png",
              purpose: "any",
            },
          ],
          screenshots: [
            {
              src: "screenshots/macos-main-1280.png",
              sizes: "1280x800",
              type: "image/png",
              form_factor: "wide",
              label: "Entry Screen of Scene Forge",
              platform: "macos",
            },
            {
              src: "screenshots/macos-modelview-1280.png",
              sizes: "1280x800",
              type: "image/png",
              form_factor: "wide",
              label: "Model Viewer and Editor Screen",
              platform: "macos",
            },
            {
              src: "screenshots/ios-main-iphone-15-pro-max.jpeg",
              sizes: "1290x2796",
              type: "image/jpeg",
              form_factor: "narrow",
              label: "Entry Screen of Scene Forge",
              platform: "ios",
            },
          ],
          related_applications: [
            {
              platform: "webapp",
              url: "http://localhost:9000/manifest.json",
            },
          ],
          prefer_related_applications: true,
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

