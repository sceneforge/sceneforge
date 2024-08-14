import { type Ref, type RefObject, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";

import { getNumber } from "../../helpers";
import { useCurrentId } from "../../hooks";
import { Orientation, Position } from "../../types";

export interface ResizableHandler {
  get size(): number | string;
  set size(size: number | string);
};

export type UseDrawerProps = {
  drawerRef?: RefObject<HTMLDivElement | null>;
  id?: string;
  initialSize?: number;
  orientation?: Orientation;
  position?: Position;
  ref?: Ref<ResizableHandler>;
  resizable?: boolean;
};

export const useDrawer = ({
  drawerRef,
  id,
  initialSize = 48,
  orientation = Orientation.Horizontal,
  position = Position.End,
  ref,
  resizable,
}: UseDrawerProps = {}) => {
  const currentId = useCurrentId(id);

  const [size, setSize] = useState<number>(initialSize);
  const sizeProperty = useMemo(() => orientation === Orientation.Horizontal ? "height" : "width", [orientation]);
  const offsetProperty = useMemo(() => orientation === Orientation.Horizontal ? "offsetY" : "offsetX", [orientation]);
  const cursorProperty = useMemo(() => orientation === Orientation.Horizontal ? "ns-resize" : "ew-resize", [orientation]);

  const getCurrentSize = useCallback(() => {
    if (
      drawerRef?.current instanceof HTMLDivElement
      && drawerRef.current.childElementCount === 1
    ) {
      const drawer = drawerRef.current.childNodes.item(0);
      if (drawer instanceof HTMLDivElement) {
        const {
          [sizeProperty]: size,
        } = drawer.getBoundingClientRect();
        const {
          [sizeProperty]: parentSize,
        } = drawerRef.current.getBoundingClientRect();
        return (size / parentSize) * 100;
      }
    }
    return;
  }, [drawerRef, sizeProperty]);

  const setDrawerSize = useCallback((value: number | string) => {
    const element = drawerRef?.current as HTMLDivElement | undefined;
    if (element?.childNodes.item(0)) {
      const drawer = element.childNodes.item(0) as HTMLDivElement;
      if (typeof value === "number" && !Number.isNaN(value)) {
        drawer.style.setProperty(`--${sizeProperty}`, `${value}%`);
        setSize(value);
      }
      else if (typeof value === "string" && value) {
        drawer.style.setProperty(`--${sizeProperty}`, value);
        const currentSize = getCurrentSize();
        if (currentSize) {
          setSize(currentSize);
        }
      }
    }
  }, [
    drawerRef,
    getCurrentSize,
    sizeProperty,
  ]);

  useImperativeHandle(ref, () => new (class implements ResizableHandler {
    get size() {
      return size;
    }

    set size(value: number | string) {
      setDrawerSize(value);
    }
  })(), [setDrawerSize, size]);

  const handlePointerDown = useCallback((event: PointerEvent) => {
    const element = drawerRef?.current;

    if (
      element
      && event.target instanceof HTMLDivElement
      && element?.childNodes.item(0) === event.target
    ) {
      const { [sizeProperty]: areaSize } = event.target.getBoundingClientRect();
      const gutterSize = getNumber(window.getComputedStyle(event.target, ":after")[sizeProperty], 4);
      const gutterOffset = gutterSize - (
        position === Position.End
          ? event[offsetProperty]
          : areaSize - event[offsetProperty]
      );

      if (gutterOffset >= -0.5 && gutterOffset <= (gutterSize + 0.5)) {
        element.style.pointerEvents = "auto";
        element.style.cursor = cursorProperty;
        event.target.style.pointerEvents = "none";
      }
    }
  }, [position, drawerRef, offsetProperty, sizeProperty, cursorProperty]);

  const handlePointerUp = useCallback(() => {
    const element = drawerRef?.current;
    if (element && element instanceof HTMLDivElement) {
      element.style.cursor = "auto";
      element.style.pointerEvents = "none";
      for (const child of element.childNodes) {
        if (child instanceof HTMLDivElement) {
          child.style.pointerEvents = "auto";
        }
      }
    }
    const currentSize = getCurrentSize();
    if (currentSize) {
      setSize(currentSize);
    }
  }, [drawerRef, getCurrentSize]);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    const element = drawerRef?.current;
    if (element && element instanceof HTMLDivElement && element.style.pointerEvents === "auto") {
      const drawer = element.childNodes.item(0);
      if (drawer instanceof HTMLDivElement) {
        const { [sizeProperty]: areaSize } = element.getBoundingClientRect();
        const size = (
          position === Position.End
            ? areaSize - event[offsetProperty]
            : event[offsetProperty]
        );
        const percentualSize = (size / areaSize) * 100;
        drawer.style.setProperty(`--${sizeProperty}`, `${percentualSize}%`);
      }
    }
  }, [drawerRef, offsetProperty, position, sizeProperty]);

  useEffect(() => {
    if (resizable && drawerRef && drawerRef.current) {
      const element = drawerRef.current;

      element.addEventListener("pointerdown", handlePointerDown);
      element.addEventListener("pointerup", handlePointerUp);
      element.addEventListener("pointermove", handlePointerMove);
      element.addEventListener("pointercancel", handlePointerUp);

      return () => {
        for (const child of element.childNodes) {
          if (child instanceof HTMLDivElement) {
            child.style.setProperty("pointerEvents", null);
          }
        }

        element.removeEventListener("pointerdown", handlePointerDown);
        element.removeEventListener("pointerup", handlePointerUp);
        element.removeEventListener("pointermove", handlePointerMove);
        element.removeEventListener("pointercancel", handlePointerUp);
      };
    }
  }, [
    resizable,
    drawerRef,
    position,
    orientation,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
  ]);

  return {
    currentId,
    setSize,
    size,
  };
};
