import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { type AllHTMLAttributes } from "react";
import { Variant } from "../../types";
import { color } from "../tokens.stylex";

export type ViewProps = Omit<AllHTMLAttributes<HTMLDivElement>, "style" | "className"> & {
  variant?: Variant;
  style?: StyleXStyles;
}

const styles = stylex.create({
  container: {
    display: "block",
    margin: 0,
    padding: 0,
    backgroundColor: "transparent",
    color: "inherit",
    width: "100%",
    height: "100%",
  },
  variantColor: (variant: keyof typeof color, text: keyof typeof color) => ({
    backgroundColor: color[variant],
    color: color[text],
  })
});

const View = ({
  variant,
  style,
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
        style
      )}
    />
  );
}

export default View;