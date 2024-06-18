import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  {
    files: ["src/sw/**/*.{js,mjs,cjs,ts,mts}"],
    languageOptions: {
      globals: globals.serviceworker,
      parserOptions: {
        project: "./src/sw/tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
