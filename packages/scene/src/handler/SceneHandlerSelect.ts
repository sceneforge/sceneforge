import type { ActionEvent } from "@babylonjs/core/Actions/actionEvent";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Scene } from "@babylonjs/core/scene";
import type { Nullable } from "@babylonjs/core/types";

import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { ExecuteCodeAction } from "@babylonjs/core/Actions/directActions";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

import { addHotspot } from "./addHotspot";
import { KeyboardControl } from "./KeyboardControl";
import { MeshParentSelectorControl } from "./MeshParentSelectorControl";
import { MeshSelectorControl } from "./MeshSelectorControl";
import { SceneHandlerEventsHandler } from "./SceneHandlerEventsHandler";

export type AdditionalData = {
  faceId?: number;
  hit?: boolean;
  pickedPoint?: Vector3;
};

export type SceneHandlerSelectConfig = {
  hotspotHoverName?: string;
  hoverLayerName?: string;
  parentSelectedLayerName?: string;
  selectedLayerName?: string;
};

export class SceneHandlerSelect extends SceneHandlerEventsHandler {
  private _hotspotHover?: Mesh;
  private _hotspotHoverName?: string;
  private _hoverLayer?: MeshSelectorControl;
  private _hoverLayerName?: string;
  private _keyboardControl?: KeyboardControl;
  private _parentSelectedLayer?: MeshParentSelectorControl;
  private _parentSelectedLayerName?: string;
  private _rootMesh: Nullable<AbstractMesh>;
  private _selectedLayer?: MeshSelectorControl;
  private _selectedLayerName?: string;

  constructor(
    rootMesh: Nullable<AbstractMesh> = null,
    config: SceneHandlerSelectConfig = {}
  ) {
    super();
    this._rootMesh = rootMesh;
    this._config(config);
  }

  private static _getActionEventAdditionalData(
    event: ActionEvent
  ): AdditionalData {
    if (
      "additionalData" in event
      && typeof event.additionalData === "object"
      && event.additionalData !== null
    ) {
      return event.additionalData as AdditionalData;
    }
    return {};
  }

  private _config({
    hotspotHoverName,
    hoverLayerName,
    parentSelectedLayerName,
    selectedLayerName,
  }: SceneHandlerSelectConfig) {
    if (hotspotHoverName) {
      this._hotspotHoverName = hotspotHoverName;
    }

    if (hoverLayerName) {
      this._hoverLayerName = hoverLayerName;
    }

    if (parentSelectedLayerName) {
      this._parentSelectedLayerName = parentSelectedLayerName;
    }

    if (selectedLayerName) {
      this._selectedLayerName = selectedLayerName;
    }
  }

  private _createHotspotHover(): void {
    if (!this.scene) return;
    this._hotspotHover = addHotspot(this.scene, {
      id: this.hotspotHoverName,
      name: this.hotspotHoverName,
    });
  }

  private _disposeHotspotHover(): void {
    this._hotspotHover?.dispose();
    this._hotspotHover = undefined;
  }

  private _disposeHoverLayer(): void {
    this._hoverLayer?.dispose();
    this._hoverLayer = undefined;
  }

  private _disposekeyboardControl(): void {
    this._keyboardControl?.dispose();
    this._keyboardControl = undefined;
  }

  private _disposeParentSelectedLayer(): void {
    this._parentSelectedLayer?.dispose();
    this._parentSelectedLayer = undefined;
  }

  private _disposeSelectedLayer(): void {
    this._selectedLayer?.dispose();
    this._selectedLayer = undefined;
  }

  private _highlight(): void {
    if (this._hoverLayer && this._selectedLayer) {
      this._selectedLayer.highlight();
      this._hoverLayer.highlight();
    }
  }

  private _init(): void {
    if (this.scene) {
      this._keyboardControl = new KeyboardControl(this.scene);
      this._hoverLayer = new MeshSelectorControl(
        this.hoverLayerName,
        this.scene,
        {
          outlineColor: Color3.White(),
        }
      );

      this._selectedLayer = new MeshSelectorControl(
        this.selectedLayerName,
        this.scene,
        {
          outlineColor: Color3.Green(),
        }
      );

      this._parentSelectedLayer = new MeshParentSelectorControl(
        this.parentSelectedLayerName,
        this.scene
      );
    }

    this._highlight();
    this._createHotspotHover();
    this._keyboardControl?.onEscapePressed((event) => {
      if (this.selectedLayer?.selected) {
        this.dispatchEvent({
          keyboardInfo: event,
          target: this.selectedLayer.meshes,
          type: "selectDismiss",
        });
      }
      else if (this.parentSelectedLayer?.selected) {
        this.dispatchEvent({
          keyboardInfo: event,
          target: this.parentSelectedLayer.mesh,
          type: "selectDismiss",
        });
      }

      this._hoverLayer?.removeAllMeshes();
      this._selectedLayer?.removeAllMeshes();
      this._parentSelectedLayer?.clear();
      if (this._hotspotHover) {
        this._hotspotHover.isVisible = false;
      }
    });

    this._rootMeshChildrenIteration();
  }

  private _registerOnLeftPickTrigger(event: ActionEvent): void {
    if (!this.keyboardControl) return;
    if (!this.selectedLayer) return;
    if (!this.parentSelectedLayer) return;
    if (!this.hoverLayer) return;
    if (!this.hotspotHover) return;

    if (!this.keyboardControl.altPressed) {
      if (this.parentSelectedLayer.selected) {
        this.dispatchEvent({
          actionEvent: event,
          target: this.parentSelectedLayer.mesh ?? null,
          type: "selectDismiss",
        });
      }
      this.parentSelectedLayer.clear();
    }

    if (
      !this.keyboardControl.shiftPressed
      || this.keyboardControl.altPressed
    ) {
      if (this.selectedLayer.selected) {
        this.dispatchEvent({
          actionEvent: event,
          target: this.selectedLayer.meshes,
          type: "selectDismiss",
        });
      }
      this.selectedLayer.removeAllMeshes();
    }

    this.parentSelectedLayer.direction
      = this.keyboardControl.shiftPressed ? "down" : "up";

    const meshUnderPointer = event.meshUnderPointer;

    if (
      !meshUnderPointer || !(meshUnderPointer instanceof Mesh)
    ) return;

    this.hoverLayer.removeMesh(meshUnderPointer);

    const additionalData
      = SceneHandlerSelect._getActionEventAdditionalData(event);

    if (this.keyboardControl.controlPressed) {
      if (additionalData.hit && additionalData.pickedPoint) {
        this.hotspotHover.position = additionalData.pickedPoint;

        if (additionalData.faceId === undefined)
          throw new Error("Face ID is undefined");

        const norm = meshUnderPointer.getFacetNormal(
          additionalData.faceId
        );
        this.hotspotHover.position.subtractInPlace(norm.scale(3));
        this.hotspotHover.isVisible = true;

        this.dispatchEvent({
          actionEvent: event,
          extra: { hotspot: this.hotspotHover },
          target: meshUnderPointer,
          type: "hotspotSelect",
        });
      }
      return;
    }

    if (this.keyboardControl.altPressed) {
      this.parentSelectedLayer.mesh = meshUnderPointer;

      this.dispatchEvent({
        actionEvent: event,
        target: meshUnderPointer,
        type: "parentSelect",
      });
    }
    else {
      this.selectedLayer.addMesh(meshUnderPointer);

      this.dispatchEvent({
        actionEvent: event,
        target: meshUnderPointer,
        type: "meshSelect",
      });
    }
  }

  private _registerOnPointerOutTrigger(event: ActionEvent): void {
    if (!this.hoverLayer) return;

    const meshUnderPointer = event.meshUnderPointer;

    if (
      !meshUnderPointer
      || !(meshUnderPointer instanceof Mesh)
    ) return;

    if (!meshUnderPointer) return;

    this.hoverLayer.removeMesh(meshUnderPointer);
  }

  private _registerOnPointerOverTrigger(event: ActionEvent): void {
    if (!this.selectedLayer) return;
    if (!this.parentSelectedLayer) return;
    if (!this.hoverLayer) return;

    const meshUnderPointer = event.meshUnderPointer;

    if (
      !meshUnderPointer
      || !(meshUnderPointer instanceof Mesh)
    ) return;

    if (!meshUnderPointer) return;

    if (this.selectedLayer.hasMesh(meshUnderPointer)) return;
    if (this.parentSelectedLayer.mesh === meshUnderPointer) return;

    this.hoverLayer.addMesh(meshUnderPointer);
  }

  private _rootMeshChildrenIteration(): void {
    if (!this.rootMesh) return;
    if (!this.scene) return;

    for (const mesh of this.rootMesh.getChildMeshes()) {
      if (mesh.isVisible) {
        mesh.actionManager = new ActionManager(this.scene);
        mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnLeftPickTrigger, (event) => {
            this._registerOnLeftPickTrigger(event);
          })
        );

        mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (event) => {
            this._registerOnPointerOverTrigger(event);
          })
        );

        mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, (event) => {
            this._registerOnPointerOutTrigger(event);
          })
        );
      }
    }
  }

  public dispose(): void {
    this._disposeHotspotHover();
    this._disposeHoverLayer();
    this._disposeSelectedLayer();
    this._disposeParentSelectedLayer();
    this._disposekeyboardControl();

    for (const mesh of this.rootMesh?.getChildMeshes() ?? []) {
      if (mesh.actionManager) {
        mesh.actionManager.dispose();
      }
    }
  }

  public start(): void {
    this._init();
  }

  public stop(): void {
    this.dispose();
  }

  public get active(): boolean {
    return (
      !!this._hoverLayer
      && !!this._selectedLayer
      && !!this._parentSelectedLayer
    );
  }

  public get hotspotHover(): Nullable<Mesh> {
    return this._hotspotHover ?? null;
  }

  public get hotspotHoverName(): string {
    if (!this._hotspotHoverName && this.rootMesh && this.rootMesh.name) {
      return `${this.rootMesh.name}_hotspot_hover`;
    }
    else if (!this._hotspotHoverName) {
      return "hotspot_hover";
    }
    return this._hotspotHoverName;
  }

  public get hoverLayer(): MeshSelectorControl | undefined {
    return this._hoverLayer;
  }

  public get hoverLayerName(): string {
    if (!this._hoverLayerName && this.rootMesh && this.rootMesh.name) {
      return `${this.rootMesh.name}_hover_layer`;
    }
    else if (!this._hoverLayerName) {
      return "hover_layer";
    }
    return this._hoverLayerName;
  }

  public get keyboardControl(): KeyboardControl | undefined {
    return this._keyboardControl;
  }

  public get parentSelectedLayer(): MeshParentSelectorControl | undefined {
    return this._parentSelectedLayer;
  }

  public get parentSelectedLayerName(): string {
    if (!this._parentSelectedLayerName && this.rootMesh && this.rootMesh.name) {
      return `${this.rootMesh.name}_parent_selected_layer`;
    }
    else if (!this._parentSelectedLayerName) {
      return "parent_selected_layer";
    }
    return this._parentSelectedLayerName;
  }

  public get rootMesh(): Nullable<AbstractMesh> {
    return this._rootMesh;
  }

  public set rootMesh(mesh: Nullable<AbstractMesh>) {
    this._rootMesh = mesh;
  }

  public get scene(): Nullable<Scene> {
    if (this._rootMesh) {
      return this._rootMesh.getScene();
    }

    return null;
  }

  public get selected(): boolean {
    return (
      this.selectedLayer?.selected || this.parentSelectedLayer?.selected
    ) ?? false;
  }

  public get selectedLayer(): MeshSelectorControl | undefined {
    return this._selectedLayer;
  }

  public get selectedLayerName(): string {
    if (!this._selectedLayerName && this.rootMesh && this.rootMesh.name) {
      return `${this.rootMesh.name}_selected_layer`;
    }
    else if (!this._selectedLayerName) {
      return "selected_layer";
    }
    return this._selectedLayerName;
  }
}
