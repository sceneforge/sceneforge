import common from "@sceneforge/eslint";
import configs from "@sceneforge/eslint/configs";
import lib from "@sceneforge/eslint/lib";
import react from "@sceneforge/eslint/react";
import serviceworker from "@sceneforge/eslint/serviceworker";

export default [
  ...common,
  ...react,
  ...lib,
  ...configs,
  ...serviceworker,
];
