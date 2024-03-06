import { type AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { useCallback, type MouseEventHandler, type MouseEvent as ReactMouseEvent } from "react";
import { IconButton } from "../IconButton";
import { type TreeNode } from "../TreeView";
import styles from "./MeshNode.module.css";
import { NodeLabel } from "./NodeLabel";

export type MeshNodeProps = TreeNode<AbstractMesh> & {
  summary?: boolean;
  onClick?: (event: ReactMouseEvent<HTMLElement, MouseEvent> & { data: Omit<TreeNode<AbstractMesh>, "component" | "children"> }) => void;
};

export const MeshNode = ({ summary = false, label, onClick, ...props }: MeshNodeProps) => {

  const handleClick: MouseEventHandler<HTMLElement> = useCallback((event) => {
    if (onClick) {
      onClick({ ...event, data: { label, ...props } });
    }
  }, [onClick, label, props]);

  const content = (
    <div className={styles.wrapper}>
      <NodeLabel summary={summary} onClick={handleClick}>{label}</NodeLabel>
      <div className={styles.actions}>
        <IconButton toggle size="xs" icon={["eye", "eye-low-vision"]} title="Visible" />
      </div>
    </div>
  );

  return summary ? (
    <summary>
      {content}
    </summary>
  ) : content;
};