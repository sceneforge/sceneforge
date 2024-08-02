import * as stylex from "@stylexjs/stylex";
import { createElement, type HTMLAttributes, type Ref } from "react";

import type { Variant } from "../../types";

import { textColorStyles, textShadowStyles } from "../../colors.stylex";
import { marginStyle, paddingStyle, type SpacerStyleProps } from "../tokens.stylex";

export type HeadingProps = {
  hidden?: boolean;
  inverted?: boolean;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  margin?: SpacerStyleProps;
  padding?: SpacerStyleProps;
  ref?: Ref<HTMLHeadingElement>;
  shadow?: boolean;
  style?: stylex.StyleXStyles;
  textAlign?: "center" | "end" | "start";
  variant?: Variant;
} & Omit<HTMLAttributes<HTMLHeadingElement>, "className" | "style">;

const styles = stylex.create({
  container: {
    color: "inherit",
    display: "block",
  },
  hidden: {
    display: "none",
  },
  textAlign: (value?: "center" | "end" | "start") => ({
    textAlign: value || "start",
  }),
});

const Heading = ({
  hidden,
  inverted,
  level,
  margin = 0,
  padding = 0,
  ref,
  shadow,
  style,
  textAlign = "start",
  variant,
  ...props
}: HeadingProps) =>
  createElement(`h${level}`, {
    ref,
    ...stylex.props(
      styles.container,
      inverted && textColorStyles.default,
      !inverted && shadow && [
        textColorStyles.default,
        textShadowStyles.default(1),
      ],
      inverted && shadow && [
        textColorStyles.defaultInverted,
        textShadowStyles.defaultInverted(1),
      ],
      (variant && !inverted && !shadow) && textColorStyles.variant(variant),
      (variant && !inverted && shadow) && [
        textColorStyles.inverted(variant),
        textShadowStyles.variant(variant, 1),
      ],
      (variant && inverted && !shadow) && textColorStyles.inverted(variant),
      (variant && inverted && shadow) && [
        textColorStyles.variant(variant),
        textShadowStyles.inverted(variant, 1),
      ],
      styles.textAlign(textAlign),
      ...(margin === undefined ? [] : marginStyle(margin)),
      ...(padding === undefined ? [] : paddingStyle(padding)),
      style,
      hidden && styles.hidden
    ),
    ...props,
  });

export default Heading;
