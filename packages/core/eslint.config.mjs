import common from "@sceneforge/eslint";
import react from "@sceneforge/eslint/react";

export default [
  ...common("../core/tsconfig.json"),
  ...react(),
];
