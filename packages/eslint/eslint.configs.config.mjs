import tseslint from "typescript-eslint";

/**
 * @param {string | string[] | boolean | null | undefined} project
 * @return {tseslint.Linter.Config}
 */
export default (project = "./tsconfig.node.json") => tseslint.config(
  {
    files: ["*.config.ts"],
    languageOptions: {
      parserOptions: {
        project,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
