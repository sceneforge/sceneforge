import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import stylexPlugin from "@stylexjs/rollup-plugin";
import { cleandir } from "rollup-plugin-cleandir";
import copy from "rollup-plugin-copy";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "src/index.ts",
  output: {
    chunkFileNames: "chunks/[name].js",
    compact: true,
    dir: "dist",
    format: "esm",
    sourcemap: true,
    validate: true,
  },
  plugins: [
    cleandir("dist"),
    peerDepsExternal(),
    json(),
    resolve(),
    commonjs(),
    typescript({
      exclude: ["**/*.stories.tsx", "**/*.test.tsx", "**/*.test.ts", "**/*.stories.ts", "**/*.spec.ts", "**/*.spec.tsx", "dist/**/*", "node_modules/**/*"],
      tsconfig: "./tsconfig.build.json",
    }),
    stylexPlugin({
      classNamePrefix: "sf-",
      dev: false,
      fileName: "styles/components.css",
      unstable_moduleResolution: {
        rootDir: globalThis.process.cwd(),
        type: "commonJS",
      },
      useRemForFontSize: true,
    }),
    copy({
      targets: [
        { dest: "dist/styles", src: "src/styles/**/*.css" },
      ],
      verbose: true,
    }),
  ],
  strictDeprecations: true,
};
