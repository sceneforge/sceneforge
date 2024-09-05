import type { Scene } from "@babylonjs/core/scene";
import type { Nullable } from "@babylonjs/core/types";

import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

export type CloneHotspotData = {
  id: string;
  name?: string;
  parent?: Nullable<AbstractMesh> | string;
  pickable?: boolean;
  visible?: boolean;
};

export const cloneHotspot = (
  scene: Scene,
  hotspot: Mesh | string,
  {
    id,
    name,
    parent = null,
    pickable,
    visible,
  }: CloneHotspotData
): Nullable<Mesh> => {
  if (scene.getMeshById(id)) {
    throw new Error(`Mesh with id ${id} already exists in the scene`);
  }

  let currentHotspot: Mesh;
  let currentParent: Nullable<AbstractMesh> = null;

  if (typeof hotspot === "string") {
    const foundHotspot = scene.getNodeById(hotspot);

    if (foundHotspot instanceof Mesh) {
      currentHotspot = foundHotspot;
    }
    else {
      throw new TypeError(`Mesh with id ${hotspot} not found in the scene`);
    }
  }
  else if (hotspot instanceof Mesh) {
    currentHotspot = hotspot;
  }
  else {
    throw new TypeError("Invalid hotspot type");
  }

  if (typeof parent === "string") {
    const foundParent = scene.getNodeById(parent);
    currentParent = foundParent instanceof AbstractMesh ? foundParent : null;
  }
  else if (parent instanceof AbstractMesh) {
    currentParent = parent;
  }

  const hotspotMesh = currentHotspot.clone(name ?? id, currentParent, true);

  if (hotspotMesh) {
    hotspotMesh.id = id;
    hotspotMesh.isPickable = pickable ? true : false;
    hotspotMesh.isVisible = visible ? true : false;

    return hotspotMesh;
  }

  return null;
};
