import type { Scene } from "@babylonjs/core/scene";
import type { Nullable } from "@babylonjs/core/types";
import { SceneNode } from "./SceneNode";

import { compare } from "../../lib/sceneObject";
import { useId } from "react";

export type SceneNodeTreeProps = {
  scene: Nullable<Scene>;
  meshSelectionPath?: readonly string[];
  clearMeshSelectionPath?: () => void;
  onNodeSelect?: (node: unknown) => void;
};

export const SceneNodeTree = ({
  scene,
  meshSelectionPath,
  clearMeshSelectionPath,
  onNodeSelect,
}: SceneNodeTreeProps) => {
  const genId = useId();
  return (
    <ul className="m-0 list-none p-0" id={`${genId}-children`}>
      {scene &&
        scene.rootNodes
          .sort(compare)
          .map((node, index) => (
            <SceneNode
              key={`${genId}-${index}`}
              node={node}
              onNodeSelect={onNodeSelect}
              meshSelectionPath={meshSelectionPath}
              clearMeshSelectionPath={clearMeshSelectionPath}
            />
          ))}
    </ul>
  );
};