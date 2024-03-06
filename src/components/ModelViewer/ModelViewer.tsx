import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { Canvas } from "../Canvas";
import { IconButton } from "../IconButton";
import { MeshTree, useMeshTree } from "../MeshTree";
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

import { type AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import styles from "./ModelViewer.module.css";

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
  const meshTreeRef = useRef<HTMLDivElement>(null);
  const [currentMesh, setCurrentMesh] = useState<AbstractMesh | null>(null);
  const { closeAll } = useMeshTree(meshTreeRef);
  const {
    loadResult,
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
    }
    return () => {
      if (active) {
        stopRenderSceneLoop();
      }
    };
  }, [active, loadState, renderSceneLoop, stopRenderSceneLoop]);

  return (
    <>
      <Canvas ref={canvasRef} />
      <PanelSheet orientation="block" position="end" resizable size="md">
        <PanelSheetHeader
          editable
          name="model-name"
          title={currentTitle ?? "Untitled Model"}
          onInput={handleInput}
        >
          <PanelSheetHeaderGroup title="Objects" description="Object management">
            <IconButton icon="circle-plus" title="Add Hotspot" />
          </PanelSheetHeaderGroup>
          <PanelSheetHeaderGroup title="Select" description="Mesh selection methods">
            <IconButton toggle icon="arrow-pointer" title="Single Mesh" />
            <IconButton toggle icon="circle-chevron-up" title="Parent Meshes" />
          </PanelSheetHeaderGroup>
        </PanelSheetHeader>
        <PanelSheetBody>
          <PanelSheetSection className={styles.paneltree} title="Meshes" actions={[
            { icon: "square-minus", label: "Close All", onClick: closeAll },
          ]}>
            <MeshTree ref={meshTreeRef} meshes={loadResult?.meshes} onClick={({ data }) => {
              if (data && data.reference) {
                setCurrentMesh(data.reference);
              }
            }} />
          </PanelSheetSection>
          {currentMesh && (
            <PanelSheetSection title={currentMesh.name}>
              <p>More about the given selected mesh</p>
            </PanelSheetSection>
          )}
        </PanelSheetBody>
      </PanelSheet>
    </>
  );
};
