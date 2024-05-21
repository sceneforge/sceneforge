import { useCallback, useEffect, useId, useMemo, useState } from "react";

import {
  SceneObjectType,
  compare,
  hasChildren,
  hideNode,
  id,
  isVisible,
  name,
  showNode,
  typeOf,
} from "../../lib/sceneObject";
import { getNodeChildren } from "../../lib/sceneObject/getNodeChildren";
import { Button, ButtonToggleEvent } from "../Button";
import { Icon, type IconName } from "../Icon";
import { IconButton } from "../IconButton";

export type SceneNodeProps = {
  clearMeshSelectionPath?: () => void;
  meshSelectionPath?: readonly string[];
  node: unknown;
  onNodeSelect?: (node: unknown) => void;
};

const nodeTypeIconMap: Record<SceneObjectType, IconName> = {
  [SceneObjectType.AbstractMesh]: "deployedCode",
  [SceneObjectType.ArcRotateCamera]: "cameraswitch",
  [SceneObjectType.Camera]: "camera",
  [SceneObjectType.HemisphericLight]: "sunny",
  [SceneObjectType.Light]: "lightbulb",
  [SceneObjectType.Mesh]: "deployedCodeSharp",
  [SceneObjectType.TransformNode]: "transform",
  [SceneObjectType.Unknown]: "questionMark",
};

export const SceneNode = ({
  clearMeshSelectionPath,
  meshSelectionPath: [meshSelection, ...meshSelectionPath] = [],
  node,
  onNodeSelect,
}: SceneNodeProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean | undefined>(isVisible(node));
  const nodeName = useMemo(() => name(node), [node]);
  const nodeType = useMemo(() => typeOf(node), [node]);
  const genId = useId();

  const nodeHasChildren = useMemo(() => hasChildren(node), [node]);

  const childrenNodes: unknown[]
    = open && nodeHasChildren ? getNodeChildren(node).sort(compare) : [];

  const expandNode = useCallback(() => {
    if (open) {
      setOpen(false);
    }
    else {
      setOpen(true);
    }
  }, [open]);

  const handleOnNodeSelect = useCallback(() => {
    if (!open) expandNode();
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  }, [onNodeSelect, node, open, expandNode]);

  const handleVisibility = useCallback(
    (event: ButtonToggleEvent) => {
      if (event.state === "pressed") {
        if (hideNode(node)) {
          setVisible(false);
        }
      }
      else if (event.state === "released" && showNode(node)) {
        setVisible(true);
      }
    },
    [node]
  );

  useEffect(() => {
    if (meshSelection && meshSelectionPath && meshSelectionPath.length > 0) {
      if (meshSelection === id(node) && !open) {
        setOpen(true);
      }
      else if (meshSelection !== id(node) && open) {
        setOpen(false);
      }
    }
  }, [meshSelection, meshSelectionPath, node, open]);

  const handleExpandNode = useCallback(() => {
    if (clearMeshSelectionPath) {
      clearMeshSelectionPath();
    }
    expandNode();
  }, [clearMeshSelectionPath, expandNode]);

  return (
    <li className="list-none p-l-5 c-inherit" data-open={open} id={genId}>
      <div className="relative flex flex-row flex-nowrap items-center justify-stretch c-inherit dark:focus-within:bg-black:10 dark:hover:bg-white:10 light:focus-within:bg-white:10 light:hover:bg-black:10">
        {nodeHasChildren && (
          <IconButton
            aria-controls={`${genId}-children`}
            aria-expanded={open}
            className="absolute m-0 translate-x--4 b-0 b-none bg-transparent p-0 c-inherit children:rotate--90 children:aria-expanded:rotate-0"
            icon="expandMore"
            onClick={handleExpandNode}
          />
        )}
        <Button
          className="h-full w-full flex flex-grow flex-row cursor-pointer items-center justify-start gap-2 b-0 b-none bg-transparent p-block-1 text-start c-inherit"
          clear
          onClick={handleOnNodeSelect}
        >
          <Icon icon={nodeTypeIconMap[nodeType]} />
          <span className="w-0 flex-grow overflow-hidden text-ellipsis text-nowrap">
            {nodeName}
          </span>
        </Button>
        <div className="m-block--2 flex flex-shrink flex-row items-center justify-stretch c-inherit">
          <IconButton
            icon={["visibility", "visibilityOff"]}
            onToggle={handleVisibility}
            pressed={!visible}
            toggle
          />
        </div>
      </div>

      {nodeHasChildren && (
        <ul
          className="m-0 list-none p-0 c-inherit"
          hidden={!open}
          id={`${genId}-children`}
        >
          {open
          && childrenNodes.map((node, index) => (
            <SceneNode
              clearMeshSelectionPath={clearMeshSelectionPath}
              key={`${genId}-${index}`}
              meshSelectionPath={meshSelectionPath}
              node={node}
              onNodeSelect={onNodeSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
