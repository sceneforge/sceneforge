import { useRef } from "react";

import { Model } from "../../lib/isModel";
import { Canvas } from "../Canvas";
import { PanelSheet, PanelSheetBody } from "../PanelSheet";
import { ModelViewerHeader } from "./ModelViewerHeader";
import { SceneNodesSection } from "./SceneNodesSection";
import { SceneObjectSection } from "./SceneObjectSection";
import { useModelViewer } from "./hooks/useModelViewer";

export type ModelProps = Model;

export type ModelViewerProps = {
  active?: boolean;
  tabId?: string;
} & Omit<Model, "capture">;

export const ModelViewer = ({ active, ...props }: ModelViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {
    clearMeshSelectionPath,
    clearSelectedNode,
    currentModel,
    currentNode,
    meshSelectionPath,
    mode,
    onImported,
    onNodeSelect,
    sceneRef,
    setMode,
  } = useModelViewer(canvasRef, active ?? false, props);

  return (
    <>
      <Canvas ref={canvasRef} />
      <PanelSheet orientation="block" position="end" resizable variant="accent">
        <ModelViewerHeader
          mode={mode}
          model={currentModel}
          onImported={onImported}
          setMode={setMode}
        />
        <PanelSheetBody>
          <SceneNodesSection
            clearMeshSelectionPath={clearMeshSelectionPath}
            meshSelectionPath={meshSelectionPath}
            onNodeSelect={onNodeSelect}
            scene={sceneRef.current}
          />
          <SceneObjectSection node={currentNode} onClose={clearSelectedNode} />
        </PanelSheetBody>
      </PanelSheet>
    </>
  );
};
