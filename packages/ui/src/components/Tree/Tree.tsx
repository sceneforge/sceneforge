import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { lazy, useId, useMemo } from "react";
import type { TreeNodeProps } from "./TreeNode";

const TreeNode = lazy(() => import("./TreeNode"));

export type TreeProps = {
  id?: string;
  nodes: Omit<TreeNodeProps, "treeId" | "level" | "index">[] | (() => Omit<TreeNodeProps, "treeId" | "level" | "index">[]);
  style: StyleXStyles;
};

const styles = stylex.create({
  container: {
    padding: 0,
    margin: 0,
    listStyle: "none",
  }
});

const Tree = ({ id, style, nodes }: TreeProps) => {
  const generatedId = useId();
  const treeId = id || generatedId

  const nodesArray = useMemo(() => Array.isArray(nodes) ? nodes : nodes(), [nodes]);

  return (
    <div id={treeId} {...stylex.props(style)}>
      <ul id={`${treeId}-node-0`} {...stylex.props(styles.container)}>
        {nodesArray.map((node, index) => (
          <TreeNode key={`${treeId}-node-0-${index}`} id={treeId} level={0} index={index} {...node} />
        ))}
      </ul>
    </div>
  );
};

export default Tree;
