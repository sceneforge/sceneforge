import type { StyleXStyles } from "@stylexjs/stylex";
import type { PropsWithChildren, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { isBlockEnd, isBlockStart, isInlineEnd, isInlineStart } from "../../helpers";
import { Orientation, Position, Variant } from "../../types";
import { View } from "../View";
import { backgroundColor, currentColor } from "../tokens.stylex";

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
    flexGrow: 1,
    inset: 0,
    pointerEvents: "none",
    position: "absolute",
    touchAction: "none",
  },
  innerContainer: {
    pointerEvents: "auto",
    position: "absolute",
  },
  noVariantInnerContainer: {
    backgroundColor: currentColor.alpha05,
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
    <View
      aria-label={label}
      id={id}
      ref={ref}
      style={[
        styles.container, style,
      ]}
    >
      <View
        padding={{
          blockEnd: isBlockStart(orientation, position) ? 0.25 : undefined,
          blockStart: isBlockEnd(orientation, position) ? 0.25 : undefined,
          inlineEnd: isInlineStart(orientation, position) ? 0.25 : undefined,
          inlineStart: isInlineEnd(orientation, position) ? 0.25 : undefined,
        }}
        style={[
          styles.innerContainer,
          resizable && [
            styles.resizableGutter,
            styles.resizableGutterDynamic(orientation, position, size),
          ],
          !variant && styles.noVariantInnerContainer,
        ]}
        variant={variant}
      >
        {children}
      </View>
    </View>
  );
};

export default Drawer;
