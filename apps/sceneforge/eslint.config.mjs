import common from "@sceneforge/eslint";
import configs from "@sceneforge/eslint/configs";
import lib from "@sceneforge/eslint/lib";
import react from "@sceneforge/eslint/react";
import serviceworker from "@sceneforge/eslint/serviceworker";

export default [
  ...common("../../apps/sceneforge/tsconfig.json"),
  ...react(),
  ...lib("../../apps/sceneforge/tsconfig.node.json"),
  ...configs("../../apps/sceneforge/tsconfig.node.json"),
  ...serviceworker("../../apps/sceneforge/src/sw/tsconfig.json"),
];
