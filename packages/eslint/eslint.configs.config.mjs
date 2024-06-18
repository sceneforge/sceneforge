import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["*.config.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
