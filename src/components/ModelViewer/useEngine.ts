import { Engine } from "@babylonjs/core/Engines/engine";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Scene } from "@babylonjs/core/scene";
import { type Nullable } from "@babylonjs/core/types";
import { useCallback, useRef, type RefObject } from "react";
import { observeComputedStylePropertyValue } from "../../lib/observeComputedStylePropertyValue";
import {
  parseCSSColorPropertyValue,
  type ColorRGBA,
} from "../../lib/parseCSSColorPropertyValue";

let backgroundColor: ColorRGBA = { r: 0, g: 0, b: 0, a: 0 };

observeComputedStylePropertyValue(
  document.firstElementChild,
  "background-color",
  (color) => {
    const newColor = parseCSSColorPropertyValue(color);
    if (newColor) {
      backgroundColor = newColor;
    }
  }
);

export const useEngine = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const engineRef = useRef<Nullable<Engine>>(null);
  const sceneRef = useRef<Nullable<Scene>>(null);

  const createEngine = useCallback(() => {
    if (canvasRef.current && !engineRef.current) {
      engineRef.current = new Engine(canvasRef.current, true, {
        stencil: true,
      });
    }
  }, [canvasRef, engineRef]);

  const createScene = useCallback(() => {
    if (engineRef.current && !sceneRef.current) {
      sceneRef.current = new Scene(engineRef.current);
      sceneRef.current.clearColor = new Color4(
        backgroundColor.r,
        backgroundColor.g,
        backgroundColor.b,
        backgroundColor.a
      );
    }
  }, [engineRef, sceneRef]);

  const disposeEngine = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.dispose();
    }
  }, [engineRef]);

  const disposeScene = useCallback(() => {
    if (sceneRef.current) {
      sceneRef.current.dispose();
    }
  }, [sceneRef]);

  const renderSceneLoop = useCallback(() => {
    if (engineRef.current && sceneRef.current) {
      engineRef.current.runRenderLoop(() => {
        sceneRef.current?.render();
      });
    }
  }, [engineRef, sceneRef]);

  const stopRenderSceneLoop = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.stopRenderLoop();
    }
  }, [engineRef]);

  return {
    engineRef,
    sceneRef,
    createEngine,
    createScene,
    disposeEngine,
    disposeScene,
    renderSceneLoop,
    stopRenderSceneLoop,
  };
};
