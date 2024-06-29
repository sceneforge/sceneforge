import * as stylex from "@stylexjs/stylex";
import { type HTMLAttributes, createElement } from "react";

import { type SpacerStyleProps, color, marginStyle, paddingStyle } from "../tokens.stylex";

export type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  margin?: SpacerStyleProps;
  padding?: SpacerStyleProps;
  shadow?: boolean;
  style?: stylex.StyleXStyles;
  textAlign?: "center" | "end" | "start";
} & Omit<HTMLAttributes<HTMLHeadingElement>, "className" | "style">;

const styles = stylex.create({
  container: {
    display: "block",
  },
  shadow: {
    textShadow: `1px 1px 3px ${color.foreground}, 2px 4px 7px ${color.foreground}`,
  },
  textAlign: (value?: "center" | "end" | "start") => ({
    textAlign: value || "start",
  }),
});

const Heading = ({
  level,
  margin = 0,
  padding = 0,
  shadow,
  style,
  textAlign = "start",
  ...props
}: HeadingProps) =>
  createElement(`h${level}`, {
    ...stylex.props(
      styles.container,
      shadow && styles.shadow,
      styles.textAlign(textAlign),
      ...(margin === undefined ? [] : marginStyle(margin)),
      ...(padding === undefined ? [] : paddingStyle(padding)),
      style
    ),
    ...props,
  });

export default Heading;
