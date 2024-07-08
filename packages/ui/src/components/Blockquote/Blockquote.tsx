import type { StyleXStyles } from "@stylexjs/stylex";
import type { AllHTMLAttributes, RefObject } from "react";

import * as stylex from "@stylexjs/stylex";

import { colorVariables, foregroundColor } from "../../colors.stylex";
import { Variant, VariantType } from "../../types";

export type BlockquoteProps = {
  ref?: RefObject<HTMLQuoteElement>;
  style?: StyleXStyles;
  variant?: Variant;
} & Omit<AllHTMLAttributes<HTMLQuoteElement>, "className" | "style">;

const styles = stylex.create({
  colorVariant: (variant: VariantType) => ({
    backgroundColor: `color-mix(in srgb, ${String(colorVariables[`--theme-color-background-${variant}`])} 15%, transparent)`,
    borderInlineStartColor: colorVariables[`--theme-color-background-${variant}`],
  }),
  container: {
    backgroundColor: foregroundColor.alpha15,
    borderInlineStartColor: foregroundColor.default,
    borderInlineStartStyle: "solid",
    borderInlineStartWidth: "0.325rem",
    color: foregroundColor.default,
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
        variant && styles.colorVariant(variant),
        style
      )}
      ref={ref}
    >
      {children}
    </blockquote>
  );
};

export default Blockquote;
