import { CreateScreenshot } from "@babylonjs/core/Misc/screenshotTools";
import { type Scene } from "@babylonjs/core/scene";

export const sceneSnapshot = (scene: Scene, capture?: (data: string) => void) => {
  if (capture) {
    scene.onReadyObservable.addOnce(() => {
      if (scene.activeCamera) {
        CreateScreenshot(
          scene.getEngine(),
          scene.activeCamera,
          1024,
          capture
        );
      }
    });
  }
};
