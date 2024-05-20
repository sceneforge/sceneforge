import {
  SceneLoader,
  type ISceneLoaderAsyncResult,
} from "@babylonjs/core/Loading/sceneLoader";
import { type Scene } from "@babylonjs/core/scene";
import { sceneSnapshot } from "./sceneSnapshot";

export const importGLTF = (
  scene: Scene,
  blob: Blob,
  capture?: (data: string) => void,
  callback?: (data: ISceneLoaderAsyncResult) => void,
) => {
  if (!scene.isDisposed) {
    SceneLoader.ImportMeshAsync(
      "",
      "",
      URL.createObjectURL(blob),
      scene,
      undefined,
      ".glb",
    )
      .then((data) => {
        if (callback) callback(data);
        sceneSnapshot(scene, capture);
      })
      .catch(console.error);
  }
};
