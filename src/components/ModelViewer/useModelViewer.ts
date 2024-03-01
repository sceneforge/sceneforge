import { CreateScreenshot, SceneLoader, type Scene } from "@babylonjs/core";
import "@babylonjs/loaders/glTF/2.0";
import { useCallback, useState, type RefObject } from "react";
import { useArcRotateCamera } from "./useArcRotateCamera";
import { useEngine } from "./useEngine";
import { useHemisphericLight } from "./useHemiphericLight";

const importGLTF = (
  scene: Scene,
  blob: Blob,
  capture?: (data: string) => void
) => {
  SceneLoader.ImportMeshAsync(
    "",
    "",
    URL.createObjectURL(blob),
    scene,
    undefined,
    ".glb"
  )
    .then(() => {
      scene.onReadyObservable.addOnce(() => {
        if (scene.activeCamera) {
          CreateScreenshot(
            scene.getEngine(),
            scene.activeCamera,
            1024,
            capture
          );
        }
      });
    })
    .catch(console.error);
};

export const useModelViewer = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [capture, setCapture] = useState<string | undefined>(undefined);
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

  const openGLTFBlob = useCallback(
    (blob: Blob, attempt?: number) => {
      const withAttempt = typeof attempt !== "number" ? 3 : attempt;

      if (sceneRef.current) {
        importGLTF(sceneRef.current, blob, setCapture);
      } else {
        setTimeout(() => {
          if (withAttempt > 0) {
            openGLTFBlob(blob, withAttempt - 1);
          } else {
            throw new Error("Failed to load model");
          }
        }, 1000);
      }
    },
    [sceneRef]
  );

  return {
    capture,
    renderSceneLoop,
    stopRenderSceneLoop,
    sceneRef,
    engineRef,
    cameraRef,
    openGLTFBlob,
    startAll,
    disposeAll,
  };
};
