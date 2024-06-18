import React from "@vitejs/plugin-react";
import { type UserConfig, defineConfig } from "vite";
import VitePluginBrowserSync from "vite-plugin-browser-sync";
import i18nextLoader from "vite-plugin-i18next-loader";
import VitePluginMetaEnv from "vite-plugin-meta-env";
import { VitePWA } from "vite-plugin-pwa";

import { webManifest } from "./lib/webManifest";

const DEFAULT_DEV_PORT = 9000;

export default defineConfig(async ({ command, isPreview, mode }) => {
  const { author, description, keywords, repository, version } = await import(
    "./package.json"
  );

  const isDevelopment = command === "serve" || mode === "development";
  const isProduction
    = command === "build" && mode === "production" && !isPreview;

  const basePath = "/";

  const metaEnvironment = {
    VITE_APP_AUTHOR: author.name,
    VITE_APP_BASE_PATH: basePath,
    VITE_APP_DESCRIPTION: description,
    VITE_APP_KEYWORDS: keywords.join(", "),
    VITE_APP_NAME: "Scene Forge",
    VITE_APP_REPOSITORY: repository.url,
    VITE_APP_VERSION: isProduction
      ? version
      : (isDevelopment
        ? `dev-${version}`
        : "unknown"),
  };

  const ReactCompilerConfig = {
    sources: (filename: string) => filename.includes("src/"),
  };

  return {
    appType: "spa",
    base: metaEnvironment.VITE_APP_BASE_PATH,
    build: {
      chunkSizeWarningLimit: 40 * 1024,
      manifest: isProduction ? ".vite/manifest.json" : false,
      minify: isProduction ? "terser" : (isDevelopment ? false : "esbuild"),
      rollupOptions: {
        output: {
          compact: true,
        },
        treeshake: {
          preset: "safest",
        },
      },
      sourcemap: isProduction ? "hidden" : "inline",
      ssr: false,
      target: "esnext",
      terserOptions: {
        keep_classnames: false,
      },
    },
    optimizeDeps: {
      include: ["@sceneforge/ui"],
    },
    plugins: [
      i18nextLoader({
        namespaceResolution: "basename",
        paths: ["locales"],
      }),
      VitePluginMetaEnv(metaEnvironment, "import.meta.env"),
      React({
        babel: {
          plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        },
      }),
      VitePWA({
        devOptions: {
          enabled: true,
          navigateFallback: "/",
          type: "module",
        },
        filename: "serviceWorker.ts",
        injectManifest: {
          globPatterns: ["**/*.{js,css,html,png,svg,jpg,ico,gif,md,json}"],
          maximumFileSizeToCacheInBytes: 40 * 1024 * 1024, // 40MB
          sourcemap: "inline",
        },
        manifest: webManifest({
          description: metaEnvironment.VITE_APP_DESCRIPTION,
          devPort: DEFAULT_DEV_PORT,
          isDev: isDevelopment,
          isProd: isProduction,
          name: metaEnvironment.VITE_APP_NAME,
        }),
        registerType: "prompt",
        srcDir: "src",
        strategies: "injectManifest",
      }),
      VitePluginBrowserSync({
        dev: {
          bs: {
            logFileChanges: true,
            notify: true,
          },
          enable: true,
          mode: "snippet",
        },
      }),
    ],
    server: {
      port: DEFAULT_DEV_PORT,
    },
  } as UserConfig;
});
