import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { Canvas } from "../Canvas";
import { IconButton } from "../IconButton";
import {
  PanelSheet,
  PanelSheetBody,
  PanelSheetHeader,
  PanelSheetHeaderGroup,
  PanelSheetSection
} from "../PanelSheet";
import { useTabPanel } from "../TabPanel";
import { useModelObject } from "./useModelObject";
import { useModelViewer } from "./useModelViewer";

import { SceneNodeTree } from "../SceneNodeTree";
import { SceneObjectSection } from "./SceneObjectSection";

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
  const { updateTabTitle } = useTabPanel();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentNode, setCurrentNode] = useState<unknown>(null);
  const {
    sceneRef,
    capture,
    startAll,
    disposeAll,
    openGLTFBlob,
    renderSceneLoop,
    stopRenderSceneLoop
  } = useModelViewer(canvasRef);

  const {
    loadState,
    currentID,
    currentTitle,
    currentGLTF,
    loadRecentModel,
    saveRecentModel,
    updateTitle
  } = useModelObject({ ...props, capture });

  const loadModel = useCallback(() => {
    loadRecentModel().then(() => {
      setLoaded(true);
    }).catch(console.error);
  }, [setLoaded, loadRecentModel]);

  const handleInput = useCallback((
    event: SyntheticEvent<HTMLInputElement, InputEvent>
  ) => {
    if (event.target instanceof HTMLInputElement) {
      updateTitle(event.target.value);
      if (currentID) {
        updateTabTitle(currentID, event.target.value);
      }
    }
  }, [currentID, updateTabTitle, updateTitle]);

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
  }, [
    loadState,
    loadModel,
    saveRecentModel,
  ]);

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

  const handleSceneObjectSectionClose = useCallback(() => {
    setCurrentNode(null)
  }, [setCurrentNode]);

  return (
    <>
      <Canvas ref={canvasRef} />
      <PanelSheet
        orientation="block"
        position="end"
        resizable
        size="md"
        variant="accent"
      >
        <PanelSheetHeader
          editable
          name="model-name"
          title={currentTitle ?? "Untitled Model"}
          onInput={handleInput}
        >
          <PanelSheetHeaderGroup
            title="Objects"
            description="Scene Objects management"
          >
            <IconButton icon="addCircle" title="New Object" />
          </PanelSheetHeaderGroup>
          <PanelSheetHeaderGroup
            title="Hotspots"
            description="Hotspots management"
          >
            <IconButton icon="fileMap" title="Add" />
          </PanelSheetHeaderGroup>
          <PanelSheetHeaderGroup
            title="Select"
            description="Mesh selection methods"
          >
            <IconButton toggle icon="arrowSelectTool" title="Single Mesh" />
            <IconButton toggle icon="moveSelectionUp" title="Parent Meshes" />
          </PanelSheetHeaderGroup>
        </PanelSheetHeader>
        <PanelSheetBody>
          <PanelSheetSection title="Scene Nodes">
            <SceneNodeTree
              scene={sceneRef.current}
              onNodeSelect={setCurrentNode}
            />
          </PanelSheetSection>
          <SceneObjectSection
            node={currentNode}
            onClose={handleSceneObjectSectionClose}
          />
        </PanelSheetBody>
      </PanelSheet>
    </>
  );
};
