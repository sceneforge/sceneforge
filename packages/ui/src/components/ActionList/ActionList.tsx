import type { StyleXStyles } from "@stylexjs/stylex";
import type { Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { useCurrentId } from "../../hooks";
import { Orientation, Variant } from "../../types";
import { Action, type ActionProps } from "../Action";
import { Unlisted, UnlistedItem } from "../Unlisted";
import { View, type ViewProps } from "../View";

export type ActionListProps = {
  actions?: ActionProps[];
  actionsDense?: ActionProps["dense"];
  actionsScale?: ActionProps["scale"];
  actionsShape?: ActionProps["shape"];
  actionsStyle?: ActionProps["style"];
  anchor?: string;
  gap?: number;
  hidden?: ViewProps["hidden"];
  id?: string;
  label?: string;
  listStyle?: StyleXStyles;
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
  horizontal: {
    gridAutoFlow: "column",
  },
  item: {
    alignItems: "center",
    display: "grid",
    gridAutoFlow: "column",
    justifyContent: "stretch",
  },
  list: {
    height: "100%",
    justifyContent: "stretch",
    width: "100%",
  },
});

const ActionList = ({
  actions,
  actionsDense,
  actionsScale,
  actionsShape,
  actionsStyle,
  anchor,
  gap,
  hidden,
  id,
  label,
  listStyle,
  margin,
  orientation = Orientation.Vertical,
  padding = 0.25,
  popover,
  ref,
  style,
  toggleId,
  variant,
}: ActionListProps) => {
  const currentId = useCurrentId(id);

  if (!actions || actions.length === 0) return null;

  return (
    <View
      anchor={anchor}
      aria-label={label}
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
      {actions && actions.length > 0 && (
        <Unlisted
          gap={gap}
          id={`${currentId}-list`}
          orientation={orientation}
          role="presentation"
          style={[
            styles.list,
            listStyle,
          ]}
        >
          {actions.map((actionProps, index) => (
            <UnlistedItem
              key={`${currentId}-list-${index}`}
              role="presentation"
              style={styles.item}
            >
              <Action
                dense={actionsDense}
                listOrientation={orientation}
                role="menuitem"
                scale={actionsScale}
                shape={actionsShape}
                style={[
                  styles.action,
                  actionsStyle,
                ]}
                variant={variant}
                {...actionProps}
              />
            </UnlistedItem>
          ))}
        </Unlisted>
      )}
    </View>
  );
};

export default ActionList;
