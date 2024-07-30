import type { StyleXStylesWithout } from "@stylexjs/stylex";
import type { Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { colorStyles } from "../../colors.stylex";
import { Align } from "../../types";
import { View, type ViewProps } from "../View";
import { type PopoverRef, usePopover } from "./usePopover";

export type PopoverProps = {
  align?: Align;
  defaultX?: number;
  defaultY?: number;
  ref?: Ref<PopoverRef>;
  style?: StyleXStylesWithout<{
    bottom: unknown;
    display: unknown;
    inset: unknown;
    insetBlock: unknown;
    insetBlockEnd: unknown;
    insetBlockStart: unknown;
    insetInline: unknown;
    insetInlineEnd: unknown;
    insetInlineStart: unknown;
    left: unknown;
    position: unknown;
    right: unknown;
    top: unknown;
  }>;
  verticalAlign?: Align;
} & Omit<ViewProps, "ref" | "style">;

const styles = stylex.create({
  center: {
    "--_popover-translate-x": "-50%",
  },
  container: {
    border: "none",
    display: null,
    height: null,
    position: "absolute",
    translate: "var(--_popover-translate-x, 0) var(--_popover-translate-y, 0)",
    width: null,
  },
  end: {
    "--_popover-translate-x": "-100%",
  },
  positionX: (x: number) => ({
    insetInlineStart: `${x}px`,
  }),
  positionY: (y: number) => ({
    insetBlockStart: `${y}px`,
  }),
  start: {
    "--_popover-translate-x": "0",
  },
  verticalCenter: {
    "--_popover-translate-y": "-50%",
  },
  verticalEnd: {
    "--_popover-translate-y": "-100%",
  },
  verticalStart: {
    "--_popover-translate-y": "0",
  },
});

const Popover = ({
  align = Align.Start,
  defaultX,
  defaultY,
  id,
  ref,
  style,
  variant,
  verticalAlign = Align.Start,
  ...props
}: PopoverProps) => {
  const {
    currentId,
    viewRef,
    x,
    y,
  } = usePopover({ defaultX, defaultY, id, ref });

  return (
    <View
      role="alertdialog"
      {...props}
      aria-modal={true}
      id={currentId}
      popover="manual"
      ref={viewRef}
      style={[
        styles.container,
        styles.positionX(x),
        styles.positionY(y),
        align === Align.Start && styles.start as Record<string, string>,
        align === Align.Center && styles.center as Record<string, string>,
        align === Align.End && styles.end as Record<string, string>,
        verticalAlign === Align.Start
        && styles.verticalStart as Record<string, string>,
        verticalAlign === Align.Center
        && styles.verticalCenter as Record<string, string>,
        verticalAlign === Align.End
        && styles.verticalEnd as Record<string, string>,
        !variant && colorStyles.default,
        style,
      ]}
      variant={variant}
    />
  );
};

export default Popover;
