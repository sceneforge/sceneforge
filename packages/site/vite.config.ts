import React from "@vitejs/plugin-react";
import { type UserConfig, defineConfig } from "vite";
import VitePluginMetaEnv from "vite-plugin-meta-env";

const DEFAULT_DEV_PORT = 9009;

export default defineConfig(async ({ command, isPreview, mode }) => {
  const { author, description, keywords, repository, version } = await import(
    "./package.json"
  );

  const isDevelopment = command === "serve" || mode === "development";
  const isProduction
    = command === "build" && mode === "production" && !isPreview;

  const ReactCompilerConfig = {
    sources: (filename: string) => filename.includes("src/"),
  };

  const metaEnvironment = {
    VITE_APP_AUTHOR: author.name,
    VITE_APP_BASE_PATH: "/",
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

  return {
    appType: "spa",
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
    plugins: [
      VitePluginMetaEnv(metaEnvironment, "import.meta.env"),
      React({
        babel: {
          plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        },
      }),
    ],
    server: {
      port: DEFAULT_DEV_PORT,
    },
  } as UserConfig;
});
