import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import unocss from "@unocss/eslint-config/flat";
import eslintPluginReactCompiler from "eslint-plugin-react-compiler";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config(
  {
    plugins: {
      "react-compiler": fixupPluginRules(eslintPluginReactCompiler),
      "react-hooks": fixupPluginRules(eslintPluginReactHooks),
      "@stylistic": stylistic,
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
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
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
  eslintPluginUnicorn.configs["flat/recommended"],
  stylistic.configs["recommended-flat"],
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,jsx,mjsx,tsx,mtsx}"],
    rules: {
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/max-statements-per-line": ["error", { max: 1 }],
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/member-delimiter-style": ["error", {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
      }],
      "@stylistic/newline-per-chained-call": ["error", {
        ignoreChainWithDepth: 2,
      }],
      "@stylistic/function-paren-newline": ["error", "multiline-arguments"],
      "@stylistic/max-len": ["error", {
        code: 80,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,

      }],
      "@stylistic/comma-dangle": ["error", {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "never",
        enums: "always-multiline",
        generics: "always-multiline",
        tuples: "always-multiline",
      }],
      "unicorn/better-regex": "error",
      "unicorn/switch-case-braces": ["error", "avoid"],
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
          ignore: ["GLTF"],
        },
      ],
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            ref: true,
            Ref: true,
            props: true,
            Props: true,
            params: true,
            Params: true,
            args: true,
          },
        },
      ],
      "unicorn/no-null": "off",
      "unicorn/no-array-reduce": "off",
    },
  }
);
