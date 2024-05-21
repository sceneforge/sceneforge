import { type ActionEvent } from "@babylonjs/core/Actions/actionEvent";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { ExecuteCodeAction } from "@babylonjs/core/Actions/directActions";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { CreateDisc } from "@babylonjs/core/Meshes/Builders/discBuilder";
import { type AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

import { getActionEventAdditionalData } from "../getActionEventAdditionalData";
import { KeyboardControl } from "./KeyboardControl";
import { MeshParentSelectorControl } from "./MeshParentSelectorControl";
import { MeshSelectorControl } from "./MeshSelectorControl";

type SelectEvent<T extends object = object> = (
  mesh: AbstractMesh,
  event: ActionEvent,
  extra: T,
) => Promise<void> | void;

type MeshSelectionEvents = {
  onHotspotSelect?: SelectEvent<{ hotspot: AbstractMesh }>;
  onMeshSelect?: SelectEvent;
  onParentSelect?: SelectEvent;
};

export const select = (
  rootMesh: AbstractMesh | null | undefined,
  { onHotspotSelect, onMeshSelect, onParentSelect }: MeshSelectionEvents = {}
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
      sideOrientation: Mesh.DOUBLESIDE,
      tessellation: 32,
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
        new ExecuteCodeAction(ActionManager.OnLeftPickTrigger, (event) => {
          if (!keyboardControl.altPressed) parentSelectedLayer.clear();
          if (!keyboardControl.shiftPressed || keyboardControl.altPressed)
            selectedLayer.removeAllMeshes();
          parentSelectedLayer.direction = keyboardControl.shiftPressed
            ? "down"
            : "up";
          const meshUnderPointer = event.meshUnderPointer;
          if (!meshUnderPointer || !(meshUnderPointer instanceof Mesh)) return;
          hoverLayer.removeMesh(meshUnderPointer);

          const additionalData = getActionEventAdditionalData(event);

          if (keyboardControl.controlPressed) {
            if (additionalData.hit && additionalData.pickedPoint) {
              hotspotHover.position = additionalData.pickedPoint;

              if (additionalData.faceId === undefined)
                throw new Error("Face ID is undefined");

              const norm = meshUnderPointer.getFacetNormal(
                additionalData.faceId
              );
              hotspotHover.position.subtractInPlace(norm.scale(3));
              hotspotHover.isVisible = true;
              if (onHotspotSelect) {
                onHotspotSelect(meshUnderPointer, event, {
                  hotspot: hotspotHover,
                })
                  ?.then(() => {})
                  ?.catch((error) => {
                    throw new Error("Failed to select hotspot", {
                      cause: error,
                    });
                  });
              }
            }
            return;
          }

          if (keyboardControl.altPressed) {
            parentSelectedLayer.mesh = meshUnderPointer;
            if (onParentSelect) {
              onParentSelect(meshUnderPointer, event, {})
                ?.then(() => {})
                ?.catch((error: unknown) => {
                  throw new Error("Failed to select parent", { cause: error });
                });
            }
          }
          else {
            selectedLayer.addMesh(meshUnderPointer);
            if (onMeshSelect) {
              onMeshSelect(meshUnderPointer, event, {})
                ?.then(() => {})
                ?.catch((error) => {
                  throw new Error("Failed to select mesh", { cause: error });
                });
            }
          }
        })
      );

      mesh.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (event) => {
          const meshUnderPointer = event.meshUnderPointer;
          if (!meshUnderPointer || !(meshUnderPointer instanceof Mesh)) return;
          if (!meshUnderPointer) return;
          if (selectedLayer.hasMesh(meshUnderPointer)) return;
          if (parentSelectedLayer.mesh === meshUnderPointer) return;

          hoverLayer.addMesh(meshUnderPointer);
        })
      );
      mesh.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, (event) => {
          const meshUnderPointer = event.meshUnderPointer;
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
