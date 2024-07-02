import type { StyleXStyles } from "@stylexjs/stylex";
import type { AllHTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { Variant } from "../../types";
import { type SpacerStyleProps, backgroundTextColorVariantStyle, marginStyle, paddingStyle } from "../tokens.stylex";

export type ViewProps = {
  hidden?: boolean;
  margin?: SpacerStyleProps;
  padding?: SpacerStyleProps;
  ref?: Ref<HTMLDivElement>;
  scrollable?: "block" | "inline" | boolean;
  style?: StyleXStyles;
  variant?: Variant;
} & Omit<AllHTMLAttributes<HTMLDivElement>, "className" | "hidden" | "style">;

const styles = stylex.create({
  container: {
    backgroundColor: "transparent",
    color: "inherit",
    display: "block",
    height: "100%",
    overflowX: "hidden",
    overflowY: "hidden",
    overscrollBehavior: "none",
    position: "relative",
    width: "100%",
  },
  hidden: {
    display: "none",
  },
  scrollableBlock: {
    overflowY: "auto",
    overscrollBehaviorBlock: "contain",
  },
  scrollableInline: {
    overflowX: "auto",
    overscrollBehaviorInline: "contain",
  },
});

const View = ({
  hidden,
  margin = 0,
  padding = 0,
  ref,
  scrollable = false,
  style,
  variant,
  ...props
}: ViewProps) => {
  return (
    <div
      {...props}
      {...stylex.props(
        styles.container,
        scrollable === "block" && styles.scrollableBlock,
        scrollable === "inline" && styles.scrollableInline,
        scrollable === true && [
          styles.scrollableBlock,
          styles.scrollableInline,
        ],
        ...backgroundTextColorVariantStyle(variant),
        ...(margin === undefined ? [] : marginStyle(margin)),
        ...(padding === undefined ? [] : paddingStyle(padding)),
        hidden && styles.hidden,
        style
      )}
      ref={ref}
    />
  );
};

export default View;
