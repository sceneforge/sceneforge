import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type AllHTMLAttributes } from "react";

import { Variant } from "../../types";
import { backgroundTextColorVariantStyle } from "../tokens.stylex";

export type ViewProps = {
  margin?: number;
  marginBlock?: number;
  marginBlockEnd?: number;
  marginBlockStart?: number;
  marginInline?: number;
  marginInlineEnd?: number;
  marginInlineStart?: number;
  padding?: number;
  paddingBlock?: number;
  paddingBlockEnd?: number;
  paddingBlockStart?: number;
  paddingInline?: number;
  paddingInlineEnd?: number;
  paddingInlineStart?: number;
  style?: StyleXStyles;
  variant?: Variant;
} & Omit<AllHTMLAttributes<HTMLDivElement>, "className" | "style">;

const styles = stylex.create({
  container: {
    backgroundColor: "transparent",
    color: "inherit",
    display: "block",
    height: "100%",
    margin: 0,
    padding: 0,
    position: "relative",
    width: "100%",
  },
  marginBlockEnd: (value: number) => ({
    marginBlockEnd: value > 0 ? `${value}rem` : 0,
  }),
  marginBlockStart: (value: number) => ({
    marginBlockStart: value > 0 ? `${value}rem` : 0,
  }),
  marginInlineEnd: (value: number) => ({
    marginInlineEnd: value > 0 ? `${value}rem` : 0,
  }),
  marginInlineStart: (value: number) => ({
    marginInlineStart: value > 0 ? `${value}rem` : 0,
  }),
  paddingBlockEnd: (value: number) => ({
    paddingBlockEnd: value > 0 ? `${value}rem` : 0,
  }),
  paddingBlockStart: (value: number) => ({
    paddingBlockStart: value > 0 ? `${value}rem` : 0,
  }),
  paddingInlineEnd: (value: number) => ({
    paddingInlineEnd: value > 0 ? `${value}rem` : 0,
  }),
  paddingInlineStart: (value: number) => ({
    paddingInlineStart: value > 0 ? `${value}rem` : 0,
  }),
});

const View = ({
  margin = 0,
  marginBlock,
  marginBlockEnd,
  marginBlockStart,
  marginInline,
  marginInlineEnd,
  marginInlineStart,
  padding = 0,
  paddingBlock,
  paddingBlockEnd,
  paddingBlockStart,
  paddingInline,
  paddingInlineEnd,
  paddingInlineStart,
  style,
  variant,
  ...props
}: ViewProps) => {
  return (
    <div
      {...props}
      {...stylex.props(
        styles.container,
        ...backgroundTextColorVariantStyle(variant),
        typeof margin === "number" && [
          styles.marginBlockEnd(margin),
          styles.marginBlockStart(margin),
          styles.marginInlineEnd(margin),
          styles.marginInlineStart(margin),
        ],
        typeof marginBlock === "number" && [
          styles.marginBlockEnd(marginBlock),
          styles.marginBlockStart(marginBlock),
        ],
        typeof marginBlockEnd === "number" && styles.marginBlockEnd(marginBlockEnd),
        typeof marginBlockStart === "number" && styles.marginBlockStart(marginBlockStart),
        typeof marginInline === "number" && [
          styles.marginInlineEnd(marginInline),
          styles.marginInlineStart(marginInline),
        ],
        typeof marginInlineEnd === "number" && styles.marginInlineEnd(marginInlineEnd),
        typeof marginInlineStart === "number" && styles.marginInlineStart(marginInlineStart),
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
      )}
    />
  );
};

export default View;
