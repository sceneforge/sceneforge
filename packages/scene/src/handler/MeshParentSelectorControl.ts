import { Color3 } from "@babylonjs/core/Maths/math.color";
import { type AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { type Node } from "@babylonjs/core/node";
import { type Scene } from "@babylonjs/core/scene";
import { type Nullable } from "@babylonjs/core/types";

import { MeshSelectorControl } from "./MeshSelectorControl";

export class MeshParentSelectorControl {
  private _depth: number = 1;
  private _direction: "down" | "up" = "up";
  private _mesh: Nullable<AbstractMesh>;
  private _name: string;
  private _selectedLayer: MeshSelectorControl;

  constructor(name: string, scene?: Scene) {
    this._name = name;
    this._mesh = null;
    this._selectedLayer = new MeshSelectorControl(this._name, scene, {
      outlineColor: Color3.Blue(),
    });
  }

  private _parentChildren() {
    if (!this._mesh) return [];
    const parent = MeshParentSelectorControl.getParent(this._mesh, this._depth);
    if (!parent) return [];
    return parent.getChildMeshes();
  }

  private static getParent(
    mesh: Nullable<AbstractMesh> | Nullable<Node>,
    depth: number = 1,
    currentDepth: number = 0
  ): Nullable<Node> {
    if (!mesh) return null;
    const parent = mesh.parent;
    if (!parent) return mesh;
    if (depth === currentDepth) return parent;
    return MeshParentSelectorControl.getParent(parent, depth, currentDepth + 1);
  }

  public clear(): void {
    this._selectedLayer.removeAllMeshes();
    this._selectedLayer.clear();
  }

  public depthDown(): void {
    if (this._depth > 1) this.depth--;
  }

  public depthUp(): void {
    this.depth++;
  }

  public dispose(): void {
    this.clear();
    this._selectedLayer.dispose();
  }

  public highlight(): void {
    for (const mesh of this._parentChildren()) {
      this._selectedLayer.addMesh(mesh);
    }
    this._selectedLayer.highlight();
  }

  public set depth(depth: number) {
    this.clear();
    this._depth = depth;
    this.highlight();
  }

  public get depth(): number {
    return this._depth;
  }

  public get direction(): "down" | "up" {
    return this._direction;
  }

  public set direction(value: "down" | "up") {
    this._direction = value;
  }

  public get mesh(): Nullable<AbstractMesh> {
    return this._mesh ?? null;
  }

  public set mesh(value: Nullable<AbstractMesh>) {
    this.clear();
    if (this._mesh === value) {
      if (this._direction === "up") this.depthUp();
      else if (this._direction === "down") this.depthDown();
    }
    else {
      this._depth = 1;
      this._mesh = value;
    }
    if (this._selectedLayer.state === "idle") this.highlight();
  }

  public get selected(): boolean {
    return this._selectedLayer.selected;
  }
}
