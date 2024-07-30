import { type MouseEvent as ReactMouseEvent, type Ref, useImperativeHandle, useRef, useState } from "react";

import { useCurrentId } from "../../hooks";

export interface PopoverRef {
  get element(): HTMLDivElement | undefined;
  hide: () => void;
  position: (x: number, y: number) => void;
  show: () => void;
  showPosition: (
    event: PointerEvent | ReactMouseEvent<HTMLElement, MouseEvent>
  ) => void;
}

export type UsePopoverProps = {
  defaultX?: number;
  defaultY?: number;
  id?: string;
  ref?: Ref<PopoverRef>;
};

export const usePopover = ({
  defaultX,
  defaultY,
  id,
  ref,
}: UsePopoverProps) => {
  const currentId = useCurrentId(id);
  const viewRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(defaultX ?? 0);
  const [y, setY] = useState(defaultY ?? 0);

  useImperativeHandle(ref, () => new (class implements PopoverRef {
    hide() {
      if (viewRef.current) {
        viewRef.current.hidePopover();
      }
    }

    position(x: number, y: number) {
      setX(x);
      setY(y);
    }

    show() {
      if (viewRef.current) {
        viewRef.current.showPopover();
      }
    }

    showPosition(
      event: PointerEvent | ReactMouseEvent<HTMLElement, MouseEvent>
    ) {
      if (viewRef.current) {
        const { clientX: x, clientY: y } = event;

        this.position(x, y);
        this.show();
      }
    }

    get element() {
      if (viewRef.current) {
        return viewRef.current;
      }
    };
  })(), [viewRef]);

  return {
    currentId,
    viewRef,
    x,
    y,
  };
};
