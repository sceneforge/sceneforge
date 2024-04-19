import { useRef } from "react";
import { Canvas } from "../Canvas";
import { PanelSheet, PanelSheetBody } from "../PanelSheet";
import { useModelViewer } from "./hooks/useModelViewer";
import { SceneObjectSection } from "./SceneObjectSection";
import { SceneNodesSection } from "./SceneNodesSection";
import { ModelViewerHeader } from "./ModelViewerHeader";
import { Model } from "../../lib/isModel";

export type ModelProps = Model;

export type ModelViewerProps = Omit<Model, "capture"> & {
  active?: boolean;
  tabId?: string;
};

export const ModelViewer = ({ active, ...props }: ModelViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    mode,
    setMode,
    currentModel,
    currentNode,
    sceneRef,
    onNodeSelect,
    clearSelectedNode,
    onImported,
    meshSelectionPath,
    clearMeshSelectionPath,
  } = useModelViewer(canvasRef, active ?? false, props);

  return (
    <>
      <Canvas ref={canvasRef} />
      <PanelSheet orientation="block" position="end" resizable variant="accent">
        <ModelViewerHeader
          model={currentModel}
          mode={mode}
          setMode={setMode}
          onImported={onImported}
        />
        <PanelSheetBody>
          <SceneNodesSection
            scene={sceneRef.current}
            onNodeSelect={onNodeSelect}
            meshSelectionPath={meshSelectionPath}
            clearMeshSelectionPath={clearMeshSelectionPath}
          />
          <SceneObjectSection node={currentNode} onClose={clearSelectedNode} />
        </PanelSheetBody>
      </PanelSheet>
    </>
  );
};
