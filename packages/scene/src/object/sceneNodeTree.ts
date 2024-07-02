import type { Scene } from "@babylonjs/core/scene";

import { getNodeChildren } from "./getNodeChildren";
import { hasChildren } from "./hasChildren";
import { id } from "./id";
import { name } from "./name";

export type SceneNode = {
  id?: string;
  label?: string;
  nodes?: (() => SceneNode[]) | SceneNode[];
};

const sceneNode = (node: unknown): SceneNode => ({
  id: id(node),
  label: name(node),
  nodes: hasChildren(node)
    ? () => getNodeChildren(node).map(child => sceneNode(child))
    : undefined,
});

export const sceneNodeTree = (scene: Scene): SceneNode[] => {
  return scene.rootNodes.map(node => sceneNode(node));
};
