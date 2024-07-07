import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";

import { Orientation } from "../../types";
import { View } from "../View";
import { currentColor } from "../tokens.stylex";

export type DividerProps = {
  dense?: boolean;
  label?: string;
  margin?: {
    end?: number;
    start?: number;
  } | number;
  orientation?: Orientation;
  scale?: boolean;
  style?: StyleXStyles;
};

const styles = stylex.create({
  container: {
    color: currentColor.alpha25,
    fontSize: "smaller",
    fontStretch: "semi-condensed",
    textOverflow: "ellipsis",
    textWrap: "nowrap",
    touchAction: "none",
    userSelect: "none",
  },
  horizontal: {
    borderBlockStartColor: currentColor.alpha50,
    borderBlockStartStyle: "solid",
    borderBlockStartWidth: "0.0625rem",
    borderInlineStartColor: null,
    borderInlineStartStyle: null,
    borderInlineStartWidth: null,
    height: {
      ":empty": 0,
      "default": null,
    },
  },
  vertical: {
    borderBlockStartColor: null,
    borderBlockStartStyle: null,
    borderBlockStartWidth: null,
    borderInlineStartColor: currentColor.alpha50,
    borderInlineStartStyle: "solid",
    borderInlineStartWidth: "0.0625rem",
    width: {
      ":empty": 1,
      "default": null,
    },
  },
});

const Divider = ({
  label,
  margin = 0,
  orientation = Orientation.Horizontal,
  style,
}: DividerProps) => {
  return (
    <View
      aria-orientation={orientation === Orientation.Vertical ? "vertical" : "horizontal"}
      margin={
        orientation === Orientation.Vertical
          ? {
            inline: typeof margin === "number" ? margin : undefined,
            inlineEnd: typeof margin === "object" && "end" in margin ? margin.end : undefined,
            inlineStart: typeof margin === "object" && "start" in margin ? margin.start : undefined,
          }
          : {
            block: typeof margin === "number" ? margin : undefined,
            blockEnd: typeof margin === "object" && "end" in margin ? margin.end : undefined,
            blockStart: typeof margin === "object" && "start" in margin ? margin.start : undefined,
          }
      }
      padding={{
        inline: orientation === Orientation.Horizontal ? 0.75 : 0,
      }}
      role="separator"
      style={[
        styles.container,
        orientation === Orientation.Vertical
          ? styles.vertical
          : styles.horizontal,
        style,
      ]}
    >
      {label && (<span role="presentation">{label}</span>)}
    </View>
  );
};

export default Divider;
