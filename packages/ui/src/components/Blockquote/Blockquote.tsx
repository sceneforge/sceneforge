import type { StyleXStyles } from "@stylexjs/stylex";
import type { AllHTMLAttributes, RefObject } from "react";

import * as stylex from "@stylexjs/stylex";

import { borderStyles } from "../../borders.stylex";
import { backgroundStyles, foregroundColor } from "../../colors.stylex";
import { Variant } from "../../types";

export type BlockquoteProps = {
  ref?: RefObject<HTMLQuoteElement>;
  style?: StyleXStyles;
  variant?: Variant;
} & Omit<AllHTMLAttributes<HTMLQuoteElement>, "className" | "style">;

const styles = stylex.create({
  container: {
    color: foregroundColor.default,
    paddingBlock: "0.5rem",
    paddingInline: "0.75rem",
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
        backgroundStyles.defaultInverted(15),
        borderStyles.borderInlineStart,
        borderStyles.borderInlineStartSize(5),
        borderStyles.borderInlineStartCurrentColor(100),
        variant && borderStyles.borderInlineStartVariant(variant, 100),
        variant && backgroundStyles.variant(variant, 15),
        style
      )}
      ref={ref}
    >
      {children}
    </blockquote>
  );
};

export default Blockquote;
