import * as stylex from "@stylexjs/stylex";
import { type MouseEventHandler, useId } from "react";

import { IconEnum } from "../../types";
import { Action, type ActionProps } from "../Action";
import { Icon } from "../Icon";
import { backgroundColor } from "../tokens.stylex";
import { useTree } from "./useTree";

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
  actionItem: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    height: "1rem",
    margin: 0,
    padding: 0,
    width: "min-content",
  },
  actions: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexShrink: 1,
    gap: "0.25rem",
    justifyContent: "flex-end",
  },
  container: {
    listStyle: "none",
    margin: 0,
  },
  expandCollapseButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    flexShrink: 1,
    height: "1rem",
    margin: 0,
    padding: 0,
    width: "1rem",
  },
  expandCollapseButtonIcon: (expanded: boolean) => ({
    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
  }),
  node: {
    ":focus-within": {
      backgroundColor: backgroundColor.alpha20,
    },
    ":hover": {
      backgroundColor: backgroundColor.alpha15,
    },
    "alignItems": "center",
    "borderRadius": "0.5rem",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "stretch",
  },
  nodeButton: {
    cursor: "pointer",
  },
  nodeLabel: {
    alignItems: "center",
    backgroundColor: "transparent",
    border: "none",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    gap: "0.25rem",
    justifyContent: "flex-start",
    margin: 0,
    padding: 0,
  },
  nodeLabelLeaf: (hasNodes: boolean) => ({
    paddingInlineStart: hasNodes ? "0" : "1rem",
  }),
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
  const generatedId = useId();
  const treeId = id || generatedId;

  const {
    expanded,
    handleNodeClick,
    hasNodes,
    nodesArray,
    toggleExpand,
  } = useTree({ initialExpanded, nodes, onClick });

  return (
    <li id={`${treeId}-node-${level}-${index}`} {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.node)}>
        {hasNodes && (
          <button
            onClick={toggleExpand}
            {...stylex.props(styles.expandCollapseButton)}
          >
            <Icon
              icon={IconEnum.ExpandMore}
              style={[styles.expandCollapseButtonIcon(expanded)]}
            />
          </button>
        )}
        {onClick
          ? (
            <button
              onClick={handleNodeClick}
              {...stylex.props(
                styles.nodeLabel,
                styles.nodeButton,
                styles.nodeLabelLeaf(hasNodes)
              )}
            >
              {icon && <Icon icon={icon} />}
              {label}
            </button>
          )
          : (
            <span
              {...stylex.props(
                styles.nodeLabel,
                styles.nodeLabelLeaf(hasNodes)
              )}
            >
              {icon && <Icon icon={icon} />}
              {label}
            </span>
          )}
        {actions && actions.length > 0 && (
          <div {...stylex.props(styles.actions)}>
            {actions.map(action => (
              <Action {...action} style={styles.actionItem} />
            ))}
          </div>
        )}
      </div>
      {hasNodes && expanded && (
        <ul id={`${treeId}-node-${level + 1}`} {...stylex.props(styles.nodes)}>
          {nodesArray.map((node, nodeIndex) => (
            <TreeNode
              id={treeId}
              index={nodeIndex}
              key={`${treeId}-node-${level + 1}-${nodeIndex}`}
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
