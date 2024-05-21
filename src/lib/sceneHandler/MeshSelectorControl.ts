import { HighlightLayer } from "@babylonjs/core/Layers/highlightLayer";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { type AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { type Scene } from "@babylonjs/core/scene";

export interface MeshSelectorControlOptions {
  outlineColor?: Color3;
}

export class MeshSelectorControl {
  private _meshes: (AbstractMesh | undefined | null)[] = [];
  private _scene: Scene | undefined;
  private _name: string;
  private _highlightLayer: HighlightLayer | undefined;
  private _outlineColor: Color3 = Color3.White();
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

  public get state(): "idle" | "selected" {
    return this._state;
  }

  public get length(): number {
    return this._meshes.length;
  }

  public addMesh(mesh: AbstractMesh | undefined | null): void {
    if (!mesh) return;
    this._meshes.push(mesh);
    this.refresh();
  }

  public hasMesh(mesh: AbstractMesh | undefined | null): boolean {
    if (!mesh) return false;
    return this._meshes.includes(mesh);
  }

  public removeMesh(mesh: AbstractMesh | undefined | null): void {
    if (!mesh) return;
    this._meshes = this._meshes.filter(m => m !== mesh);
    this.refresh();
  }

  public removeAllMeshes(): void {
    this._meshes = [];
    this.refresh();
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

  public highlight(): void {
    for (const mesh of this._meshes) {
      if (!mesh) continue;
      if (!(mesh instanceof Mesh)) continue;

      this._highlightLayer?.addMesh(mesh, this._outlineColor);
    }
    this._state = "selected";
  }

  public clear(): void {
    this._highlightLayer?.removeAllMeshes();
    this._state = "idle";
  }

  public dispose(): void {
    this.clear();
    this._highlightLayer?.dispose();
  }
}
