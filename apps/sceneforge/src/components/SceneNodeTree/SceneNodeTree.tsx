import type { Scene } from "@babylonjs/core/scene";
import type { Nullable } from "@babylonjs/core/types";

import { compare } from "@sceneforge/scene";
import { useId } from "react";

import { SceneNode } from "./SceneNode";

export type SceneNodeTreeProps = {
  clearMeshSelectionPath?: () => void;
  meshSelectionPath?: readonly string[];
  onNodeSelect?: (node: unknown) => void;
  scene: Nullable<Scene>;
};

export const SceneNodeTree = ({
  clearMeshSelectionPath,
  meshSelectionPath,
  onNodeSelect,
  scene,
}: SceneNodeTreeProps) => {
  const genId = useId();
  return (
    <ul className="m-0 list-none p-0" id={`${genId}-children`}>
      {scene
      && scene.rootNodes
        .sort(compare)
        .map((node, index) => (
          <SceneNode
            clearMeshSelectionPath={clearMeshSelectionPath}
            key={`${genId}-${index}`}
            meshSelectionPath={meshSelectionPath}
            node={node}
            onNodeSelect={onNodeSelect}
          />
        ))}
    </ul>
  );
};
