import "@babylonjs/loaders/glTF/2.0";
import { type RefObject, useCallback, useEffect, useState } from "react";
import { useArcRotateCamera } from "./useArcRotateCamera";
import { useEngine } from "./useEngine";
import { useGLTFLoader } from "./useGLTFLoader";
import { useHemisphericLight } from "./useHemiphericLight";
import { Model } from "../../../lib/isModel";
import { Mode } from "./../mode";
import { useModelContext } from "../../ModelContext";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { select } from "../../../lib/sceneHandler";
import { type ActionEvent } from "@babylonjs/core/Actions/actionEvent";

export const useModelViewer = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  active: boolean,
  props: Partial<Model>
) => {
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [initiate, setInitiate] = useState(false);
  const [currentNode, setCurrentNode] = useState<unknown>(null);
  const [mode, setMode] = useState<Mode>(Mode.View);
  const [meshSelectionPath, setMeshSelectionPath] = useState<readonly string[]>(
    []
  );
  const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timeout | null>(null);

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

  const { loadState, loadModels, currentID, currentModel, saveModel }
    = useModelContext({
      ...props,
      capture,
    });

  const clearMeshSelectionPath = useCallback(() => {
    setMeshSelectionPath([]);
  }, []);

  const onNodeSelect = useCallback(
    (node: unknown) => {
      clearMeshSelectionPath();
      setCurrentNode(node);
    },
    [clearMeshSelectionPath, setCurrentNode]
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
      loadModels().catch((error: unknown) => {
        throw new Error("Failed to load models", { cause: error });
      });
    }
    else if (loadState === "loaded") {
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
    if (ready && timeoutRef === null && !initiate) {
      setTimeoutRef(
        setTimeout(() => {
          setTimeoutRef(null);
          setInitiate(true);
          renderSceneLoop();
        }, 1000)
      );
    }

    return () => {
      if (timeoutRef !== null) {
        clearTimeout(timeoutRef);
        setTimeoutRef(null);
      }
      else if (ready) {
        setInitiate(false);
        setReady(false);
        stopRenderSceneLoop();
      }
    };
  }, [timeoutRef, initiate, ready, renderSceneLoop, stopRenderSceneLoop]);

  const objectPath = useCallback((node: unknown): string[] => {
    if (
      node
      && typeof node === "object"
      && node !== null
      && !Array.isArray(node)
    ) {
      const id
        = "id" in node && node.id && typeof node.id === "string"
          ? node.id
          : "-==[!UNKNOWN_ID]==-";
      if ("parent" in node && node.parent) {
        return [...objectPath(node.parent), id];
      }
      return [id];
    }
    return [];
  }, []);

  const onMeshSelect = useCallback(
    (mesh: AbstractMesh) => {
      clearMeshSelectionPath();
      setMeshSelectionPath(objectPath(mesh));
      setCurrentNode(mesh);
    },
    [clearMeshSelectionPath, objectPath]
  );

  const onHotspotSelect = useCallback(
    (
      mesh: AbstractMesh,
      event: ActionEvent,
      { hotspot }: { hotspot: AbstractMesh }
    ) => {
      console.log("DEBUG: onHotspotSelect", mesh, event, hotspot);
    },
    []
  );

  useEffect(() => {
    if (ready && mode === Mode.Edit) {
      const mesh = sceneRef.current?.rootNodes.filter(
        node => node instanceof Mesh || node instanceof AbstractMesh
      );
      if (
        mesh
        && mesh.length === 1
        && (mesh[0] instanceof Mesh || mesh[0] instanceof AbstractMesh)
      ) {
        return select(mesh[0], {
          onMeshSelect,
          onHotspotSelect,
        });
      }
    }
  }, [ready, mode, sceneRef, onMeshSelect, onHotspotSelect]);

  const onImported = useCallback(
    async (model: Partial<Model>): Promise<Model> => {
      if (model.id && model.id !== currentID) {
        throw new Error("Model ID is not matched");
      }
      const id = model.id ?? currentID;

      if (!id) {
        throw new Error("Model ID is not defined");
      }

      return await saveModel({
        ...model,
        id,
      });
    },
    [currentID, saveModel]
  );

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
    onImported,
    meshSelectionPath,
    clearMeshSelectionPath,
  };
};
