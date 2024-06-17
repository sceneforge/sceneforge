import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import type { TreeNodeProps } from "./TreeNode";

export type UseTreeProps = {
  nodes?: Omit<TreeNodeProps, "treeId" | "level" | "index">[] | (() => Omit<TreeNodeProps, "treeId" | "level" | "index">[]);
  onClick?: MouseEventHandler<HTMLButtonElement>;
  initialExpanded?: boolean;
};

export const useTree = ({ initialExpanded = false, nodes, onClick }: UseTreeProps) => {
  const [expanded, setExpanded] = useState(initialExpanded);

  const nodesArray = useMemo(() => {
    if (Array.isArray(nodes)) {
      return nodes;
    } else if (typeof nodes === "function") {
      return nodes();
    } else {
      return [];
    }
  }, [nodes]);

  const hasNodes = useMemo(() => nodesArray.length > 0, [nodesArray]);

  const toggleExpand = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const handleNodeClick: MouseEventHandler<HTMLButtonElement> = useCallback((ev) => {
    if (!expanded) {
      toggleExpand();
    }
    if (onClick) {
      return onClick(ev);
    }
  }, [expanded, onClick]);

  return {
    expanded,
    toggleExpand,
    handleNodeClick,
    hasNodes,
    nodesArray,
  }
}