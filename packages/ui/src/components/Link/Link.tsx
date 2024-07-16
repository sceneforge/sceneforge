import type { StyleXStyles } from "@stylexjs/stylex";
import type { AllHTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { borderStyles } from "../../borders.stylex";
import { colorStyles } from "../../colors.stylex";
import { outlineInteractiveStyles } from "../../effect.stylex";
import { Variant } from "../../types";

export type LinkProps = {
  hidden?: boolean;
  ref?: Ref<HTMLAnchorElement>;
  style?: StyleXStyles;
  variant?: Variant;
} & Omit<AllHTMLAttributes<HTMLAnchorElement>, "style">;

const styles = stylex.create({
  container: {
    textDecoration: {
      ":focus": "underline",
      ":hover": "underline",
      "default": "none",
    },
  },
  hidden: {
    display: "none",
  },
});

const Link = ({
  hidden,
  ref,
  style,
  variant,
  ...props
}: LinkProps) => {
  return (
    <a
      {...props}
      {...stylex.props(
        styles.container,
        borderStyles.outline,
        borderStyles.outlineSize(1.5),
        borderStyles.outlineOffset(3),
        outlineInteractiveStyles.currentColor(100),
        variant && colorStyles.color(variant),
        style,
        hidden && styles.hidden
      )}
      ref={ref}
    />
  );
};

export default Link;
