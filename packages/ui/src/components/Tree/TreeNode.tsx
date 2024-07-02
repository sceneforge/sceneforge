import * as stylex from "@stylexjs/stylex";
import { type MouseEventHandler, lazy } from "react";

import type { IconEnum } from "../../types";

import { type ActionProps } from "../Action";
import { useTree } from "./useTree";

const TreeNodeItem = lazy(() => import("./TreeNodeItem"));

export type TreeNodeProps = {
  actions?: ActionProps[];
  expanded?: boolean;
  icon?: IconEnum;
  id?: string;
  index?: number;
  label?: string;
  level?: number;
  nodes?: (() => Omit<TreeNodeProps, "id" | "index" | "level">[]) | Omit<TreeNodeProps, "id" | "index" | "level">[];
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const styles = stylex.create({
  container: {
    listStyle: "none",
  },
  nodes: {
    listStyle: "none",
    margin: 0,
    paddingBlock: 0,
    paddingInlineStart: "1rem",
  },
});

const TreeNode = ({
  actions,
  expanded: initialExpanded = false,
  icon,
  id,
  index,
  label,
  level = 0,
  nodes,
  onClick,
}: TreeNodeProps) => {
  const {
    currentId,
    expanded,
    handleNodeClick,
    hasNodes,
    nodesArray,
    toggleExpand,
  } = useTree({ id, initialExpanded, nodes, onClick });

  return (
    <li
      id={`${currentId}-node-${level}-${index}`}
      {...stylex.props(styles.container)}
    >
      <TreeNodeItem
        actions={actions}
        expanded={expanded}
        hasNodes={hasNodes}
        icon={icon}
        label={label}
        onClick={handleNodeClick}
        toggleExpand={toggleExpand}
      />
      {hasNodes && expanded && (
        <ul
          id={`${currentId}-node-${level + 1}`}
          {...stylex.props(styles.nodes)}
        >
          {nodesArray.map((node, nodeIndex) => (
            <TreeNode
              id={currentId}
              index={nodeIndex}
              key={`${currentId}-node-${level + 1}-${nodeIndex}`}
              level={level + 1}
              {...node}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
