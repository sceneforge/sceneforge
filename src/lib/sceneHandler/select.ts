import { type AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { KeyboardControl } from "./KeyboardControl";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { CreateDisc } from "@babylonjs/core/Meshes/Builders/discBuilder";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { ExecuteCodeAction } from "@babylonjs/core/Actions/directActions";
import { MeshSelectorControl } from "./MeshSelectorControl";
import { MeshParentSelectorControl } from "./MeshParentSelectorControl";
import { type ActionEvent } from "@babylonjs/core/Actions/actionEvent";

type SelectEvent<T extends object = object> = (
  mesh: AbstractMesh,
  ev: ActionEvent,
  extra: T
) => void | Promise<void>;

type MeshSelectionEvents = {
  onMeshSelect?: SelectEvent;
  onParentSelect?: SelectEvent;
  onHotspotSelect?: SelectEvent<{ hotspot: AbstractMesh }>;
};

export const select = (
  rootMesh: AbstractMesh | undefined | null,
  { onMeshSelect, onParentSelect, onHotspotSelect }: MeshSelectionEvents = {}
) => {
  if (!rootMesh) return;
  const scene = rootMesh.getScene();
  if (!scene) return;

  const keyboardControl = new KeyboardControl(scene);

  const hoverLayer = new MeshSelectorControl("hoverLayer", scene, {
    outlineColor: Color3.White(),
  });
  const selectedLayer = new MeshSelectorControl("selectedLayer", scene, {
    outlineColor: Color3.Green(),
  });
  const parentSelectedLayer = new MeshParentSelectorControl(
    "parentSelectedLayer",
    scene
  );

  selectedLayer.highlight();
  hoverLayer.highlight();

  const hotspotHover = CreateDisc(
    "hotspot_hover",
    {
      radius: 0.025,
      tessellation: 32,
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene
  );

  hotspotHover.isVisible = false;
  hotspotHover.isPickable = false;
  hotspotHover.billboardMode = 7;

  keyboardControl.onEscapePressed(() => {
    hoverLayer.removeAllMeshes();
    selectedLayer.removeAllMeshes();
    parentSelectedLayer.clear();
    hotspotHover.isVisible = false;
  });

  for (const mesh of rootMesh.getChildMeshes()) {
    if (mesh.isVisible) {
      mesh.actionManager = new ActionManager(scene);
      mesh.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnLeftPickTrigger, (ev) => {
          if (!keyboardControl.altPressed) parentSelectedLayer.clear();
          if (!keyboardControl.shiftPressed || keyboardControl.altPressed)
            selectedLayer.removeAllMeshes();
          parentSelectedLayer.direction = keyboardControl.shiftPressed
            ? "down"
            : "up";
          const meshUnderPointer = ev.meshUnderPointer;
          if (!meshUnderPointer || !(meshUnderPointer instanceof Mesh)) return;
          hoverLayer.removeMesh(meshUnderPointer);

          if (keyboardControl.controlPressed) {
            if (ev.additionalData.hit && ev.additionalData.pickedPoint) {
              hotspotHover.position = ev.additionalData.pickedPoint;
              const norm = meshUnderPointer.getFacetNormal(
                ev.additionalData.faceId
              );
              hotspotHover.position.subtractInPlace(norm.scale(3));
              hotspotHover.isVisible = true;
              if (onHotspotSelect) {
                onHotspotSelect(meshUnderPointer, ev, {
                  hotspot: hotspotHover,
                });
              }
            }
            return;
          }

          if (!keyboardControl.altPressed) {
            selectedLayer.addMesh(meshUnderPointer);
            if (onMeshSelect) {
              onMeshSelect(meshUnderPointer, ev, {});
            }
          } else {
            parentSelectedLayer.mesh = meshUnderPointer;
            if (onParentSelect) {
              onParentSelect(meshUnderPointer, ev, {});
            }
          }
        })
      );
      mesh.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (ev) => {
          const meshUnderPointer = ev.meshUnderPointer;
          if (!meshUnderPointer || !(meshUnderPointer instanceof Mesh)) return;
          if (!meshUnderPointer) return;
          if (selectedLayer.hasMesh(meshUnderPointer)) return;
          if (parentSelectedLayer.mesh === meshUnderPointer) return;

          hoverLayer.addMesh(meshUnderPointer);
        })
      );
      mesh.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, (ev) => {
          const meshUnderPointer = ev.meshUnderPointer;
          if (!meshUnderPointer || !(meshUnderPointer instanceof Mesh)) return;
          if (!meshUnderPointer) return;
          hoverLayer.removeMesh(meshUnderPointer);
        })
      );
    }
  }

  return () => {
    hotspotHover.dispose();
    keyboardControl.dispose();
    hoverLayer.dispose();
    selectedLayer.dispose();
    parentSelectedLayer.dispose();

    for (const mesh of rootMesh.getChildMeshes()) {
      if (mesh.actionManager) {
        mesh.actionManager.dispose();
      }
    }
  };
};
