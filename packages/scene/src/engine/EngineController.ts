import type { Camera } from "@babylonjs/core/Cameras/camera";
import type { Light } from "@babylonjs/core/Lights/light";

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";

import { EngineState } from "./EngineState";
import { buildCommonNodes } from "./buildCommonNodes";

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
      preserveDrawingBuffer: true,
      stencil: true,
    });

    this._scene = new Scene(this._engine, {
      useGeometryUniqueIdsMap: true,
      useMaterialMeshMap: true,
    });

    if (commonNodes) {
      const { camera, light } = buildCommonNodes(this._scene);
      this._camera = camera;
      this._light = light;
    }

    this._resizeObserver = new ResizeObserver(() => {
      this._scene.render();
    });
  }

  public pause(): void {
    this._resizeObserver.unobserve(this._canvas);
    this._engine.stopRenderLoop();
    this._state = EngineState.Paused;
  }

  public start(): void {
    this._resizeObserver.observe(this._canvas, { box: "border-box" });
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });
    this._state = EngineState.Running;
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