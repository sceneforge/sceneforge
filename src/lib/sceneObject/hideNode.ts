import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";

export const hideNode = (node: unknown) => {
  if (node instanceof AbstractMesh) {
    node.isVisible = false;
    return true;
  }
  else if (node instanceof HemisphericLight) {
    node.setEnabled(false);
    return true;
  }
  return false;
};
