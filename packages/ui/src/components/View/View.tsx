import type { StyleXStyles } from "@stylexjs/stylex";
import type { AllHTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { colorStyles, currentColor } from "../../colors.stylex";
import { Variant } from "../../types";
import { type SpacerStyleProps, marginStyle, paddingStyle } from "../tokens.stylex";

export type ViewProps = {
  hidden?: boolean;
  margin?: SpacerStyleProps;
  padding?: SpacerStyleProps;
  ref?: Ref<HTMLDivElement>;
  scrollable?: "block" | "inline" | boolean;
  squircle?: boolean;
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
  squircleContainer: {
    alignContent: "center",
    aspectRatio: "1 / 1",
    maskImage: "url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDAsIDUwIEMgMCwgNiA2LCAwIDUwLCAwIFMgMTAwLCA2IDEwMCwgNTAgOTQsIDEwMCA1MCwgMTAwIDAsIDk0IDAsIDUwIFoiIC8+PC9zdmc+)",
    maskPosition: "center center",
    maskRepeat: "no-repeat",
    maskSize: "auto auto",
    maskType: "alpha",
    textAlign: "center",
  },
});

const View = ({
  hidden,
  margin = 0,
  padding = 0,
  ref,
  scrollable = false,
  squircle,
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
        ...(margin === undefined ? [] : marginStyle(margin)),
        ...(padding === undefined ? [] : paddingStyle(padding)),
        variant && colorStyles.backgroundVariant(variant),
        variant && colorStyles.foregroundBackgroundVariant(variant),
        squircle && styles.squircleContainer,
        style,
        hidden && styles.hidden
      )}
      ref={ref}
    />
  );
};

export default View;
