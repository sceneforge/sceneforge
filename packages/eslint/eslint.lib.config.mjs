import tseslint from "typescript-eslint";

/**
 * @param {string | string[] | boolean | null | undefined} project
 * @return {tseslint.Linter.Config}
 */
export default (project = "./tsconfig.node.json") => tseslint.config(
  {
    files: ["lib/**/*.{js,jsx,mjs,ts,tsx,mts,mtsx}"],
    languageOptions: {
      parserOptions: {
        project,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
