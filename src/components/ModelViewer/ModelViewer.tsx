import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "../Canvas";
import { PanelSheet, PanelSheetBody } from "../PanelSheet";
import { useModelObject } from "./useModelObject";
import { useModelViewer } from "./useModelViewer";
import { SceneObjectSection } from "./SceneObjectSection";
import { SceneNodesSection } from "./SceneNodesSection";
import { Mode } from "./mode";
import { ModelViewerHeader } from "./ModelViewerHeader";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { AbstractMesh } from "@babylonjs/core";
import { select } from "../../lib/sceneHandler";

export interface ModelProps {
  id?: string;
  title?: string;
  gltf?: Blob;
  capture?: string;
}

export interface ModelViewerProps extends Omit<ModelProps, "capture"> {
  active?: boolean;
}

export const ModelViewer = ({ active, ...props }: ModelViewerProps) => {
  const [loaded, setLoaded] = useState(false);
  const [mode, setMode] = useState<Mode>(Mode.View);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentNode, setCurrentNode] = useState<unknown>(null);
  const {
    sceneRef,
    capture,
    startAll,
    disposeAll,
    openGLTFBlob,
    renderSceneLoop,
    stopRenderSceneLoop,
  } = useModelViewer(canvasRef);

  const {
    loadState,
    currentID,
    currentTitle,
    currentGLTF,
    loadRecentModel,
    saveRecentModel,
  } = useModelObject({ ...props, capture });

  const loadModel = useCallback(() => {
    loadRecentModel()
      .then(() => {
        setLoaded(true);
      })
      .catch(console.error);
  }, [setLoaded, loadRecentModel]);

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
      loadModel();
    }
    if (loadState === "loaded") {
      saveRecentModel();
    }
  }, [loadState, loadModel, saveRecentModel]);

  useEffect(() => {
    if (loaded && currentGLTF) {
      openGLTFBlob(currentGLTF);
    }
  }, [loaded, currentGLTF, openGLTFBlob]);

  useEffect(() => {
    if (loadState === "loaded" && active) {
      renderSceneLoop();
      return () => {
        stopRenderSceneLoop();
      };
    }
  }, [active, loadState, renderSceneLoop, stopRenderSceneLoop]);

  useEffect(() => {
    if (loadState === "loaded" && active && mode === Mode.Edit) {
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
  }, [active, loadState, mode, sceneRef]);

  const handleSceneObjectSectionClose = useCallback(() => {
    setCurrentNode(null);
  }, [setCurrentNode]);

  return (
    <>
      <Canvas ref={canvasRef} />
      <PanelSheet orientation="block" position="end" resizable variant="accent">
        <ModelViewerHeader title={currentTitle} mode={mode} setMode={setMode} />
        <PanelSheetBody>
          <SceneNodesSection
            scene={sceneRef.current}
            onNodeSelect={setCurrentNode}
          />
          <SceneObjectSection
            node={currentNode}
            onClose={handleSceneObjectSectionClose}
          />
        </PanelSheetBody>
      </PanelSheet>
    </>
  );
};
