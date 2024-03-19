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
      <div className="relative flex flex-row flex-nowrap items-center justify-stretch c-inherit dark:focus-within:bg-black:10 dark:hover:bg-white:10 light:focus-within:bg-white:10 light:hover:bg-black:10">
        {nodeHasChildren && (
          <IconButton
            className="absolute m-0 translate-x--4 b-0 b-none bg-transparent p-0 c-inherit children:rotate--90 children:aria-expanded:rotate-0"
            aria-expanded={open}
            aria-controls={`${genId}-children`}
            icon="expandMore"
            onClick={expandNode}
          />
        )}
        <Button
          clear
          onClick={handleOnNodeSelect}
          className="h-full w-full flex flex-grow flex-row cursor-pointer items-center justify-start gap-2 b-0 b-none bg-transparent p-block-1 text-start c-inherit"
        >
          <Icon icon={nodeTypeIconMap[nodeType]} />
          <span className="w-0 flex-grow overflow-hidden text-ellipsis text-nowrap">
            {nodeName}
          </span>
        </Button>
        <div className="m-block--2 flex flex-shrink flex-row items-center justify-stretch c-inherit">
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
          className="m-0 list-none p-0 c-inherit"
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
