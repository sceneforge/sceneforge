import { type ISceneLoaderAsyncResult } from "@babylonjs/core/Loading/sceneLoader";
import { type Scene } from "@babylonjs/core/scene";
import { type RefObject, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { importGLTF } from "../../../lib/importGLTF";

export const useGLTFLoader = (sceneRef: RefObject<Scene | null>) => {
  const { t } = useTranslation("ModelViewer");
  const [capture, setCapture] = useState<string | undefined>();
  const [loadResult, setLoadResult] = useState<
    ISceneLoaderAsyncResult | undefined
  >();

  const openGLTFBlob = useCallback(
    (blob: Blob, attempt?: number) => {
      const withAttempt = typeof attempt === "number" ? attempt : 3;

      if (sceneRef.current) {
        importGLTF(sceneRef.current, blob, setCapture, setLoadResult);
      }
      else {
        setTimeout(() => {
          if (withAttempt > 0) {
            openGLTFBlob(blob, withAttempt - 1);
          }
          else {
            throw new Error(t("errorMessages.openGLTFBlob"));
          }
        }, 1000);
      }
    },
    [t, sceneRef, setCapture, setLoadResult]
  );

  return {
    capture,
    loadResult,
    openGLTFBlob,
  };
};
