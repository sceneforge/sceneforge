import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type Ref, useId } from "react";

import { Orientation, Variant } from "../../types";
import { Action, type ActionProps } from "../Action";
import { View, ViewProps } from "../View";

export type ActionListProps = {
  actions?: ActionProps[];
  actionsDense?: ActionProps["dense"];
  actionsScale?: ActionProps["scale"];
  actionsStyle?: ActionProps["style"];
  anchor?: string;
  gap?: number;
  hidden?: ViewProps["hidden"];
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
    flexShrink: 1,
    height: null,
    width: null,
  },
  gap: (value?: number) => ({
    gap: value ? `${value}rem` : 0,
  }),
  horizontal: {
    gridAutoFlow: "column",
  },
  item: {
    alignItems: "center",
    display: "grid",
    gridAutoFlow: "column",
    justifyContent: "center",
  },
  list: {
    display: "grid",
    gridAutoFlow: "row",
    height: "100%",
    justifyContent: "stretch",
    listStyleType: "none",
    margin: 0,
    padding: 0,
    width: "100%",
  },
});

const ActionList = ({
  actions,
  actionsDense,
  actionsScale,
  actionsStyle,
  anchor,
  gap,
  hidden,
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
      hidden={hidden}
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
          styles.gap(gap),
          orientation === Orientation.Horizontal && styles.horizontal
        )}
      >
        {actions && actions.length > 0 && actions.map((actionProps, index) => (
          <li
            key={`${currentId}-action-${index}`}
            role="presentation"
            {...stylex.props(styles.item)}
          >
            <Action
              dense={actionsDense}
              listOrientation={orientation}
              role="menuitem"
              scale={actionsScale}
              style={[
                styles.action,
                actionsStyle,
              ]}
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
