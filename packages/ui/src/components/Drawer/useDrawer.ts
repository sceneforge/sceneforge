import { type RefObject, useCallback, useEffect, useId, useImperativeHandle, useMemo, useState } from "react";
import { Orientation, Position } from "../../types";
import { getNumber } from "../../helpers";

export interface ResizableHandler {
  get size(): number;
  set size(size: number);
};

export type UseDrawerProps = {
  id?: string;
  ref?: RefObject<ResizableHandler>;
  resizable?: boolean;
  position?: Position;
  orientation?: Orientation;
  initialSize?: number;
  drawerRef?: RefObject<HTMLDivElement | null>;
};

export const useDrawer = ({
  id,
  ref,
  resizable,
  orientation = Orientation.Horizontal,
  position = Position.End,
  initialSize = 48,
  drawerRef,
}: UseDrawerProps = {
  }) => {
  const generatedId = useId();
  const currentId = useMemo(() => id || generatedId, [id, generatedId]);

  const [size, setSize] = useState<number>(initialSize);

  useImperativeHandle(ref, () => new (class implements ResizableHandler {
    get size() {
      return size;
    }

    set size(size: number) {
      setSize(size);
    }
  }), [orientation, position]);

  const handlePointerDown = useCallback((event: PointerEvent) => {
    const element = drawerRef?.current as HTMLDivElement | undefined;
    if (event.target instanceof HTMLDivElement && element?.childNodes.item(0) === event.target) {
      const rect = event.target.getBoundingClientRect();
      const [property, offset]: ["width" | "height", "offsetX" | "offsetY"] = orientation === Orientation.Horizontal ? ["height", "offsetY"] : ["width", "offsetX"];
      const gutterSize = getNumber(window.getComputedStyle(event.target, ":after")[property], 4);
      const gutterOffset = gutterSize - (position === Position.End ? event[offset] : rect[property] - event[offset]);

      if (gutterOffset >= -0.5 && gutterOffset <= (gutterSize + 0.5)) {
        element.style.pointerEvents = "auto";
        element.style.cursor = orientation === Orientation.Horizontal ? "ns-resize" : "ew-resize";
        event.target.style.pointerEvents = "none";
      }
    }
  }, [orientation, position, drawerRef]);

  const handlePointerUp = useCallback(() => {
    const element = drawerRef?.current as HTMLDivElement | undefined;
    if (element) {
      const [property]: ["width" | "height"] = orientation === Orientation.Horizontal ? ["height"] : ["width"];
      element.style.cursor = "auto";
      element.style.pointerEvents = "none";
      element.childNodes.forEach((child) => {
        if (child instanceof HTMLDivElement) {
          child.style.pointerEvents = "auto";
          const newSize = getNumber(child.style[property]);
          if (newSize > 0) {
            setSize(newSize);
          }
        }
      });
    }
  }, [drawerRef, orientation]);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    const element = drawerRef?.current as HTMLDivElement | undefined;
    if (element && element.style.pointerEvents === "auto") {
      const drawer = element.childNodes.item(0) as HTMLDivElement | undefined;
      if (drawer) {
        const [property, offset]: ["width" | "height", "offsetX" | "offsetY"] = orientation === Orientation.Horizontal ? ["height", "offsetY"] : ["width", "offsetX"];
        const rect = element.getBoundingClientRect();
        const areaSize = rect[property];
        const size = position === Position.End ? rect[property] - event[offset] : event[offset];
        const percentualSize = (size / areaSize) * 100;
        drawer.style[property] = `${percentualSize}%`;
      }
    }
  }, [drawerRef, orientation, position]);

  useEffect(() => {
    if (resizable && drawerRef && drawerRef.current) {
      const element = drawerRef.current;

      element.addEventListener("pointerdown", handlePointerDown);
      element.addEventListener("pointerup", handlePointerUp);
      element.addEventListener("pointermove", handlePointerMove);
      element.addEventListener("pointercancel", handlePointerUp);

      return () => {
        element.childNodes.forEach((child) => {
          if (child instanceof HTMLDivElement) {
            child.style.width = "";
            child.style.height = "";
            child.style.pointerEvents = "";
          }
        });

        element.removeEventListener("pointerdown", handlePointerDown);
        element.removeEventListener("pointerup", handlePointerUp);
        element.removeEventListener("pointermove", handlePointerMove);
        element.removeEventListener("pointercancel", handlePointerUp);
      }
    }
  }, [resizable, drawerRef, position, orientation]);

  return {
    currentId,
    size,
    setSize,
  };
};
