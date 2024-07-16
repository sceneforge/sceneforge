import type { StyleXStyles } from "@stylexjs/stylex";
import type { HTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { colorStyles } from "../../colors.stylex";
import { IconEnum, Variant } from "../../types";
import { iconStyle } from "../tokens.stylex";

export type IconProps = {
  icon: IconEnum;
  ref?: Ref<HTMLSpanElement>;
  size?: number;
  style?: StyleXStyles;
  variant?: Variant;
} & Omit<HTMLAttributes<HTMLSpanElement>, "className" | "style">;

const styles = stylex.create({
  container: {
    aspectRatio: 1,
    backgroundColor: "currentColor",
    color: "inherit",
    display: "inline-block",
    height: "1rem",
    maskRepeat: "no-repeat",
    maskSize: "100% 100%",
    width: "1rem",
  },
  size: (size: number) => ({
    height: `${0.25 * size}rem`,
    maxHeight: `${0.25 * size}rem`,
    maxWidth: `${0.25 * size}rem`,
    minHeight: `${0.25 * size}rem`,
    minWidth: `${0.25 * size}rem`,
    width: `${0.25 * size}rem`,
  }),
});

const Icon = ({
  icon,
  ref,
  size = 4,
  style,
  variant,
  ...props
}: IconProps) => {
  return (
    <span
      role="img"
      {...props}
      ref={ref}
      {...stylex.props(
        styles.container,
        variant && colorStyles.color(variant),
        ...iconStyle(icon),
        styles.size(size),
        style
      )}
    />
  );
};

export default Icon;
