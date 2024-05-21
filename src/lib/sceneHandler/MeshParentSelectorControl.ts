import { type Node } from "@babylonjs/core/node";
import { type AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { MeshSelectorControl } from "./MeshSelectorControl";
import { type Scene } from "@babylonjs/core/scene";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { type Nullable } from "@babylonjs/core/types";

export class MeshParentSelectorControl {
  private _selectedLayer: MeshSelectorControl;
  private _mesh: AbstractMesh | undefined | null;
  private _name: string;
  private _depth: number = 1;
  private _direction: "up" | "down" = "up";

  constructor(name: string, scene?: Scene) {
    this._name = name;
    this._selectedLayer = new MeshSelectorControl(this._name, scene, {
      outlineColor: Color3.Blue(),
    });
  }

  public get mesh(): AbstractMesh | undefined | null {
    return this._mesh;
  }

  public set mesh(value: AbstractMesh | undefined | null) {
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

  public set depth(depth: number) {
    this.clear();
    this._depth = depth;
    this.highlight();
  }

  public get depth(): number {
    return this._depth;
  }

  public depthUp(): void {
    this.depth++;
  }

  public depthDown(): void {
    if (this._depth > 1) this.depth--;
  }

  public get direction(): "up" | "down" {
    return this._direction;
  }

  public set direction(value: "up" | "down") {
    this._direction = value;
  }

  private static getParent(
    mesh: AbstractMesh | Node | undefined | null,
    depth: number = 1,
    currentDepth: number = 0
  ): Nullable<Node> {
    if (!mesh) return null;
    const parent = mesh.parent;
    if (!parent) return mesh;
    if (depth === currentDepth) return parent;
    return MeshParentSelectorControl.getParent(parent, depth, currentDepth + 1);
  }

  private _parentChildren() {
    if (!this._mesh) return [];
    const parent = MeshParentSelectorControl.getParent(this._mesh, this._depth);
    if (!parent) return [];
    return parent.getChildMeshes();
  }

  public highlight(): void {
    for (const mesh of this._parentChildren()) {
      this._selectedLayer.addMesh(mesh);
    }
    this._selectedLayer.highlight();
  }

  public clear(): void {
    this._selectedLayer.removeAllMeshes();
    this._selectedLayer.clear();
  }

  public dispose(): void {
    this.clear();
    this._selectedLayer.dispose();
  }
}
