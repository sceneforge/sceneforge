import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type Ref, useId } from "react";

import { Orientation, Variant } from "../../types";
import { Action, type ActionProps } from "../Action";
import { View, ViewProps } from "../View";

export type ActionListProps = {
  actions?: ActionProps[];
  anchor?: string;
  id?: string;
  label?: string;
  margin?: ViewProps["margin"];
  orientation?: Orientation;
  padding?: ViewProps["padding"];
  popover?: "auto" | "manual";
  ref?: Ref<HTMLDivElement>;
  style?: StyleXStyles;
  toggleId?: string;
  variant?: Variant;
};

const styles = stylex.create({
  action: {
    textAlign: "start",
    width: "100%",
  },
  container: {
    alignItems: "center",
    display: null,
    height: null,
    width: null,
  },
  horizontal: {
    flexDirection: "row",
  },
  item: {
    flexShrink: 1,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
});

const ActionList = ({
  actions,
  anchor,
  id,
  margin,
  orientation = Orientation.Vertical,
  padding = 0.25,
  popover,
  ref,
  style,
  toggleId,
  variant,
}: ActionListProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;
  if (!actions || actions.length === 0) return null;

  return (
    <View
      anchor={anchor}
      aria-labelledby={popover ? toggleId : undefined}
      id={currentId}
      margin={margin}
      padding={padding}
      popover={popover}
      ref={ref}
      role={popover ? "menu" : undefined}
      style={[styles.container, style]}
      variant={variant}
    >
      <ul
        role="presentation"
        {...stylex.props(
          styles.list,
          orientation === Orientation.Horizontal && styles.horizontal
        )}
      >
        {actions.map((actionProps, index) => (
          <li
            key={`${currentId}-action-${index}`}
            role="presentation"
            {...stylex.props(styles.item)}
          >
            <Action
              role="menuitem"
              style={styles.action}
              variant={variant}
              {...actionProps}
            />
          </li>
        ))}
      </ul>
    </View>
  );
};

export default ActionList;
