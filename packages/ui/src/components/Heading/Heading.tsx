import * as stylex from "@stylexjs/stylex";
import { type HTMLAttributes, type Ref, createElement } from "react";

import { foregroundColor } from "../../colors.stylex";
import { type SpacerStyleProps, marginStyle, paddingStyle } from "../tokens.stylex";

export type HeadingProps = {
  hidden?: boolean;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  margin?: SpacerStyleProps;
  padding?: SpacerStyleProps;
  ref?: Ref<HTMLHeadingElement>;
  shadow?: boolean;
  style?: stylex.StyleXStyles;
  textAlign?: "center" | "end" | "start";
} & Omit<HTMLAttributes<HTMLHeadingElement>, "className" | "style">;

const styles = stylex.create({
  container: {
    display: "block",
  },
  hidden: {
    display: "none",
  },
  shadow: {
    textShadow: `1px 1px 3px ${foregroundColor.default}, 2px 4px 7px ${foregroundColor.default}`,
  },
  textAlign: (value?: "center" | "end" | "start") => ({
    textAlign: value || "start",
  }),
});

const Heading = ({
  hidden,
  level,
  margin = 0,
  padding = 0,
  ref,
  shadow,
  style,
  textAlign = "start",
  ...props
}: HeadingProps) =>
  createElement(`h${level}`, {
    ref,
    ...stylex.props(
      styles.container,
      shadow && styles.shadow,
      styles.textAlign(textAlign),
      ...(margin === undefined ? [] : marginStyle(margin)),
      ...(padding === undefined ? [] : paddingStyle(padding)),
      style,
      hidden && styles.hidden
    ),
    ...props,
  });

export default Heading;
