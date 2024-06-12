import { useCallback, useEffect, useMemo, useRef } from "react";
import { Orientation } from "../../types";
import { forEachChildren, updateElementsSizeByMovement, updatePointerEventStyle } from "../../helpers";
import { swapOrientation } from "../../helpers/swapOrientation";

export type UseSplitPaneProps = {
  orientation?: Orientation;
  resizable?: boolean;
};

export const useSplitPane = ({
  orientation,
  resizable,
}: UseSplitPaneProps) => {
  const splitPaneRef = useRef<HTMLDivElement>(null);
  const resizeElementStart = useRef<HTMLDivElement | null>(null);
  const resizeElementEnd = useRef<HTMLDivElement | null>(null);
  const property = useMemo(() => orientation === Orientation.Horizontal ? 'width' : 'height', [orientation]);

  const prepareResizableElementsStyle = useCallback((pointerStyle: "none" | "" = "") => {
    updatePointerEventStyle(resizeElementStart.current, pointerStyle);
    updatePointerEventStyle(resizeElementEnd.current, pointerStyle);
    if (pointerStyle === "") {
      resizeElementStart.current = null;
      resizeElementEnd.current = null;
    }
  }, [resizeElementStart, resizeElementEnd]);

  const adjustChildrenSize = useCallback(() => {
    if (splitPaneRef.current) {
      const size = splitPaneRef.current.getBoundingClientRect()[property];
      forEachChildren(splitPaneRef.current, (child) => {
        const childSize = child.getBoundingClientRect()[property];
        const childSizePercent = (childSize / size) * 100;
        child.style[property] = `${childSizePercent}%`;
      }, (child) => {
        return child instanceof HTMLDivElement
          && child.dataset.resizeIdStart === undefined
          && child.dataset.resizeIdEnd === undefined
          && child !== resizeElementStart.current
          && child !== resizeElementEnd.current;
      });
    }
  }, [property, splitPaneRef, resizeElementStart, resizeElementEnd]);

  const extractResizableElements = useCallback((target: HTMLElement) => {
    if (splitPaneRef.current && target.dataset.resizeIdStart !== undefined && target.dataset.resizeIdEnd !== undefined) {
      forEachChildren<HTMLDivElement>(splitPaneRef.current, (child) => {
        if (child.id === target.dataset.resizeIdStart) {
          resizeElementStart.current = child;
        } else if (child.id === target.dataset.resizeIdEnd) {
          resizeElementEnd.current = child;
        }
      }, (child) => child instanceof HTMLDivElement && child.hasAttribute("id"));
    }
  }, [splitPaneRef, resizeElementStart, resizeElementEnd]);

  const isGutterElement = useCallback((element: HTMLElement) => {
    if (splitPaneRef.current && resizable && element.parentElement === splitPaneRef.current) {
      return element.dataset.resizeIdStart !== undefined && element.dataset.resizeIdEnd !== undefined;
    }
    return false;
  }, [splitPaneRef, resizable]);

  const updateGuttersAriaValueNow = useCallback(() => {
    if (splitPaneRef.current) {
      const position = property === 'width' ? 'left' : 'top';
      const { [property]: size, [position]: parentPosition } = splitPaneRef.current.getBoundingClientRect();
      forEachChildren(
        splitPaneRef.current,
        (child) => {
          const childPosition = child.getBoundingClientRect()[position];
          child.ariaValueNow = `${((childPosition - parentPosition) / size) * 100}`;
        },
        (child) => child instanceof HTMLElement && child.dataset.resizeIdStart !== undefined && child.dataset.resizeIdEnd !== undefined
      );
    }
  }, [splitPaneRef, property]);

  const handlePointerDown = useCallback((event: PointerEvent) => {
    if (event.target instanceof HTMLElement && isGutterElement(event.target)) {
      extractResizableElements(event.target);
      adjustChildrenSize();
      updatePointerEventStyle(splitPaneRef.current, "auto");
      prepareResizableElementsStyle("none");
    }
  }, [splitPaneRef]);

  const handlePointerUp = useCallback(() => {
    updatePointerEventStyle(splitPaneRef.current, "");
    prepareResizableElementsStyle();
    updateGuttersAriaValueNow();
  }, [splitPaneRef]);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    if (
      splitPaneRef.current
      && resizable
      && resizeElementStart.current
      && resizeElementEnd.current
    ) {
      updateElementsSizeByMovement(
        property,
        property === 'width' ? event.movementX : event.movementY,
        splitPaneRef.current,
        resizeElementStart.current,
        resizeElementEnd.current,
      );
    }
  }, [property, resizeElementStart, resizeElementEnd, splitPaneRef, resizable]);

  const swapChildrenOrientation = useCallback((withOrientation = Orientation.Horizontal) => {
    if (splitPaneRef.current && resizable) {
      forEachChildren(splitPaneRef.current,
        (child) => swapOrientation(child, withOrientation),
        (child) => child instanceof HTMLDivElement &&
          child.dataset.resizeIdStart === undefined &&
          child.dataset.resizeIdEnd === undefined
      );
    }

  }, [resizable, splitPaneRef]);

  useEffect(() => {
    if (resizable && splitPaneRef.current) {
      const element = splitPaneRef.current;
      swapChildrenOrientation(orientation);

      element.addEventListener("pointerdown", handlePointerDown);
      element.addEventListener("pointerup", handlePointerUp);
      element.addEventListener("pointermove", handlePointerMove);

      return () => {
        element.removeEventListener("pointerdown", handlePointerDown);
        element.removeEventListener("pointerup", handlePointerUp);
        element.removeEventListener("pointermove", handlePointerMove);
      }
    }
  }, [resizable, splitPaneRef, orientation]);

  return {
    splitPaneRef
  };
};
