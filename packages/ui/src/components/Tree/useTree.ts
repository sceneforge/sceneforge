import { MouseEventHandler, useCallback, useMemo, useState } from "react";

import type { TreeNodeProps } from "./TreeNode";

export type UseTreeProps = {
  initialExpanded?: boolean;
  nodes?: (() => Omit<TreeNodeProps, "index" | "level" | "treeId">[]) | Omit<TreeNodeProps, "index" | "level" | "treeId">[];
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const useTree = ({
  initialExpanded = false,
  nodes,
  onClick,
}: UseTreeProps) => {
  const [expanded, setExpanded] = useState(initialExpanded);

  const nodesArray = useMemo(() => {
    if (Array.isArray(nodes)) {
      return nodes;
    }
    else if (typeof nodes === "function") {
      return nodes();
    }
    else {
      return [];
    }
  }, [nodes]);

  const hasNodes = useMemo(() => nodesArray.length > 0, [nodesArray]);

  const toggleExpand = useCallback(() => {
    setExpanded(previous => !previous);
  }, []);

  const handleNodeClick: MouseEventHandler<
    HTMLButtonElement
  > = useCallback((event) => {
    if (!expanded) {
      toggleExpand();
    }
    if (onClick) {
      return onClick(event);
    }
  }, [expanded, onClick, toggleExpand]);

  return {
    expanded,
    handleNodeClick,
    hasNodes,
    nodesArray,
    toggleExpand,
  };
};
