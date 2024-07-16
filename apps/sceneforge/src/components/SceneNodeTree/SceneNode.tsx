import {
  SceneObjectType,
  compare,
  getNodeChildren,
  hasChildren,
  hideNode,
  id,
  isVisible,
  name,
  showNode,
  typeOf,
} from "@sceneforge/scene";
import {
  Button,
  Icon,
  IconButton,
  IconEnum,
  Toggle,
  type ToggleEvent,
} from "@sceneforge/ui";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

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

  const childrenNodes: unknown[] = useMemo(
    () => open && nodeHasChildren
      ? getNodeChildren(node)
        .sort(compare)
      : []
    , [nodeHasChildren, node, open]
  );

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
    <li data-open={open} id={genId}>
      <div>
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
        <div>
          <Toggle onToggle={handleVisibility} pressed={!visible}>
            <Icon
              icon={visible ? IconEnum.Visibility : IconEnum.VisibilityOff}
            />
          </Toggle>
        </div>
      </div>

      {nodeHasChildren && (
        <ul
          hidden={!open}
          id={`${genId}-children`}
        >
          {open && childrenNodes.map((node, index) => (
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
