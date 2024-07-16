import type { StyleXStyles } from "@stylexjs/stylex";
import type { AllHTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { roundedStyles } from "../../borders.stylex";
import { colorStyles, currentColor } from "../../colors.stylex";
import { scrollShadowsStyles } from "../../scrollShadows.stylex";
import { Shape, Variant } from "../../types";
import { type SpacerStyleProps, marginStyle, paddingStyle } from "../tokens.stylex";

export type ViewProps = {
  hidden?: boolean;
  inverted?: boolean;
  margin?: SpacerStyleProps;
  padding?: SpacerStyleProps;
  ref?: Ref<HTMLDivElement>;
  scrollable?: "block" | "inline" | boolean;
  shape?: Shape;
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
    scrollbarColor: `${currentColor.alpha35} transparent`,
    scrollbarWidth: "thin",
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
  inverted,
  margin = 0,
  padding = 0,
  ref,
  scrollable = false,
  shape,
  style,
  variant,
  ...props
}: ViewProps) => {
  return (
    <div
      {...props}
      {...stylex.props(
        styles.container,
        scrollable === "block" && [
          styles.scrollableBlock,
          scrollShadowsStyles.block,
        ],
        scrollable === "inline" && [
          styles.scrollableInline,
          scrollShadowsStyles.inline,
        ],
        scrollable === true && [
          styles.scrollableBlock,
          styles.scrollableInline,
        ],
        ...(margin === undefined ? [] : marginStyle(margin)),
        ...(padding === undefined ? [] : paddingStyle(padding)),
        variant && !inverted && colorStyles.variant(variant),
        variant && inverted && colorStyles.inverted(variant),
        shape === Shape.Rounded && roundedStyles.rounded(2),
        shape === Shape.Circle && roundedStyles.circle,
        shape === Shape.Squircle && roundedStyles.squircle,
        style,
        hidden && styles.hidden
      )}
      ref={ref}
    />
  );
};

export default View;
