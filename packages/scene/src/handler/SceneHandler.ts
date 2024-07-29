import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Scene } from "@babylonjs/core/scene";
import type { Nullable } from "@babylonjs/core/types";

import { SceneHandlerSelect } from "./SceneHandlerSelect";

export class SceneHandler {
  private _rootMesh: Nullable<AbstractMesh>;
  private _scene: Scene;
  private _select: Nullable<SceneHandlerSelect>;

  constructor(scene: Scene, rootMesh: Nullable<AbstractMesh> = null) {
    this._scene = scene;
    this._select = null;
    this._rootMesh = rootMesh ?? this._getRootMesh();

    if (this._rootMesh) {
      this._select = new SceneHandlerSelect(this._rootMesh);
    }
  }

  private _getRootMesh(): Nullable<AbstractMesh> {
    const meshes = this.scene.meshes?.find(mesh => mesh.parent === null);
    return meshes ?? null;
  }

  public fromSceneRootMesh(): this {
    this.rootMesh = this._getRootMesh();
    return this;
  }

  public get rootMesh(): Nullable<AbstractMesh> {
    return this._rootMesh;
  }

  public set rootMesh(mesh: Nullable<AbstractMesh>) {
    this._rootMesh = mesh;

    if (this.select && this.select.rootMesh !== mesh) {
      this.select.dispose();
      this._select = null;
    }

    if (this._rootMesh) {
      this._select = new SceneHandlerSelect(this._rootMesh);
    }
  }

  public get scene(): Scene {
    return this._scene;
  }

  public get select(): Nullable<SceneHandlerSelect> {
    return this._select;
  }
};
