import { SceneLoader } from "@babylonjs/core";
import "@babylonjs/loaders/glTF/2.0";
import { useCallback, type RefObject } from "react";
import { useArcRotateCamera } from "./useArcRotateCamera";
import { useEngine } from "./useEngine";
import { useHemisphericLight } from "./useHemiphericLight";

export const useModelViewer = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const {
    engineRef,
    sceneRef,
    createEngine,
    createScene,
    renderSceneLoop,
    stopRenderSceneLoop,
    disposeEngine,
    disposeScene,
  } = useEngine(canvasRef);
  const {
    cameraRef,
    createCamera,
    attachCamera,
    attachControl,
    detachControl,
    disposeCamera,
  } = useArcRotateCamera(sceneRef);
  const { createLight } = useHemisphericLight(sceneRef);

  const startAll = useCallback(() => {
    createEngine();
    createScene();
    createCamera();
    createLight();
    attachCamera();
    attachControl();
  }, [
    attachCamera,
    attachControl,
    createCamera,
    createEngine,
    createLight,
    createScene,
  ]);

  const disposeAll = useCallback(() => {
    detachControl();
    disposeCamera();
    stopRenderSceneLoop();
    disposeScene();
    disposeEngine();
  }, [
    detachControl,
    disposeCamera,
    disposeEngine,
    disposeScene,
    stopRenderSceneLoop,
  ]);

  const openGLTF = useCallback(
    (file: File) => {
      file
        .arrayBuffer()
        .then((buffer) => {
          const assetBlob = new Blob([buffer], {
            type: "application/octet-stream",
          });
          const assetUrl = URL.createObjectURL(assetBlob);

          SceneLoader.ImportMeshAsync(
            "",
            "",
            assetUrl,
            sceneRef.current,
            undefined,
            ".glb"
          )
            .then((data) => {
              console.log("DEBUG: Loaded model data", data);
            })
            .catch((error) => {
              console.error("Error loading model data", error);
            });
        })
        .catch((error) => {
          console.error("Error loading model", error);
        });
    },
    [sceneRef]
  );

  return {
    renderSceneLoop,
    stopRenderSceneLoop,
    sceneRef,
    engineRef,
    cameraRef,
    openGLTF,
    startAll,
    disposeAll,
  };
};
