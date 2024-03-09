import "@babylonjs/loaders/glTF/2.0";
import { useCallback, type RefObject } from "react";
import { useArcRotateCamera } from "./useArcRotateCamera";
import { useEngine } from "./useEngine";
import { useGLTFLoader } from "./useGLTFLoader";
import { useHemisphericLight } from "./useHemiphericLight";

export const useModelViewer = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const {
    engineRef,
    sceneRef,
    resizeObserver,
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
  const { capture, loadResult, openGLTFBlob } = useGLTFLoader(sceneRef);

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
    resizeObserver.disconnect();
    stopRenderSceneLoop();
    disposeScene();
    disposeEngine();
  }, [
    resizeObserver,
    detachControl,
    disposeCamera,
    disposeEngine,
    disposeScene,
    stopRenderSceneLoop,
  ]);

  return {
    loadResult,
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
