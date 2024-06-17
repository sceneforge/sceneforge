import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { Ref, PropsWithChildren } from "react";
import { Orientation, Position, Variant } from "../../types";
import { backgroundColor, color } from "../tokens.stylex";
import { View } from "../View";

export type DrawerProps = PropsWithChildren<{
  id?: string;
  label?: string;
  variant?: Variant;
  orientation?: Orientation;
  position?: Position;
  size?: number;
  resizable?: boolean;
  ref?: Ref<HTMLDivElement>;
  style?: StyleXStyles;
}>;

const styles = stylex.create({
  container: {
    flexGrow: 1,
    display: "block",
    position: "absolute",
    width: "100%",
    height: "100%",
    insetBlockStart: 0,
    insetInlineStart: 0,
    pointerEvents: "none",
    overflow: "hidden",
    backgroundColor: "transparent",
    color: "inherit",
    padding: 0,
    margin: 0,
  },
  innerContainer: {
    position: "absolute",
    pointerEvents: "auto",
    overflow: "hidden",
  },
  resizableGutter: {
    "::after": {
      content: "''",
      display: "block",
      position: "absolute",
      opacity: 0.5,
      backgroundColor: backgroundColor.alpha50,
    },
  },
  resizableGutterDynamic: (orientation: Orientation, position: Position, size: number) => ({
    insetBlockStart: orientation === Orientation.Horizontal ? position === Position.Start ? 0 : null : 0,
    insetBlockEnd: orientation === Orientation.Horizontal ? position === Position.End ? 0 : null : null,
    insetInlineStart: orientation === Orientation.Vertical ? position === Position.Start ? 0 : null : 0,
    insetInlineEnd: orientation === Orientation.Vertical ? position === Position.End ? 0 : null : null,
    width: orientation === Orientation.Horizontal ? "100%" : `${size}%`,
    height: orientation === Orientation.Vertical ? "100%" : `${size}%`,
    "::after": {
      cursor: orientation === Orientation.Horizontal ? "row-resize" : "col-resize",
      width: orientation === Orientation.Horizontal ? "100%" : `0.25rem`,
      height: orientation === Orientation.Vertical ? "100%" : `0.25rem`,
      insetBlockStart: orientation === Orientation.Horizontal ? position === Position.End ? 0 : null : 0,
      insetBlockEnd: orientation === Orientation.Horizontal ? position === Position.Start ? 0 : null : null,
      insetInlineStart: orientation === Orientation.Vertical ? position === Position.End ? 0 : null : 0,
      insetInlineEnd: orientation === Orientation.Vertical ? position === Position.Start ? 0 : null : null,
    }
  }),
  variantColor: (background: keyof typeof color, text: keyof typeof color) => ({
    backgroundColor: color[background],
    color: color[text]
  }),
});

const Drawer = ({
  id,
  label,
  variant,
  orientation = Orientation.Horizontal,
  position = Position.End,
  size = 48,
  resizable = false,
  children,
  ref,
  style,
}: DrawerProps) => {
  return (
    <div ref={ref}
      id={id}
      aria-label={label}
      {...stylex.props(styles.container, style)}
    >
      <View
        variant={variant}
        style={[
          styles.innerContainer,
          resizable && [
            styles.resizableGutter,
            styles.resizableGutterDynamic(orientation, position, size)
          ],
        ]}
      >
        {children}
      </View>
    </div>
  );
};

export default Drawer;
