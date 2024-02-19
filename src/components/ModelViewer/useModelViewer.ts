import { SceneLoader } from "@babylonjs/core";
import "@babylonjs/loaders/glTF/2.0";
import { useCallback, useEffect, type RefObject } from "react";
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

  useEffect(() => {
    createEngine();
    createScene();
    createCamera();
    createLight();
    attachCamera();
    attachControl();
    renderSceneLoop();

    return () => {
      detachControl();
      disposeCamera();
      stopRenderSceneLoop();
      disposeScene();
      disposeEngine();
    };
  }, [
    attachCamera,
    attachControl,
    createCamera,
    createEngine,
    createLight,
    createScene,
    detachControl,
    disposeCamera,
    disposeEngine,
    disposeScene,
    renderSceneLoop,
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
    sceneRef,
    engineRef,
    cameraRef,
    openGLTF,
  };
};
