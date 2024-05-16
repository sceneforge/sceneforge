import React from "@vitejs/plugin-react-swc";
import { type UserConfig, defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import VitePluginBrowserSync from "vite-plugin-browser-sync";
import VitePluginMetaEnv from "vite-plugin-meta-env";
import UnoCSS from "unocss/vite";
import i18nextLoader from "vite-plugin-i18next-loader";

export default defineConfig(async ({ command, mode, isPreview }) => {
  const { description, version, author, repository, keywords } = await import(
    "./package.json"
  );

  const isDev = () => command === "serve" || mode === "development";
  const isProd = () =>
    command === "build" && mode === "production" && !isPreview;

  const metaEnv = {
    VITE_APP_BASE_PATH: "/",
    VITE_APP_NAME: "Scene Forge",
    VITE_APP_DESCRIPTION: description,
    VITE_APP_AUTHOR: author.name,
    VITE_APP_REPOSITORY: repository.url,
    VITE_APP_KEYWORDS: keywords.join(", "),
    VITE_APP_VERSION: isProd()
      ? version
      : isDev()
        ? `dev-${version}`
        : "unknown",
  };

  return {
    base: metaEnv.VITE_APP_BASE_PATH,
    appType: "spa",
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
          navigateFallback: "/",
        },
        injectManifest: {
          sourcemap: "inline",
          maximumFileSizeToCacheInBytes: 40 * 1024 * 1024, // 40MB
          globPatterns: ["**/*.{js,css,html,png,svg,jpg,ico,gif,md,json}"],
        },
        manifest: {
          dir: "ltr",
          lang: "en",
          id: isProd() ? "https://sceneforge.org/" : undefined,
          scope: isProd()
            ? "https://sceneforge.org/"
            : "http://localhost:9000/",
          name: metaEnv.VITE_APP_NAME,
          short_name: metaEnv.VITE_APP_NAME,
          description: metaEnv.VITE_APP_DESCRIPTION,
          start_url: "/",
          display_override: [
            "window-controls-overlay",
            "fullscreen",
            "minimal-ui",
          ],
          file_handlers: [
            {
              action: isProd() ? "https://sceneforge.org/" : "/",
              accept: {
                "application/json": [".scfg", ".sceneforge"],
              },
            },
          ],
          display: "standalone",
          orientation: "natural",
          background_color: "#86159d",
          theme_color: "#86159d",
          edge_side_panel: {
            preferred_width: 480,
          },
          handle_links: "preferred",
          categories: [
            "productivity",
            "utilities",
            "education",
            "entertainment",
          ],
          launch_handler: {
            client_mode: ["focus-existing", "navigate-existing", "auto"],
          },
          shortcuts: [
            {
              name: "New Scene",
              short_name: "New",
              url: "/index.html#!action=new-tab&tab=new-scene",
              description: "Create a new scene",
              icons: [
                {
                  src: "icons/shortcut-icon-deployed-code.png",
                  sizes: "96x96",
                  type: "image/png",
                  purpose: "any",
                },
              ],
            },
            {
              name: "Settings",
              short_name: "Settings",
              url: "/index.html#!action=open-tab&tab=settings",
              description: "Open the settings",
              icons: [
                {
                  src: "icons/shortcut-icon-settings.png",
                  sizes: "96x96",
                  type: "image/png",
                  purpose: "any",
                },
              ],
            },
            {
              name: "About Scene Forge",
              short_name: "About",
              url: "/index.html#!action=open-tab&tab=about",
              description: "About Scene Forge",
              icons: [
                {
                  src: "icons/shortcut-icon-info.png",
                  sizes: "96x96",
                  type: "image/png",
                  purpose: "any",
                },
              ],
            },
          ],
          icons: [
            {
              src: "icons/favicon.ico",
              sizes: "48x48",
              type: "image/x-icon",
              purpose: "any",
            },
            {
              src: "icons/512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "icons/1024.png",
              sizes: "1024x1024",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "icons/icon.svg",
              sizes: "any",
              type: "image/svg+xml",
              purpose: "any",
            },
            {
              src: "icons/monochrome-512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "monochrome",
            },
            {
              src: "icons/monochrome-1024.png",
              sizes: "1024x1024",
              type: "image/png",
              purpose: "maskable monochrome",
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
              url: isProd()
                ? "https://sceneforge.org/manifest.webmanifest"
                : "http://localhost:9000/manifest.webmanifest",
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
