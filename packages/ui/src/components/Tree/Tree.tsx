import * as stylex from "@stylexjs/stylex";
import { lazy, useMemo } from "react";

import type { TreeNodeProps } from "./TreeNode";

import { useCurrentId } from "../../hooks";
import { Orientation } from "../../types";
import { Unlisted } from "../Unlisted";
import { View, type ViewProps } from "../View";

const TreeNode = lazy(() => import("./TreeNode"));

export type TreeProps = {
  id?: string;
  nodes: (() => Omit<TreeNodeProps, "index" | "level" | "treeId">[]) | Omit<TreeNodeProps, "index" | "level" | "treeId">[];
  style?: ViewProps["style"];
};

const styles = stylex.create({
  container: {
    alignContent: "start",
    height: null,
    width: null,
  },
});

const Tree = ({ id, nodes, style }: TreeProps) => {
  const currentId = useCurrentId(id);

  const nodesArray = useMemo(() => {
    return Array.isArray(nodes) ? nodes : nodes();
  }, [nodes]);

  return (
    <View
      id={currentId}
      scrollable
      style={[
        style,
      ]}
    >
      <Unlisted
        id={`${currentId}-node-0`}
        margin={0}
        orientation={Orientation.Vertical}
        padding={0}
        style={styles.container}
      >
        {nodesArray.map((node, index) => (
          <TreeNode
            id={currentId}
            index={index}
            key={`${currentId}-node-0-${index}`}
            level={0}
            {...node}
          />
        ))}
      </Unlisted>
    </View>
  );
};

export default Tree;
