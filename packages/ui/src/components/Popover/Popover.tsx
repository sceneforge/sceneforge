import type { PropsWithChildren, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

import { View } from "../View";
import { type PopoverRef, usePopover } from "./usePopover";

export type PopoverProps = PropsWithChildren<{
  defaultX?: number;
  defaultY?: number;
  id?: string;
  ref?: Ref<PopoverRef>;
}>;

const styles = stylex.create({
  container: {
    display: null,
    height: null,
    position: "absolute",
    width: null,
  },
  positionX: (x: number) => ({
    insetInlineStart: `${x}px`,
  }),
  positionY: (y: number) => ({
    insetBlockStart: `${y}px`,
  }),
});

const Popover = ({ children, defaultX, defaultY, id, ref }: PopoverProps) => {
  const {
    currentId,
    viewRef,
    x,
    y,
  } = usePopover({ defaultX, defaultY, id, ref });

  return (
    <View
      id={currentId}
      popover="manual"
      ref={viewRef}
      style={[
        styles.container,
        styles.positionX(x),
        styles.positionY(y),
      ]}
    >
      {children}
    </View>
  );
};

export default Popover;
