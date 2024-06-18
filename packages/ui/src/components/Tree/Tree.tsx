import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { lazy, useId, useMemo } from "react";

import type { TreeNodeProps } from "./TreeNode";

const TreeNode = lazy(() => import("./TreeNode"));

export type TreeProps = {
  id?: string;
  nodes: (() => Omit<TreeNodeProps, "index" | "level" | "treeId">[]) | Omit<TreeNodeProps, "index" | "level" | "treeId">[];
  style: StyleXStyles;
};

const styles = stylex.create({
  container: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
});

const Tree = ({ id, nodes, style }: TreeProps) => {
  const generatedId = useId();
  const treeId = id || generatedId;

  const nodesArray = useMemo(() => {
    return Array.isArray(nodes) ? nodes : nodes();
  }, [nodes]);

  return (
    <div id={treeId} {...stylex.props(style)}>
      <ul id={`${treeId}-node-0`} {...stylex.props(styles.container)}>
        {nodesArray.map((node, index) => (
          <TreeNode id={treeId} index={index} key={`${treeId}-node-0-${index}`} level={0} {...node} />
        ))}
      </ul>
    </div>
  );
};

export default Tree;
