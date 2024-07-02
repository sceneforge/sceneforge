import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";

import { Orientation } from "../../types";
import { View } from "../View";
import { currentColor } from "../tokens.stylex";

export type DividerProps = {
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
    borderBlockStartColor: currentColor.alpha50,
    borderBlockStartStyle: "solid",
    borderBlockStartWidth: "0.0625rem",
    color: currentColor.alpha25,
    fontSize: "smaller",
    fontStretch: "semi-condensed",
    textOverflow: "ellipsis",
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
        block: 0,
        inline: 0.75,
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
