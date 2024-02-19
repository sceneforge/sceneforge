import { Engine, Scene } from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { Canvas } from "../Canvas/Canvas";

export interface ImportModelProps {
  file: File;
}

export const ImportModel = ({ file }: ImportModelProps) => {
  console.log("Loading model from file", file);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const engine = new Engine(canvasRef.current, true, { preserveDrawingBuffer: true, stencil: true });
    const scene = new Scene(engine);

    scene.createDefaultCamera(true, true, true);
    scene.createDefaultLight();
    engine.runRenderLoop(() => {
      scene.render();
    });

    return () => {
      engine.stopRenderLoop();
      scene.dispose();
      engine.dispose();
    }
  }, [file]);

  return (
    <Canvas ref={canvasRef}>

    </Canvas>
  );
}