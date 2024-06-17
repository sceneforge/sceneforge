import * as stylex from "@stylexjs/stylex";
import { type MouseEventHandler, useId } from "react";
import { IconEnum } from "../../types";
import { Action, type ActionProps } from "../Action";
import { Icon } from "../Icon";
import { useTree } from "./useTree";
import { backgroundColor } from "../tokens.stylex";

export type TreeNodeProps = {
  label?: string;
  id?: string;
  icon?: IconEnum;
  level?: number;
  index?: number;
  actions?: ActionProps[];
  nodes?: Omit<TreeNodeProps, "id" | "level" | "index">[] | (() => Omit<TreeNodeProps, "id" | "level" | "index">[]);
  expanded?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const styles = stylex.create({
  container: {
    margin: 0,
    listStyle: "none",
  },
  expandCollapseButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    margin: 0,
    flexShrink: 1,
    width: "1rem",
    height: "1rem",
  },
  expandCollapseButtonIcon: (expanded: boolean) => ({
    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
  }),
  node: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "stretch",
    borderRadius: "0.5rem",
    ":hover": {
      backgroundColor: backgroundColor.alpha15,
    },
    ":focus-within": {
      backgroundColor: backgroundColor.alpha20,
    }
  },
  nodeLabel: {
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "0.25rem",
    flexGrow: 1,
  },
  nodeButton: {
    cursor: "pointer",
  },
  nodeLabelLeaf: (hasNodes: boolean) => ({
    paddingInlineStart: hasNodes ? "0" : "1rem",
  }),
  nodes: {
    paddingBlock: 0,
    paddingInlineStart: "1rem",
    margin: 0,
    listStyle: "none",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexShrink: 1,
    gap: "0.25rem",
  },
  actionItem: {
    padding: 0,
    margin: 0,
    height: "1rem",
    width: "min-content",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
});

const TreeNode = ({ actions, icon, label, id, level = 0, index, onClick, nodes, expanded: initialExpanded = false }: TreeNodeProps) => {
  const generatedId = useId();
  const treeId = id || generatedId;
  const { hasNodes, expanded, nodesArray, toggleExpand, handleNodeClick } = useTree({ initialExpanded, nodes, onClick });

  return (
    <li id={`${treeId}-node-${level}-${index}`} {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.node)}>
        {hasNodes && (
          <button onClick={toggleExpand} {...stylex.props(styles.expandCollapseButton)}>
            <Icon icon={IconEnum.ExpandMore} style={[styles.expandCollapseButtonIcon(expanded)]} />
          </button>
        )}
        {onClick ? (
          <button onClick={handleNodeClick} {...stylex.props(styles.nodeLabel, styles.nodeButton, styles.nodeLabelLeaf(hasNodes))}>
            {icon && <Icon icon={icon} />}
            {label}
          </button>
        ) : (
          <span {...stylex.props(styles.nodeLabel, styles.nodeLabelLeaf(hasNodes))}>
            {icon && <Icon icon={icon} />}
            {label}
          </span>
        )}
        {actions && actions.length > 0 && (
          <div {...stylex.props(styles.actions)}>
            {actions.map((action) => (<Action {...action} style={styles.actionItem} />))}
          </div>
        )}
      </div>
      {hasNodes && expanded && (
        <ul id={`${treeId}-node-${level + 1}`} {...stylex.props(styles.nodes)}>
          {nodesArray.map((node, nodeIndex) => (
            <TreeNode
              key={`${treeId}-node-${level + 1}-${nodeIndex}`}
              id={treeId}
              level={level + 1}
              index={nodeIndex}
              {...node}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
