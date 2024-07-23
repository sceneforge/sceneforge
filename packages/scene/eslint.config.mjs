import common from "@sceneforge/eslint";
import react from "@sceneforge/eslint/react";

export default [
  ...common("../scene/tsconfig.json"),
  ...react(),
];
