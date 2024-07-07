import type { StyleXStyles } from "@stylexjs/stylex";
import type { AllHTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { Variant } from "../../types";
import { textColorVariantStyle } from "../tokens.stylex";

export type LinkProps = {
  hidden?: boolean;
  ref?: Ref<HTMLAnchorElement>;
  style?: StyleXStyles;
  variant?: Variant;
} & Omit<AllHTMLAttributes<HTMLAnchorElement>, "style">;

const styles = stylex.create({
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
        ...textColorVariantStyle(variant),
        style,
        hidden && styles.hidden
      )}
      ref={ref}
    />
  );
};

export default Link;
