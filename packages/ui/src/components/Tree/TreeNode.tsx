import * as stylex from "@stylexjs/stylex";
import { lazy, type MouseEventHandler } from "react";

import type { ActionListProps } from "../ActionList";

import { type IconEnum, Orientation } from "../../types";
import { Unlisted, UnlistedItem } from "../Unlisted";
import { useTree } from "./useTree";

const TreeNodeItem = lazy(() => import("./TreeNodeItem"));

export type TreeNodeProps = {
  actions?: ActionListProps["actions"];
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
    alignContent: "start",
    display: "grid",
  },
  list: {
    height: null,
    width: null,
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
    <UnlistedItem
      id={`${currentId}-node-${level}-${index}`}
      style={styles.container}
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
        <Unlisted
          id={`${currentId}-node-${level + 1}`}
          margin={0}
          orientation={Orientation.Vertical}
          padding={{
            block: 0,
            inlineEnd: 0,
            inlineStart: 1,
          }}
          style={styles.list}
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
        </Unlisted>
      )}
    </UnlistedItem>
  );
};

export default TreeNode;
