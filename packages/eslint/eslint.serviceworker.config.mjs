import tseslint from "typescript-eslint";
import globals from "globals";

/**
 * @param {string | string[] | boolean | null | undefined} project
 * @return {tseslint.Linter.Config}
 */
export default (project = true) => tseslint.config(
  {
    files: ["src/sw/**/*.{js,mjs,cjs,ts,mts}"],
    languageOptions: {
      globals: globals.serviceworker,
      parserOptions: {
        project,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
