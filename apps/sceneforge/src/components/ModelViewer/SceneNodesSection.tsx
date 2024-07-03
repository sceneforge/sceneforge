import { type Scene } from "@babylonjs/core/scene";
import { type Nullable } from "@babylonjs/core/types";
import { type Dispatch } from "react";

import { SceneNodeTree } from "../SceneNodeTree";

export type SceneNodesSectionProps = {
  clearMeshSelectionPath?: () => void;
  meshSelectionPath?: readonly string[];
  onNodeSelect: Dispatch<unknown>;
  scene: Nullable<Scene>;
};

export const SceneNodesSection = ({
  clearMeshSelectionPath,
  meshSelectionPath,
  onNodeSelect,
  scene,
}: SceneNodesSectionProps) => {
  return (
    <SceneNodeTree
      clearMeshSelectionPath={clearMeshSelectionPath}
      meshSelectionPath={meshSelectionPath}
      onNodeSelect={onNodeSelect}
      scene={scene}
    />
  );
};
