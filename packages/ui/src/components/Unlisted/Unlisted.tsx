import type { StyleXStyles } from "@stylexjs/stylex";
import type { AllHTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { currentColor } from "../../colors.stylex";
import { useCurrentId } from "../../hooks";
import { scrollShadowsStyles } from "../../scrollShadows.stylex";
import { Orientation } from "../../types";
import { marginStyle, paddingStyle, type SpacerStyleProps } from "../tokens.stylex";

export type UnlistedProps = {
  gap?: number;
  hidden?: boolean;
  id?: string;
  margin?: SpacerStyleProps;
  orientation?: Orientation;
  padding?: SpacerStyleProps;
  ref?: Ref<HTMLUListElement>;
  scrollable?: boolean;
  style?: StyleXStyles;
} & Omit<AllHTMLAttributes<HTMLUListElement>, "className" | "style">;

const styles = stylex.create({
  container: {
    display: "grid",
    height: "100%",
    listStyleType: "none",
    margin: 0,
    overflowX: "hidden",
    overflowY: "hidden",
    overscrollBehaviorX: "none",
    overscrollBehaviorY: "none",
    padding: 0,
    position: "relative",
    scrollbarColor: `${currentColor.alpha35} transparent`,
    scrollbarWidth: "thin",
    width: "100%",
  },
  gap: (value?: number) => ({
    gap: value ? `${value}rem` : 0,
  }),
  hidden: {
    display: "none",
  },
  horizontal: {
    gridAutoFlow: "column",
  },
  scrollableBlock: {
    overflowY: "auto",
    overscrollBehaviorBlock: "contain",
  },
  scrollableInline: {
    overflowX: "auto",
    overscrollBehaviorInline: "contain",
  },
  vertical: {
    gridAutoFlow: "row",
  },
});

const Unlisted = ({
  gap = 0,
  hidden,
  id,
  margin = 0,
  orientation = Orientation.Vertical,
  padding = 0,
  scrollable,
  style,
  ...props
}: UnlistedProps) => {
  const currentId = useCurrentId(id);

  return (
    <ul
      id={currentId}
      {...props}
      hidden={hidden}
      {...stylex.props(
        styles.container,
        styles.vertical,
        styles.gap(gap),
        orientation === Orientation.Horizontal && styles.horizontal,
        scrollable && orientation === Orientation.Vertical && [
          styles.scrollableBlock,
          scrollShadowsStyles.block,
        ],
        scrollable && orientation === Orientation.Horizontal && [
          styles.scrollableInline,
          scrollShadowsStyles.inline,
        ],
        ...(margin === undefined ? [] : marginStyle(margin)),
        ...(padding === undefined ? [] : paddingStyle(padding)),
        style,
        hidden && styles.hidden
      )}
    />
  );
};

export default Unlisted;
