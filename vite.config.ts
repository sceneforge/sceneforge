import React from "@vitejs/plugin-react";
import { type UserConfig, defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import VitePluginBrowserSync from "vite-plugin-browser-sync";
import VitePluginMetaEnv from "vite-plugin-meta-env";
import UnoCSS from "unocss/vite";
import i18nextLoader from "vite-plugin-i18next-loader";
import { webManifest } from "./lib/webManifest";

const DEFAULT_DEV_PORT = 9000;

export default defineConfig(async ({ command, mode, isPreview }) => {
  const { description, version, author, repository, keywords } = await import(
    "./package.json"
  );

  const isDev = command === "serve" || mode === "development";
  const isProd = command === "build" && mode === "production" && !isPreview;

  const metaEnv = {
    VITE_APP_BASE_PATH: "/",
    VITE_APP_NAME: "Scene Forge",
    VITE_APP_DESCRIPTION: description,
    VITE_APP_AUTHOR: author.name,
    VITE_APP_REPOSITORY: repository.url,
    VITE_APP_KEYWORDS: keywords.join(", "),
    VITE_APP_VERSION: isProd ? version : isDev ? `dev-${version}` : "unknown",
  };

  const ReactCompilerConfig = {
    sources: (filename: string) => filename.indexOf("src/") !== -1,
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
      React({
        babel: {
          plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        },
      }),
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
        manifest: webManifest({
          name: metaEnv.VITE_APP_NAME,
          description: metaEnv.VITE_APP_DESCRIPTION,
          isProd: isProd,
          isDev: isDev,
          devPort: DEFAULT_DEV_PORT,
        }),
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
      port: DEFAULT_DEV_PORT,
    },
    build: {
      manifest: isProd ? ".vite/manifest.json" : false,
      ssr: false,
      minify: isProd ? "terser" : isDev ? false : "esbuild",
      terserOptions: {
        keep_classnames: false,
      },
      sourcemap: isProd ? "hidden" : "inline",
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
