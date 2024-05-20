import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import unocss from "@unocss/eslint-config/flat";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginReactCompiler from "eslint-plugin-react-compiler";

export default tseslint.config(
  {
    plugins: {
      "react-compiler": eslintPluginReactCompiler,
    },
  },
  {
    ignores: ["dist/**/*", "node_modules/**/*", "dev-dist/**/*", ".yarn/**/*"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["*.config.ts", "lib/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["src/**/*.{ts,tsx,mts,mtsx}"],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["*.js", "*.mjs", "*.cjs"],
    ...tseslint.configs.disableTypeChecked,
  },
  unocss,
  {
    files: ["src/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...react.recommended,
    rules: {
      "react-compiler/react-compiler": "error",
    },
  },
  {
    files: ["src/sw/**/*.{js,mjs,cjs,ts,mts}"],
    languageOptions: {
      parserOptions: {
        project: "./src/sw/tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.serviceworker,
    },
  },
  prettierRecommended,
);
