import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "../Canvas";
import { IconButton } from "../IconButton";
import { PanelSheet, PanelSheetHeader } from "../PanelSheet";
import { useModelObject } from "./useModelObject";
import { useModelViewer } from "./useModelViewer";

export interface ModelViewerProps {
  active?: boolean;
  id?: string;
  title?: string;
  glft?: Blob;
}

export const ModelViewer = ({ active, ...props }: ModelViewerProps) => {
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
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
    currentGLFT,
    loadRecentModel,
    saveRecentModel
  } = useModelObject(props);

  const loadModel = useCallback(() => {
    loadRecentModel().then(() => {
      setLoaded(true);
    }).catch(console.error);
  }, [setLoaded, loadRecentModel]);

  useEffect(() => {
    if (currentID) {
      startAll();
    }
    return () => {
      disposeAll();
    };
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
    if (loaded && currentGLFT) {
      openGLTFBlob(currentGLFT);
    }
  }, [loaded, currentGLFT, openGLTFBlob]);

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
        <PanelSheetHeader editable name="model-name" title={currentTitle ?? "Untitled Model"}>
          <IconButton icon="menu" />
        </PanelSheetHeader>
      </PanelSheet>
    </>
  );
};

