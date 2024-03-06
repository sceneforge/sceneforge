import { type AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { type TreeNode } from "../components/TreeView";

export const meshTree = (meshes?: AbstractMesh[], parent?: boolean): TreeNode<AbstractMesh>[] => {
  if (!meshes) return [];
  if (!parent) {
    return meshTree(meshes.filter((mesh) => !mesh.parent), true);
  }
  return meshes.map((mesh) => {
    return {
      id: mesh.id,
      label: mesh.name,
      children: meshTree(mesh.getChildren(undefined, true), true),
      reference: mesh
    }
  });
};