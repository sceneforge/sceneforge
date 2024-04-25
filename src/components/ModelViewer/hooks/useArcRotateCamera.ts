import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { type Camera } from "@babylonjs/core/Cameras/camera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { type Scene } from "@babylonjs/core/scene";
import { type Nullable } from "@babylonjs/core/types";
import { useCallback, useRef, type RefObject } from "react";

export const useArcRotateCamera = (sceneRef: RefObject<Nullable<Scene>>) => {
  const cameraRef = useRef<Nullable<Camera>>(null);

  const createCamera = useCallback(() => {
    if (sceneRef.current && !cameraRef.current) {
      cameraRef.current = new ArcRotateCamera(
        "arcRotateCamera",
        0,
        0,
        10,
        Vector3.Zero(),
        sceneRef.current,
      );
    }
  }, [sceneRef, cameraRef]);

  const attachCamera = useCallback(() => {
    if (sceneRef.current && cameraRef.current) {
      sceneRef.current.activeCamera = cameraRef.current;
    }
  }, [sceneRef, cameraRef]);

  const attachControl = useCallback(() => {
    if (sceneRef.current && cameraRef.current) {
      cameraRef.current.attachControl(
        sceneRef.current.getEngine().getRenderingCanvas(),
      );
    }
  }, [sceneRef, cameraRef]);

  const detachControl = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.detachControl();
    }
  }, [cameraRef]);

  const disposeCamera = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.dispose();
    }
  }, [cameraRef]);

  return {
    cameraRef,
    createCamera,
    attachCamera,
    attachControl,
    detachControl,
    disposeCamera,
  };
};
