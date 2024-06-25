import type { StyleXStyles } from "@stylexjs/stylex";
import type { AllHTMLAttributes, RefObject } from "react";

import * as stylex from "@stylexjs/stylex";

import { Variant } from "../../types";
import { color } from "../tokens.stylex";

export type BlockquoteProps = {
  ref?: RefObject<HTMLQuoteElement>;
  style?: StyleXStyles;
  variant?: Variant;
} & Omit<AllHTMLAttributes<HTMLQuoteElement>, "className" | "style">;

const styles = stylex.create({
  colorVariant: (variant: keyof typeof color) => ({
    backgroundColor: `color-mix(in srgb, ${String(color[variant])} 15%, Canvas)`,
    borderInlineStartColor: (
      variant in color
        ? color[variant]
        : "CanvasText"
    ),
  }),
  container: {
    backgroundColor: "color-mix(in srgb, CanvasText 15%, Canvas)",
    borderInlineStartColor: "CanvasText",
    borderInlineStartStyle: "solid",
    borderInlineStartWidth: "0.325rem",
    color: "CanvasText",
    padding: "0.5rem",
    paddingInlineStart: "1rem",
  },
});

const Blockquote = ({
  children,
  ref,
  style,
  variant,
  ...props
}: BlockquoteProps) => {
  return (
    <blockquote
      {...props}
      {...stylex.props(
        styles.container,
        variant === Variant.Accent && styles.colorVariant("accent"),
        variant === Variant.Default && styles.colorVariant("primary"),
        variant === Variant.Danger && styles.colorVariant("danger"),
        variant === Variant.Info && styles.colorVariant("info"),
        variant === Variant.Success && styles.colorVariant("success"),
        variant === Variant.Warning && styles.colorVariant("warning"),
        style
      )}
      ref={ref}
    >
      {children}
    </blockquote>
  );
};

export default Blockquote;
