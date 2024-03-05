import { type ISceneLoaderAsyncResult } from "@babylonjs/core/Loading/sceneLoader";
import { type Scene } from "@babylonjs/core/scene";
import { useCallback, useState, type RefObject } from "react";
import { importGLTF } from "../../lib/importGLTF";

export const useGLTFLoader = (sceneRef: RefObject<Scene>) => {
  const [capture, setCapture] = useState<string | undefined>(undefined);
  const [loadResult, setLoadResult] = useState<ISceneLoaderAsyncResult | undefined>(undefined);

  const openGLTFBlob = useCallback(
    (blob: Blob, attempt?: number) => {
      const withAttempt = typeof attempt !== "number" ? 3 : attempt;

      if (sceneRef.current) {
        importGLTF(sceneRef.current, blob, setCapture, setLoadResult);
      } else {
        setTimeout(() => {
          if (withAttempt > 0) {
            openGLTFBlob(blob, withAttempt - 1);
          } else {
            throw new Error("Failed to load model");
          }
        }, 1000);
      }
    },
    [sceneRef, setCapture, setLoadResult]
  );

  return {
    capture,
    loadResult,
    openGLTFBlob,
  }
}