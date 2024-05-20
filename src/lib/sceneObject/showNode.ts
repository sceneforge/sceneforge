import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";

export const showNode = (node: unknown) => {
  if (node instanceof AbstractMesh) {
    node.isVisible = true;
    return true;
  } else if (node instanceof HemisphericLight) {
    node.setEnabled(true);
    return true;
  }
  return false;
};
