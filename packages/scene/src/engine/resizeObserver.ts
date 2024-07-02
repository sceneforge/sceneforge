import type { Engine } from "@babylonjs/core/Engines/engine";

export const resizeObserver = (canvas: HTMLCanvasElement, engine: Engine) => {
  const resizeObserver = new ResizeObserver(() => {
    for (const scene of engine.scenes) {
      scene.render();
    }
  });

  const start = () => {
    return resizeObserver.observe(canvas, { box: "border-box" });
  };

  const stop = () => {
    return resizeObserver.unobserve(canvas);
  };

  return {
    start,
    stop,
  };
};
