import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import perfectionistNatural from "eslint-plugin-perfectionist/configs/recommended-natural";
import react from "eslint-plugin-react";
import eslintPluginReactCompiler from "eslint-plugin-react-compiler";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    plugins: {
      "@stylistic": stylistic,
    },
  },
  {
    ignores: ["dist/*", "dev-dist/*", "node_modules/**/*", ".yarn/**/*"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["*.config.ts", "lib/**/*.{js,jsx,mjs,ts,tsx,mts,mtsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["*.js", "*.mjs", "*.cjs"],
    ...tseslint.configs.disableTypeChecked,
  },
  eslintPluginUnicorn.configs["flat/recommended"],
  stylistic.configs["recommended-flat"],
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,jsx,mjsx,tsx,mtsx}"],
    rules: {
      "@stylistic/comma-dangle": ["error", {
        arrays: "always-multiline",
        enums: "always-multiline",
        exports: "always-multiline",
        functions: "never",
        generics: "always-multiline",
        imports: "always-multiline",
        objects: "always-multiline",
        tuples: "always-multiline",
      }],
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/function-paren-newline": ["error", "multiline-arguments"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/max-len": ["error", {
        code: 80,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
        tabWidth: 2,

      }],
      "@stylistic/max-statements-per-line": ["error", { max: 1 }],
      "@stylistic/member-delimiter-style": ["error", {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
      }],
      "@stylistic/newline-per-chained-call": ["error", {
        ignoreChainWithDepth: 2,
      }],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "unicorn/better-regex": "error",
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
      "unicorn/no-array-reduce": "off",
      "unicorn/no-null": "off",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            Params: true,
            Props: true,
            Ref: true,
            args: true,
            params: true,
            props: true,
            ref: true,
          },
        },
      ],
      "unicorn/switch-case-braces": ["error", "avoid"],
    },
  },
  perfectionistNatural,
  {
    plugins: {
      "react-compiler": fixupPluginRules(eslintPluginReactCompiler),
      "react-hooks": fixupPluginRules(eslintPluginReactHooks),
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
    files: ["src/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...react.recommended,
    rules: {
      "react-compiler/react-compiler": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
    },
  },
  {
    files: ["src/sw/**/*.{js,mjs,cjs,ts,mts}"],
    languageOptions: {
      globals: globals.serviceworker,
      parserOptions: {
        project: "./src/sw/tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
