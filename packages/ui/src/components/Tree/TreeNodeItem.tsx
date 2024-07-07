import * as stylex from "@stylexjs/stylex";
import { MouseEventHandler, lazy } from "react";

import { IconEnum, Orientation } from "../../types";
import { ActionList, type ActionListProps } from "../ActionList";
import { IconButton } from "../IconButton";
import { View } from "../View";
import { backgroundColor } from "../tokens.stylex";

const TreeNodeLabel = lazy(() => import("./TreeNodeLabel"));

export type TreeNodeItemProps = {
  actions?: ActionListProps["actions"];
  expanded?: boolean;
  hasNodes?: boolean;
  icon?: IconEnum;
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  toggleExpand?: () => void;
};

const styles = stylex.create({
  actionItem: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    height: "1rem",
    width: "min-content",
  },
  actions: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexShrink: 1,
    gap: "0.25rem",
    height: null,
    justifyContent: "flex-end",
    width: null,
  },
  container: {
    alignItems: "center",
    backgroundColor: {
      ":focus-within": backgroundColor.alpha20,
      ":hover": backgroundColor.alpha15,
      "default": "transparent",
    },
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "stretch",
  },
  expandCollapseButton: {
    backgroundColor: "transparent",
    flexShrink: 1,
    transition: "rotate 0.2s",
  },
  expandCollapseButtonPosition: (expanded: boolean) => ({
    rotate: expanded ? "180deg" : "0deg",
  }),
});

const TreeNodeItem = ({
  actions,
  expanded = false,
  hasNodes,
  icon,
  label,
  onClick,
  toggleExpand,
}: TreeNodeItemProps) => {
  return (
    <View style={styles.container}>
      {hasNodes && (
        <IconButton
          icon={IconEnum.ExpandMore}
          onClick={toggleExpand}
          padding={0.125}
          style={[
            styles.expandCollapseButton,
            styles.expandCollapseButtonPosition(expanded),
          ]}
        />
      )}
      <TreeNodeLabel
        hasNodes={hasNodes}
        icon={icon}
        label={label}
        onClick={onClick}
      />
      <ActionList
        actions={actions}
        actionsStyle={styles.actionItem}
        orientation={Orientation.Horizontal}
      />
    </View>
  );
};

export default TreeNodeItem;
