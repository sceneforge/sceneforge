import "@babylonjs/loaders/glTF/2.0";
import { useCallback, useEffect, useState, type RefObject } from "react";
import { useArcRotateCamera } from "./useArcRotateCamera";
import { useEngine } from "./useEngine";
import { useGLTFLoader } from "./useGLTFLoader";
import { useHemisphericLight } from "./useHemiphericLight";
import { Model } from "../../lib/isModel";
import { Mode } from "./mode";
import { useModelContext } from "../ModelContext";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { select } from "../../lib/sceneHandler";

export const useModelViewer = (
  canvasRef: RefObject<HTMLCanvasElement>,
  active: boolean,
  props: Partial<Model>
) => {
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [currentNode, setCurrentNode] = useState<unknown>(null);
  const [mode, setMode] = useState<Mode>(Mode.View);

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

  const { loadState, loadModels, currentID, currentModel } = useModelContext({
    ...props,
    capture,
  });

  const onNodeSelect = useCallback(
    (node: unknown) => {
      setCurrentNode(node);
    },
    [setCurrentNode]
  );

  const clearSelectedNode = useCallback(() => {
    setCurrentNode(null);
  }, [setCurrentNode]);

  useEffect(() => {
    if (currentID) {
      startAll();

      return () => {
        disposeAll();
      };
    }
  }, [currentID, startAll, disposeAll]);

  useEffect(() => {
    if (loadState === "none") {
      loadModels();
    } else if (loadState === "loaded") {
      setReady(active);
    }
  }, [loadState, active, loadModels, setReady]);

  useEffect(() => {
    if (!loaded && ready && currentModel?.gltf) {
      openGLTFBlob(currentModel.gltf);
      setLoaded(true);
    }
  }, [loaded, ready, currentModel, openGLTFBlob]);

  useEffect(() => {
    if (ready) {
      renderSceneLoop();
      return () => {
        stopRenderSceneLoop();
      };
    }
  }, [ready, renderSceneLoop, stopRenderSceneLoop]);

  useEffect(() => {
    if (ready && mode === Mode.Edit) {
      const mesh = sceneRef.current?.rootNodes.filter(
        (node) => node instanceof Mesh || node instanceof AbstractMesh
      );
      if (
        mesh &&
        mesh.length === 1 &&
        (mesh[0] instanceof Mesh || mesh[0] instanceof AbstractMesh)
      ) {
        return select(mesh[0]);
      }
    }
  }, [ready, mode, sceneRef]);

  return {
    loadResult,
    mode,
    currentNode,
    onNodeSelect,
    setMode,
    currentModel,
    loaded,
    loadState,
    capture,
    renderSceneLoop,
    stopRenderSceneLoop,
    sceneRef,
    engineRef,
    cameraRef,
    openGLTFBlob,
    startAll,
    disposeAll,
    clearSelectedNode,
  };
};
