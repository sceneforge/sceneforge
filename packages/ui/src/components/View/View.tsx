import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type AllHTMLAttributes } from "react";

import { Variant } from "../../types";
import { color } from "../tokens.stylex";

export type ViewProps = {
  margin?: number;
  padding?: number;
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
  spacing: (padding: number, margin: number) => ({
    margin,
    padding,
  }),
  variantColor: (variant: keyof typeof color, text: keyof typeof color) => ({
    backgroundColor: color[variant],
    color: color[text],
  }),
});

const View = ({
  margin = 0,
  padding = 0,
  style,
  variant,
  ...props
}: ViewProps) => {
  return (
    <div
      {...props}
      {...stylex.props(
        styles.container,
        variant === Variant.Accent && styles.variantColor("accent", "accentText"),
        variant === Variant.Default && styles.variantColor("primary", "primaryText"),
        variant === Variant.Danger && styles.variantColor("danger", "dangerText"),
        variant === Variant.Info && styles.variantColor("info", "infoText"),
        variant === Variant.Success && styles.variantColor("success", "successText"),
        variant === Variant.Warning && styles.variantColor("warning", "warningText"),
        styles.spacing(padding, margin),
        style
      )}
    />
  );
};

export default View;
