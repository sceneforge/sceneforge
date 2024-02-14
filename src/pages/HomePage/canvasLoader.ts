import {
  Color4,
  CreateSphere,
  FreeCamera,
  HemisphericLight,
  Vector3,
} from "@babylonjs/core";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { GridMaterial } from "@babylonjs/materials";
import type { RefObject } from "react";
import { observeComputedStylePropertyValue } from "../../lib/observeComputedStylePropertyValue";
import { parseCSSColorPropertyValue } from "../../lib/parseCSSColorPropertyValue";

export const canvasLoader = (canvas: RefObject<HTMLCanvasElement>) => {
  if (canvas.current) {
    const engine = new Engine(canvas.current);
    const scene = new Scene(engine);

    observeComputedStylePropertyValue(
      document.firstElementChild,
      "background-color",
      (value) => {
        const color = parseCSSColorPropertyValue(value);
        if (color) {
          scene.clearColor = new Color4(
            color.r / 255,
            color.g / 255,
            color.b / 255,
            color.a
          );
        }
      }
    );

    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas.current, true);

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const material = new GridMaterial("grid", scene);
    const sphere = CreateSphere(
      "sphere1",
      { segments: 16, diameter: 2 },
      scene
    );
    sphere.position.y = 2;
    sphere.material = material;

    engine.runRenderLoop(() => {
      scene.render();
    });
  }
};
