import * as stylex from "@stylexjs/stylex";
import { type HTMLAttributes, createElement } from "react";

import { color } from "../tokens.stylex";

export type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  padding?: number;
  paddingBlock?: number;
  paddingBlockEnd?: number;
  paddingBlockStart?: number;
  paddingInline?: number;
  paddingInlineEnd?: number;
  paddingInlineStart?: number;
  shadow?: boolean;
  style?: stylex.StyleXStyles;
  textAlign?: "center" | "end" | "start";
} & Omit<HTMLAttributes<HTMLHeadingElement>, "className" | "style">;

const styles = stylex.create({
  container: {
    display: "block",
  },
  paddingBlockEnd: (value: number) => ({
    paddingBlockEnd: value > 0 ? `${value}rem` : undefined,
  }),
  paddingBlockStart: (value: number) => ({
    paddingBlockStart: value > 0 ? `${value}rem` : undefined,
  }),
  paddingInlineEnd: (value: number) => ({
    paddingInlineEnd: value > 0 ? `${value}rem` : undefined,
  }),
  paddingInlineStart: (value: number) => ({
    paddingInlineStart: value > 0 ? `${value}rem` : undefined,
  }),
  shadow: {
    textShadow: `1px 1px 3px ${color.foreground}, 2px 4px 7px ${color.foreground}`,
  },
  textAlign: (value?: "center" | "end" | "start") => ({
    textAlign: value || "start",
  }),
});

const Heading = ({
  level,
  padding = 0,
  paddingBlock,
  paddingBlockEnd,
  paddingBlockStart,
  paddingInline,
  paddingInlineEnd,
  paddingInlineStart,
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
      typeof padding === "number" && [
        styles.paddingBlockEnd(padding),
        styles.paddingBlockStart(padding),
        styles.paddingInlineEnd(padding),
        styles.paddingInlineStart(padding),
      ],
      typeof paddingBlock === "number" && [
        styles.paddingBlockEnd(paddingBlock),
        styles.paddingBlockStart(paddingBlock),
      ],
      typeof paddingBlockEnd === "number" && styles.paddingBlockEnd(paddingBlockEnd),
      typeof paddingBlockStart === "number" && styles.paddingBlockStart(paddingBlockStart),
      typeof paddingInline === "number" && [
        styles.paddingInlineEnd(paddingInline),
        styles.paddingInlineStart(paddingInline),
      ],
      typeof paddingInlineEnd === "number" && styles.paddingInlineEnd(paddingInlineEnd),
      typeof paddingInlineStart === "number" && styles.paddingInlineStart(paddingInlineStart),
      style
    ),
    ...props,
  });

export default Heading;
