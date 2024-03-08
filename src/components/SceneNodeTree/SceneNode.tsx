import { useCallback, useMemo, useState } from "react";
import { Button, ButtonToggleEvent } from "../Button";
import { IconButton } from "../IconButton";

import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { type IconName, type IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { SceneObjectType, compare, hasChildren, isVisible, name, typeOf } from "../../lib/sceneObject";
import { Icon } from "../Icon";
import styles from "./SceneNode.module.css";

export type SceneNodeProps = {
  node: unknown;
  onNodeSelect?: (node: unknown) => void;
}

const nodeTypeIconMap: Record<SceneObjectType, [IconPrefix, IconName]> = {
  [SceneObjectType.Mesh]: ["fas", "cube"],
  [SceneObjectType.AbstractMesh]: ["fas", "cube"],
  [SceneObjectType.HemisphericLight]: ["fas", "lightbulb"],
  [SceneObjectType.Light]: ["fas", "lightbulb"],
  [SceneObjectType.ArcRotateCamera]: ["fas", "camera"],
  [SceneObjectType.Camera]: ["fas", "camera"],
  [SceneObjectType.TransformNode]: ["fas", "cube"],
  [SceneObjectType.Unknown]: ["fas", "question"]
}

export const SceneNode = ({ node, onNodeSelect }: SceneNodeProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean | undefined>(isVisible(node));
  const nodeName = useMemo(() => name(node), [node]);
  const nodeType = useMemo(() => typeOf(node), [node]);

  const [childrenNodes, setChildrenNodes] = useState<unknown[]>([]);
  const nodeHasChildren = useMemo(() => hasChildren(node), [node]);

  const expandNode = useCallback(() => {
    if (!open) {
      if (nodeHasChildren && childrenNodes.length === 0) {
        if (typeof node === "object" && node !== null) {
          if ("getChildMeshes" in node && typeof node.getChildMeshes === "function") {
            setChildrenNodes(node.getChildMeshes().sort(compare));
          }
          if ("getChildren" in node && typeof node.getChildren === "function") {
            setChildrenNodes(node.getChildren().sort(compare));
          }
        }
      }
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [open, node, nodeHasChildren, childrenNodes, setChildrenNodes, setOpen]);

  const handleOnNodeSelect = useCallback(() => {
    if (!open) expandNode();
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  }, [onNodeSelect, node, open, expandNode]);

  const hideNode = useCallback(() => {
    if (node instanceof AbstractMesh) {
      node.isVisible = false;
      setVisible(false);
    } else if (node instanceof HemisphericLight) {
      node.setEnabled(false);
      setVisible(false);
    }
  }, [node, setVisible]);

  const showNode = useCallback(() => {
    if (node instanceof AbstractMesh) {
      node.isVisible = true;
      setVisible(true);
    } else if (node instanceof HemisphericLight) {
      node.setEnabled(true);
      setVisible(true);
    }
  }, [node, setVisible]);

  const handleVisibility = useCallback((event: ButtonToggleEvent) => {
    if (event.state === "pressed") {
      hideNode();
    } else if (event.state === "released") {
      showNode();
    }
  }, [hideNode, showNode]);

  return (
    <li data-open={open} className={styles.wrapper}>
      <div className={styles.node}>
        {nodeHasChildren && (<IconButton icon="chevron-down" onClick={expandNode} />)}
        <Icon prefix={nodeTypeIconMap[nodeType][0]} icon={nodeTypeIconMap[nodeType][1]} data-type={nodeType} />
        <Button clear onClick={handleOnNodeSelect}>{nodeName}</Button>
        <div className={styles.tools}>
          <IconButton toggle icon={["eye", "eye-low-vision"]} pressed={!visible} onToggle={handleVisibility} />
        </div>
      </div>
      {nodeHasChildren && open && (
        <ul>
          {childrenNodes.map((node, index) => (
            <SceneNode key={index} node={node} onNodeSelect={onNodeSelect} />
          ))}
        </ul>
      )}
    </li>
  );
};
