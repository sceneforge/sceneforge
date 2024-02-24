import { useRef } from "react";
import { Canvas } from "../Canvas";
import { PanelSheet } from "../PanelSheet";
import { useModelViewer } from "./useModelViewer";

export interface ModelViewerProps {
  glft?: File;
  sceneforge?: File;
}

export const ModelViewer = ({ glft }: ModelViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openGLTF } = useModelViewer(canvasRef);

  if (glft) openGLTF(glft);

  return (
    <>
      <Canvas ref={canvasRef} />
      <PanelSheet orientation="block" position="end" resizable size="md">
        <h1>Hello Model!</h1>
      </PanelSheet>
    </>
  );
};
