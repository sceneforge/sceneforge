import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { type Scene } from "@babylonjs/core/scene";
import { type Nullable } from "@babylonjs/core/types";
import { useCallback, useRef, type RefObject } from "react";

export const useHemisphericLight = (sceneRef: RefObject<Nullable<Scene>>) => {
  const lightRef = useRef<Nullable<HemisphericLight>>(null);

  const createLight = useCallback(() => {
    if (sceneRef.current && !lightRef.current) {
      lightRef.current = new HemisphericLight(
        "hemisphericLight",
        new Vector3(0, 1, 0),
        sceneRef.current
      );
    }
  }, [sceneRef, lightRef]);

  return {
    lightRef,
    createLight,
  };
};
