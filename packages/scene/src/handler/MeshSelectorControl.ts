import type { Nullable } from "@babylonjs/core/types";

import { HighlightLayer } from "@babylonjs/core/Layers/highlightLayer";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { type AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { type Scene } from "@babylonjs/core/scene";

export interface MeshSelectorControlOptions {
  outlineColor?: Color3;
}

export class MeshSelectorControl {
  private _highlightLayer: HighlightLayer | undefined;
  private _meshes: Nullable<AbstractMesh>[] = [];
  private _name: string;
  private _outlineColor: Color3 = Color3.White();
  private _scene: Scene | undefined;
  private _state: "idle" | "selected" = "idle";

  constructor(
    name: string,
    scene?: Scene,
    options?: MeshSelectorControlOptions
  ) {
    this._name = name;
    if (scene) this._scene = scene;
    this._highlightLayer = new HighlightLayer(this._name, this._scene, {
      isStroke: true,
      mainTextureRatio: 4,
    });
    this._highlightLayer.blurVerticalSize
      = this._highlightLayer.blurHorizontalSize = 1;
    this._highlightLayer.innerGlow = true;

    if (options) this._config(options);
  }

  private _config({ outlineColor }: MeshSelectorControlOptions) {
    if (outlineColor) {
      this._outlineColor = outlineColor;
    }
  }

  public addMesh(mesh: Nullable<AbstractMesh>): void {
    if (!mesh) return;
    this._meshes.push(mesh);
    this.refresh();
  }

  public clear(): void {
    this._highlightLayer?.removeAllMeshes();
    this._state = "idle";
  }

  public dispose(): void {
    this.clear();
    this._highlightLayer?.dispose();
  }

  public hasMesh(mesh: Nullable<AbstractMesh>): boolean {
    if (!mesh) return false;
    return this._meshes.includes(mesh);
  }

  public highlight(): void {
    for (const mesh of this._meshes) {
      if (!mesh) continue;
      if (!(mesh instanceof Mesh)) continue;

      this._highlightLayer?.addMesh(mesh, this._outlineColor);
    }
    this._state = "selected";
  }

  public refresh(): void {
    if (this._state === "selected") {
      this.clear();
      this.highlight();
    }
    else {
      this.clear();
    }
  }

  public removeAllMeshes(): void {
    this._meshes = [];
    this.refresh();
  }

  public removeMesh(mesh: Nullable<AbstractMesh>): void {
    if (!mesh) return;
    this._meshes = this._meshes.filter(m => m !== mesh);
    this.refresh();
  }

  public get length(): number {
    return this._meshes.length;
  }

  public get meshes(): Nullable<AbstractMesh>[] {
    return this._meshes ?? [];
  }

  public get selected(): boolean {
    return this._state === "selected";
  }

  public get state(): "idle" | "selected" {
    return this._state;
  }
}
