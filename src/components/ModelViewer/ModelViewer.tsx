import { useRef } from "react";
import { Canvas } from "../Canvas";
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
    <Canvas ref={canvasRef} />
  );
};
