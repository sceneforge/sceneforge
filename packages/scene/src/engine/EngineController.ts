import type { Camera } from "@babylonjs/core/Cameras/camera";
import type { Light } from "@babylonjs/core/Lights/light";

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";

import { buildCommonNodes } from "./buildCommonNodes";
import { EngineState } from "./EngineState";

export class EngineController {
  private _camera?: Camera;
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _light?: Light;
  private _resizeObserver: ResizeObserver;
  private _scene: Scene;
  private _state: EngineState = EngineState.Stopped;

  constructor(canvas: HTMLCanvasElement, commonNodes?: boolean) {
    this._canvas = canvas;

    this._engine = new Engine(canvas, true, {
      stencil: true,
    });

    this._scene = new Scene(this._engine);

    if (commonNodes) {
      const { camera, light } = buildCommonNodes(this._scene);
      this._camera = camera;
      this._light = light;

      this._camera.attachControl(this.canvas, true);
    }

    this._resizeObserver = new ResizeObserver(() => {
      this._engine.resize();
    });
  }

  public pause(): void {
    if (this.canvas.parentElement) {
      this._resizeObserver.unobserve(this.canvas.parentElement);
      this._engine.stopRenderLoop();
      this._state = EngineState.Paused;
    }
  }

  public start(): void {
    if (this.canvas.parentElement) {
      this._resizeObserver.observe(this.canvas.parentElement, { box: "border-box" });
      this._engine.runRenderLoop(() => {
        this._scene.render();
      });
      this._state = EngineState.Running;
    }
  }

  public stop(): void {
    this.pause();
    this._scene.dispose();
    this._engine.dispose();
    this._state = EngineState.Stopped;
  }

  public get camera(): Camera | undefined {
    return this._camera;
  }

  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  public get engine(): Engine {
    return this._engine;
  }

  public get light(): Light | undefined {
    return this._light;
  }

  public get scene(): Scene {
    return this._scene;
  }

  public get state(): EngineState {
    return this._state;
  }
};
