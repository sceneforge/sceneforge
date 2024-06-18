import type { StyleXStyles } from "@stylexjs/stylex";
import type { PropsWithChildren, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { Orientation, Position, Variant } from "../../types";
import { View } from "../View";
import { backgroundColor, color } from "../tokens.stylex";

export type DrawerProps = PropsWithChildren<{
  id?: string;
  label?: string;
  orientation?: Orientation;
  position?: Position;
  ref?: Ref<HTMLDivElement>;
  resizable?: boolean;
  size?: number;
  style?: StyleXStyles;
  variant?: Variant;
}>;

const styles = stylex.create({
  container: {
    backgroundColor: "transparent",
    color: "inherit",
    display: "block",
    flexGrow: 1,
    height: "100%",
    insetBlockStart: 0,
    insetInlineStart: 0,
    margin: 0,
    overflow: "hidden",
    padding: 0,
    pointerEvents: "none",
    position: "absolute",
    width: "100%",
  },
  innerContainer: {
    overflow: "hidden",
    pointerEvents: "auto",
    position: "absolute",
  },
  resizableGutter: {
    "::after": {
      backgroundColor: backgroundColor.alpha50,
      content: "''",
      display: "block",
      opacity: 0.5,
      position: "absolute",
    },
  },
  resizableGutterDynamic: (
    orientation: Orientation,
    position: Position,
    size: number
  ) => ({
    "::after": {
      cursor: orientation === Orientation.Horizontal ? "row-resize" : "col-resize",
      height: orientation === Orientation.Vertical ? "100%" : "0.25rem",
      insetBlockEnd: (
        orientation === Orientation.Horizontal
          ? (
            position === Position.Start
              ? 0
              : null
          )
          : null
      ),
      insetBlockStart: (
        orientation === Orientation.Horizontal
          ? (
            position === Position.End
              ? 0
              : null
          )
          : 0
      ),
      insetInlineEnd: (
        orientation === Orientation.Vertical
          ? (
            position === Position.Start
              ? 0
              : null
          )
          : null
      ),
      insetInlineStart: (
        orientation === Orientation.Vertical
          ? (
            position === Position.End
              ? 0
              : null
          )
          : 0
      ),
      width: orientation === Orientation.Horizontal ? "100%" : "0.25rem",
    },
    "height": orientation === Orientation.Vertical ? "100%" : `${size}%`,
    "insetBlockEnd": orientation === Orientation.Horizontal ? (position === Position.End ? 0 : null) : null,
    "insetBlockStart": orientation === Orientation.Horizontal ? (position === Position.Start ? 0 : null) : 0,
    "insetInlineEnd": orientation === Orientation.Vertical ? (position === Position.End ? 0 : null) : null,
    "insetInlineStart": orientation === Orientation.Vertical ? (position === Position.Start ? 0 : null) : 0,
    "width": orientation === Orientation.Horizontal ? "100%" : `${size}%`,
  }),
  variantColor: (background: keyof typeof color, text: keyof typeof color) => ({
    backgroundColor: color[background],
    color: color[text],
  }),
});

const Drawer = ({
  children,
  id,
  label,
  orientation = Orientation.Horizontal,
  position = Position.End,
  ref,
  resizable = false,
  size = 48,
  style,
  variant,
}: DrawerProps) => {
  return (
    <div
      aria-label={label}
      id={id}
      ref={ref}
      {...stylex.props(styles.container, style)}
    >
      <View
        style={[
          styles.innerContainer,
          resizable && [
            styles.resizableGutter,
            styles.resizableGutterDynamic(orientation, position, size),
          ],
        ]}
        variant={variant}
      >
        {children}
      </View>
    </div>
  );
};

export default Drawer;
