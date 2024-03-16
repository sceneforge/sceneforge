import { useCallback, useId, useMemo, useState } from "react";
import { Button, ButtonToggleEvent } from "../Button";
import { IconButton } from "../IconButton";

import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import {
  SceneObjectType,
  compare,
  hasChildren,
  isVisible,
  name,
  typeOf,
} from "../../lib/sceneObject";
import { Icon, type IconName } from "../Icon";

export type SceneNodeProps = {
  node: unknown;
  onNodeSelect?: (node: unknown) => void;
};

const nodeTypeIconMap: Record<SceneObjectType, IconName> = {
  [SceneObjectType.Mesh]: "deployedCodeSharp",
  [SceneObjectType.AbstractMesh]: "deployedCode",
  [SceneObjectType.HemisphericLight]: "sunny",
  [SceneObjectType.Light]: "lightbulb",
  [SceneObjectType.ArcRotateCamera]: "cameraswitch",
  [SceneObjectType.Camera]: "camera",
  [SceneObjectType.TransformNode]: "transform",
  [SceneObjectType.Unknown]: "questionMark",
};

export const SceneNode = ({ node, onNodeSelect }: SceneNodeProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean | undefined>(isVisible(node));
  const nodeName = useMemo(() => name(node), [node]);
  const nodeType = useMemo(() => typeOf(node), [node]);
  const genId = useId();

  const [childrenNodes, setChildrenNodes] = useState<unknown[]>([]);
  const nodeHasChildren = useMemo(() => hasChildren(node), [node]);

  const expandNode = useCallback(() => {
    if (!open) {
      if (nodeHasChildren && childrenNodes.length === 0) {
        if (typeof node === "object" && node !== null) {
          if (
            "getChildMeshes" in node &&
            typeof node.getChildMeshes === "function"
          ) {
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

  const handleVisibility = useCallback(
    (event: ButtonToggleEvent) => {
      if (event.state === "pressed") {
        hideNode();
      } else if (event.state === "released") {
        showNode();
      }
    },
    [hideNode, showNode]
  );

  return (
    <li id={genId} data-open={open} className="list-none p-l-5 c-inherit">
      <div className="relative flex flex-row justify-stretch items-center flex-nowrap light:focus-within:bg-white:10 dark:focus-within:bg-black:10 c-inherit dark:hover:bg-white:10 light:hover:bg-black:10">
        {nodeHasChildren && (
          <IconButton
            className="absolute c-inherit bg-transparent p-0 m-0 b-none b-0 children:rotate--90 children:aria-expanded:rotate-0 translate-x--4"
            aria-expanded={open}
            aria-controls={`${genId}-children`}
            icon="expandMore"
            onClick={expandNode}
          />
        )}
        <Button
          clear
          onClick={handleOnNodeSelect}
          className="flex-grow flex flex-row justify-start items-center gap-2 bg-transparent b-none b-0 text-start c-inherit w-full h-full p-block-1 cursor-pointer"
        >
          <Icon icon={nodeTypeIconMap[nodeType]} />
          <span className="flex-grow text-ellipsis text-nowrap overflow-hidden w-0">
            {nodeName}
          </span>
        </Button>
        <div className="flex-shrink c-inherit flex flex-row justify-stretch items-center m-block--2">
          <IconButton
            toggle
            icon={["visibility", "visibilityOff"]}
            pressed={!visible}
            onToggle={handleVisibility}
          />
        </div>
      </div>

      {nodeHasChildren && (
        <ul
          id={`${genId}-children`}
          hidden={!open}
          className="list-none m-0 p-0 c-inherit"
        >
          {open &&
            childrenNodes.map((node, index) => (
              <SceneNode key={index} node={node} onNodeSelect={onNodeSelect} />
            ))}
        </ul>
      )}
    </li>
  );
};
