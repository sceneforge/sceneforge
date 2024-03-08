import type { Scene } from "@babylonjs/core/scene";
import type { Nullable } from "@babylonjs/core/types";
import { SceneNode } from "./SceneNode";

import { compare } from "../../lib/sceneObject";
import styles from "./SceneNodeTree.module.css";

export type SceneNodeTreeProps = {
  scene: Nullable<Scene>;
  onNodeSelect?: (node: unknown) => void;
}

export const SceneNodeTree = ({ scene, onNodeSelect }: SceneNodeTreeProps) => {
  return (
    <div className={styles.wrapper}>
      <ul>
        {scene && scene.rootNodes.sort(compare).map((node, index) => (
          <SceneNode key={index} node={node} onNodeSelect={onNodeSelect} />
        ))}
      </ul>
    </div>
  );
}