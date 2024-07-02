import type { Scene } from "@babylonjs/core/scene";

import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/loaders";
import { getSceneBlobType, sceneFileExtensions } from "@sceneforge/core";

export const sceneLoader = async (
  scene: Scene,
  blob: Blob
) => {
  if (scene.isDisposed) throw new Error("Scene is disposed");

  const type = getSceneBlobType(blob);
  if (type === undefined) throw new Error("Unsupported scene blob type");

  const extension = sceneFileExtensions[type];
  scene.useRightHandedSystem = true;

  return await SceneLoader.ImportMeshAsync(
    null,
    "",
    URL.createObjectURL(blob),
    scene,
    undefined,
    extension
  );
};
