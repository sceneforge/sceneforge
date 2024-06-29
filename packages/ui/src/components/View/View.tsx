import type { StyleXStyles } from "@stylexjs/stylex";
import type { AllHTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { Variant } from "../../types";
import { type SpacerStyleProps, backgroundTextColorVariantStyle, marginStyle, paddingStyle } from "../tokens.stylex";

export type ViewProps = {
  margin?: SpacerStyleProps;
  padding?: SpacerStyleProps;
  ref?: Ref<HTMLDivElement>;
  style?: StyleXStyles;
  variant?: Variant;
} & Omit<AllHTMLAttributes<HTMLDivElement>, "className" | "style">;

const styles = stylex.create({
  container: {
    backgroundColor: "transparent",
    color: "inherit",
    display: "block",
    height: "100%",
    position: "relative",
    width: "100%",
  },
});

const View = ({
  margin = 0,
  padding = 0,
  ref,
  style,
  variant,
  ...props
}: ViewProps) => {
  return (
    <div
      {...props}
      {...stylex.props(
        styles.container,
        ...backgroundTextColorVariantStyle(variant),
        ...(margin === undefined ? [] : marginStyle(margin)),
        ...(padding === undefined ? [] : paddingStyle(padding)),
        style
      )}
      ref={ref}
    />
  );
};

export default View;
