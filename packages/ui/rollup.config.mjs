import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import stylexPlugin from '@stylexjs/rollup-plugin';
import copy from "rollup-plugin-copy";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
    compact: true,
    validate: true,
  },
  strictDeprecations: true,
  plugins: [
    peerDepsExternal(),
    json(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      exclude: ["**/*.stories.tsx", "**/*.test.tsx", "**/*.test.ts", "**/*.stories.ts", "**/*.spec.ts", "**/*.spec.tsx"],
    }),
    stylexPlugin({
      fileName: 'styles/components.css',
      dev: false,
      useRemForFontSize: true,
      classNamePrefix: 'sf-',
      unstable_moduleResolution: {
        type: 'commonJS',
        rootDir: process.cwd(),
      },
    }),
    copy({
      targets: [
        { src: 'src/styles/**/*.css', dest: 'dist/styles' },
      ],
      verbose: true,
    }),
  ],
};
