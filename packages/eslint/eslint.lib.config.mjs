import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["lib/**/*.{js,jsx,mjs,ts,tsx,mts,mtsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
