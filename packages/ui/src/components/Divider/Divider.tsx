import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";

import { Orientation } from "../../types";

export type DividerProps = {
  label?: string;
  orientation?: Orientation;
  scale?: boolean;
  style?: StyleXStyles;
};

const styles = stylex.create({
  container: {
    borderBlockStartColor: "color-mix(in srgb, currentColor 50%, transparent)",
    borderBlockStartStyle: "solid",
    borderBlockStartWidth: 1,
    color: "color-mix(in srgb, currentColor 25%, transparent)",
    display: "block",
    fontSize: "smaller",
    fontStretch: "semi-condensed",
    margin: 0,
    overflow: "hidden",
    padding: "0 0.75rem",
    textOverflow: "ellipsis",
    textSizeAdjust: "0.45rem",
    textWrap: "nowrap",
    touchAction: "none",
    userSelect: "none",
  },
  horizontal: {
    height: {
      ":empty": 0,
      "default": null,
    },
  },
  vertical: {
    width: {
      ":empty": 0,
      "default": null,
    },
  },
});

const Divider = ({
  label,
  orientation = Orientation.Horizontal,
  style,
}: DividerProps) => {
  return (
    <div
      aria-orientation={orientation === Orientation.Vertical ? "vertical" : "horizontal"}
      role="separator"
      {...stylex.props(
        styles.container,
        orientation === Orientation.Vertical
          ? styles.vertical
          : styles.horizontal,
        style
      )}
    >
      {label && (<span role="presentation">{label}</span>)}
    </div>
  );
};

export default Divider;
