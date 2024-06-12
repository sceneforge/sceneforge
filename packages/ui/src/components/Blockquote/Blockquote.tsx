import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { AllHTMLAttributes } from "react";
import { Variant } from "../../types";
import { color } from "../tokens.stylex";

export type BlockquoteProps = Omit<AllHTMLAttributes<HTMLQuoteElement>, "style" | "className"> & {
  variant?: Variant;
  style?: StyleXStyles;
};

const styles = stylex.create({
  container: {
    padding: "0.5rem",
    paddingInlineStart: "1rem",
    borderInlineStartStyle: "solid",
    borderInlineStartWidth: "0.325rem",
    color: color.foreground,
    borderInlineStartColor: color.foreground,
  },
  variantColor: (variant: keyof typeof color) => ({
    backgroundColor: `color-mix(in srgb, ${String(color[variant])} 15%, ${color.background})`,
    borderInlineStartColor: variant in color ? color[variant] : color.foreground,
  }),
});

const Blockquote = ({
  children,
  variant,
  style,
  ...props
}: BlockquoteProps) => {
  return (
    <blockquote
      {...props}
      {...stylex.props(
        styles.container,
        styles.variantColor("foreground"),
        variant === Variant.Accent && styles.variantColor("accent"),
        variant === Variant.Default && styles.variantColor("primary"),
        variant === Variant.Danger && styles.variantColor("danger"),
        variant === Variant.Info && styles.variantColor("info"),
        variant === Variant.Success && styles.variantColor("success"),
        variant === Variant.Warning && styles.variantColor("warning"),
        style
      )}
    >
      {children}
    </blockquote>
  );
};

export default Blockquote;
