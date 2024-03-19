import type { Scene } from "@babylonjs/core/scene";
import type { Nullable } from "@babylonjs/core/types";
import { SceneNode } from "./SceneNode";

import { compare } from "../../lib/sceneObject";

export type SceneNodeTreeProps = {
  scene: Nullable<Scene>;
  onNodeSelect?: (node: unknown) => void;
}

export const SceneNodeTree = ({ scene, onNodeSelect }: SceneNodeTreeProps) => {
  return (
    <div>
      <ul className="m-0 list-none p-0">
        {scene &&
          scene.rootNodes
            .sort(compare)
            .map((node, index) => (
              <SceneNode key={index} node={node} onNodeSelect={onNodeSelect} />
            ))}
      </ul>
    </div>
  );
}