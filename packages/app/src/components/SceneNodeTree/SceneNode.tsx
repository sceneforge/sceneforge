import {
  Button,
  Icon,
  IconButton,
  IconEnum,
  Toggle,
  type ToggleEvent,
} from "@sceneforge/ui";
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

export type SceneNodeProps = {
  clearMeshSelectionPath?: () => void;
  meshSelectionPath?: readonly string[];
  node: unknown;
  onNodeSelect?: (node: unknown) => void;
};

const nodeTypeIconMap: Record<SceneObjectType, IconEnum> = {
  [SceneObjectType.AbstractMesh]: IconEnum.DeployedCode,
  [SceneObjectType.ArcRotateCamera]: IconEnum.CameraSwitch,
  [SceneObjectType.Camera]: IconEnum.Camera,
  [SceneObjectType.HemisphericLight]: IconEnum.Sunny,
  [SceneObjectType.Light]: IconEnum.Lightbulb,
  [SceneObjectType.Mesh]: IconEnum.DeployedCodeSharp,
  [SceneObjectType.TransformNode]: IconEnum.Transform,
  [SceneObjectType.Unknown]: IconEnum.QuestionMark,
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
    (event: ToggleEvent) => {
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
            icon={IconEnum.ExpandMore}
            onClick={handleExpandNode}
          />
        )}
        <Button onClick={handleOnNodeSelect}>
          <Icon icon={nodeTypeIconMap[nodeType]} />
          <span>{nodeName}</span>
        </Button>
        <div className="m-block--2 flex flex-shrink flex-row items-center justify-stretch c-inherit">
          <Toggle onToggle={handleVisibility} pressed={!visible}>
            <Icon
              icon={visible ? IconEnum.Visibility : IconEnum.VisibilityOff}
            />
          </Toggle>
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
