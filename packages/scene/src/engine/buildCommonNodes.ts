import type { Scene } from "@babylonjs/core/scene";

import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export const buildCommonNodes = (scene: Scene) => {
  if (scene.isDisposed) throw new Error("Scene is disposed");

  const camera = new FreeCamera("camera", new Vector3(0, 0, -10), scene);

  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  return {
    camera,
    light,
  };
};
