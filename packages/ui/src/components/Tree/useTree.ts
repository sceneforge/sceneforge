import { type MouseEventHandler, useCallback, useMemo, useState } from "react";

import type { TreeNodeProps } from "./TreeNode";

import { useCurrentId } from "../../hooks";

export type UseTreeProps = {
  id?: string;
  initialExpanded?: boolean;
  nodes?: (() => Omit<TreeNodeProps, "index" | "level" | "treeId">[]) | Omit<TreeNodeProps, "index" | "level" | "treeId">[];
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const useTree = ({
  id,
  initialExpanded = false,
  nodes,
  onClick,
}: UseTreeProps) => {
  const currentId = useCurrentId(id);

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
    currentId,
    expanded,
    handleNodeClick,
    hasNodes,
    nodesArray,
    toggleExpand,
  };
};
