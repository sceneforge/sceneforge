import type { StyleXStyles } from "@stylexjs/stylex";
import type { AllHTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { roundedStyles } from "../../borders.stylex";
import { Shape } from "../../types";

export type ImageProps = {
  caption?: string;
  ref?: Ref<HTMLImageElement>;
  shape?: Shape;
  style?: StyleXStyles;
} & Omit<AllHTMLAttributes<HTMLImageElement>, "className" | "style">;

const styles = stylex.create({
  container: {
    height: "auto",
    width: "100%",
  },
});

const Image = ({
  ref,
  shape,
  style,
  ...props
}: ImageProps) => {
  return (
    <img
      {...props}
      ref={ref}
      {...stylex.props(
        styles.container,
        shape === Shape.Pill && roundedStyles.pill,
        shape === Shape.Rounded && roundedStyles.rounded(2),
        shape === Shape.Circle && roundedStyles.circle,
        shape === Shape.Squircle && roundedStyles.squircle,
        style
      )}
    />
  );
};

export default Image;
