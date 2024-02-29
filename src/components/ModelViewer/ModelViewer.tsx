import { useEffect, useRef } from "react";
import { Canvas } from "../Canvas";
import { IconButton } from "../IconButton";
import { PanelSheet, PanelSheetHeader } from "../PanelSheet";
import { useModelObject } from "./useModelObject";
import { useModelViewer } from "./useModelViewer";

export interface ModelViewerProps {
  active?: boolean;
  id?: string;
  title?: string;
  glft?: File;
}

export const ModelViewer = ({ active, ...props }: ModelViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    startAll,
    disposeAll,
    openGLTF,
    renderSceneLoop,
    stopRenderSceneLoop
  } = useModelViewer(canvasRef);

  const {
    loadState,
    currentID,
    currentGLFT,
    currentTitle,
    loadRecentModel,
    saveRecentModel
  } = useModelObject(props);

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
      loadRecentModel().then(() => {
        if (currentGLFT) openGLTF(currentGLFT);
      }).catch(console.error);
    }
    if (loadState === "loaded") {
      saveRecentModel();
    }
  }, [saveRecentModel, loadRecentModel, loadState, currentGLFT, openGLTF, startAll, disposeAll]);

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

