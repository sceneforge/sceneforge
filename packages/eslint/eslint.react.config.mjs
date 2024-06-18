import { fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import eslintPluginReactCompiler from "eslint-plugin-react-compiler";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    plugins: {
      "react-compiler": fixupPluginRules(eslintPluginReactCompiler),
      "react-hooks": fixupPluginRules(eslintPluginReactHooks),
    },
  },
  {
    files: ["src/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...react.recommended,
    rules: {
      "react-compiler/react-compiler": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
    },
  },
);
