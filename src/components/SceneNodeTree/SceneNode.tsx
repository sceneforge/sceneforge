import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { Button, ButtonToggleEvent } from "../Button";
import { IconButton } from "../IconButton";

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
import { Icon, type IconName } from "../Icon";
import { getNodeChildren } from "../../lib/sceneObject/getNodeChildren";

export type SceneNodeProps = {
  node: unknown;
  meshSelectionPath?: readonly string[];
  clearMeshSelectionPath?: () => void;
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

export const SceneNode = ({
  node,
  meshSelectionPath: [meshSelection, ...meshSelectionPath] = [],
  clearMeshSelectionPath,
  onNodeSelect,
}: SceneNodeProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean | undefined>(isVisible(node));
  const nodeName = useMemo(() => name(node), [node]);
  const nodeType = useMemo(() => typeOf(node), [node]);
  const genId = useId();

  const nodeHasChildren = useMemo(() => hasChildren(node), [node]);

  const childrenNodes: unknown[] =
    open && nodeHasChildren ? getNodeChildren(node).sort(compare) : [];

  const expandNode = useCallback(() => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [open]);

  const handleOnNodeSelect = useCallback(() => {
    if (!open) expandNode();
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  }, [onNodeSelect, node, open, expandNode]);

  const handleVisibility = useCallback((event: ButtonToggleEvent) => {
    if (event.state === "pressed") {
      if (hideNode(node)) {
        setVisible(false);
      }
    } else if (event.state === "released") {
      if (showNode(node)) {
        setVisible(true);
      }
    }
  }, []);

  useEffect(() => {
    if (meshSelection && meshSelectionPath && meshSelectionPath.length > 0) {
      if (meshSelection === id(node) && !open) {
        setOpen(true);
      } else if (meshSelection !== id(node) && open) {
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
    <li id={genId} data-open={open} className="list-none p-l-5 c-inherit">
      <div className="relative flex flex-row flex-nowrap items-center justify-stretch c-inherit dark:focus-within:bg-black:10 dark:hover:bg-white:10 light:focus-within:bg-white:10 light:hover:bg-black:10">
        {nodeHasChildren && (
          <IconButton
            className="absolute m-0 translate-x--4 b-0 b-none bg-transparent p-0 c-inherit children:rotate--90 children:aria-expanded:rotate-0"
            aria-expanded={open}
            aria-controls={`${genId}-children`}
            icon="expandMore"
            onClick={handleExpandNode}
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
              <SceneNode
                key={`${genId}-${index}`}
                node={node}
                onNodeSelect={onNodeSelect}
                meshSelectionPath={meshSelectionPath}
                clearMeshSelectionPath={clearMeshSelectionPath}
              />
            ))}
        </ul>
      )}
    </li>
  );
};
