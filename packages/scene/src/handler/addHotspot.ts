import type { Vector3 } from "@babylonjs/core/Maths/math.vector";
import type { Scene } from "@babylonjs/core/scene";
import type { Nullable } from "@babylonjs/core/types";

import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { CreateDisc } from "@babylonjs/core/Meshes/Builders/discBuilder";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

export type AddHotspotData = {
  billboardMode?: number;
  id: string;
  name?: string;
  parent?: Nullable<AbstractMesh> | string;
  pickable?: boolean;
  position?: Vector3;
  preserveScalingSign?: boolean;
  radius?: number;
  sideOrientation?: 0 | 1 | 2;
  tessellation?: number;
  updatePivot?: boolean;
  visible?: boolean;
};

export const addHotspot = (
  scene: Scene,
  {
    billboardMode = Mesh.BILLBOARDMODE_ALL,
    id,
    name,
    parent,
    pickable,
    position,
    preserveScalingSign,
    radius = 0.025,
    sideOrientation = Mesh.DOUBLESIDE,
    tessellation = 32,
    updatePivot,
    visible,
  }: AddHotspotData
): Mesh => {
  if (scene.getMeshById(id)) {
    throw new Error(`Mesh with id ${id} already exists in the scene`);
  }

  const hotspotMesh = CreateDisc(
    name ?? id,
    {
      radius,
      sideOrientation,
      tessellation,
    },
    scene
  );
  hotspotMesh.isVisible = visible ? true : false;
  hotspotMesh.isPickable = pickable ? true : false;
  hotspotMesh.billboardMode = billboardMode;

  if (parent) {
    let currentParent: Nullable<AbstractMesh> = null;

    if (typeof parent === "string") {
      const foundParent = scene.getNodeById(parent);
      if (foundParent instanceof AbstractMesh) {
        currentParent = foundParent;
      }
    }
    else if (parent instanceof AbstractMesh) {
      currentParent = parent;
    }

    if (currentParent) {
      hotspotMesh.setParent(currentParent, preserveScalingSign, updatePivot);
    }
  }

  if (position) {
    hotspotMesh.position.copyFrom(position);
  }

  return hotspotMesh;
};
