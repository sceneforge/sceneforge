import {
  type Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import {
  forEachChildren,
  getResizableElements,
  updateElementsSize,
  updateElementsSizeByMovement,
  updatePointerEventStyle,
} from "../../helpers";
import { swapOrientation } from "../../helpers/swapOrientation";
import { Orientation } from "../../types";

export interface SplitPaneComponentRef {
  childSize(index: number): string | undefined;
  resizeChild(index: number, value: number | string): void;
}

export type UseSplitPaneProps = {
  orientation?: Orientation;
  ref?: Ref<SplitPaneComponentRef>;
  resizable?: boolean;
};

export const useSplitPane = ({
  orientation,
  ref,
  resizable,
}: UseSplitPaneProps) => {
  const splitPaneRef = useRef<HTMLDivElement>(null);
  const resizeElementStart = useRef<HTMLDivElement | null>(null);
  const resizeElementEnd = useRef<HTMLDivElement | null>(null);
  const property = useMemo(() => orientation === Orientation.Horizontal ? "width" : "height", [orientation]);
  const movement = useMemo(() => orientation === Orientation.Horizontal ? "movementX" : "movementY", [orientation]);
  const position = useMemo(() => orientation === Orientation.Horizontal ? "left" : "top", [orientation]);

  const prepareResizableElementsStyle = useCallback((pointerStyle: "" | "none" = "") => {
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
        child.style.setProperty(`--${property}`, `${childSizePercent}%`);
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
    if (splitPaneRef.current && target instanceof HTMLElement) {
      const { end, start } = getResizableElements(target);
      if (start && start instanceof HTMLDivElement) {
        resizeElementStart.current = start;
      }
      if (end && end instanceof HTMLDivElement) {
        resizeElementEnd.current = end;
      }
    }
  }, [splitPaneRef, resizeElementStart, resizeElementEnd]);

  const isGutterElement = useCallback((element: HTMLElement) => {
    if (
      splitPaneRef.current
      && resizable
      && element.parentElement === splitPaneRef.current
    ) {
      return (
        element.dataset.resizeIdStart !== undefined
        && element.dataset.resizeIdEnd !== undefined
      );
    }
    return false;
  }, [splitPaneRef, resizable]);

  const updateGuttersAriaValueNow = useCallback(() => {
    if (splitPaneRef.current) {
      const {
        [position]: parentPosition,
        [property]: size,
      } = splitPaneRef.current.getBoundingClientRect();
      forEachChildren(
        splitPaneRef.current,
        (child) => {
          const { [position]: childPosition } = child.getBoundingClientRect();
          child.ariaValueNow = `${((childPosition - parentPosition) / size) * 100}`;
        },
        (child) => {
          return (
            child instanceof HTMLElement
            && child.dataset.resizeIdStart !== undefined
            && child.dataset.resizeIdEnd !== undefined
          );
        }
      );
    }
  }, [position, property]);

  const handlePointerDown = useCallback((event: PointerEvent) => {
    if (event.target instanceof HTMLElement && isGutterElement(event.target)) {
      extractResizableElements(event.target);
      adjustChildrenSize();
      updatePointerEventStyle(splitPaneRef.current, "auto");
      prepareResizableElementsStyle("none");
    }
  }, [
    splitPaneRef,
    adjustChildrenSize,
    extractResizableElements,
    isGutterElement,
    prepareResizableElementsStyle,
  ]);

  const handlePointerUp = useCallback(() => {
    updatePointerEventStyle(splitPaneRef.current, "");
    prepareResizableElementsStyle();
    updateGuttersAriaValueNow();
  }, [splitPaneRef, prepareResizableElementsStyle, updateGuttersAriaValueNow]);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    if (
      splitPaneRef.current
      && resizable
      && resizeElementStart.current
      && resizeElementEnd.current
    ) {
      updateElementsSizeByMovement(
        property,
        event[movement],
        splitPaneRef.current,
        resizeElementStart.current,
        resizeElementEnd.current
      );
    }
  }, [resizable, property, movement]);

  const swapChildrenOrientation = useCallback((
    withOrientation = Orientation.Horizontal
  ) => {
    if (splitPaneRef.current && resizable) {
      forEachChildren(
        splitPaneRef.current,
        (child) => {
          return swapOrientation(child, withOrientation);
        },
        (child) => {
          return (child instanceof HTMLDivElement
            && child.dataset.resizeIdStart === undefined
            && child.dataset.resizeIdEnd === undefined);
        }
      );
    }
  }, [resizable, splitPaneRef]);

  useImperativeHandle(ref, () => {
    return new (class implements SplitPaneComponentRef {
      childSize(index: number) {
        const splitPane = splitPaneRef.current;
        if (splitPane) {
          const children = splitPane.querySelectorAll("&>:not([role=\"separator\"])");
          if (children.length > index) {
            const child = children[index];
            if (child instanceof HTMLElement) {
              return child.style.getPropertyValue(`--${property}`);
            }
          }
        }
        return;
      }

      resizeChild(index: number, value: number | string): void {
        const splitPane = splitPaneRef.current;

        if (splitPane && resizable) {
          const children = splitPane.querySelectorAll("&>:not([role=separator])");
          if (
            children.length > index
            && index in children
            && children[index] instanceof HTMLElement
          ) {
            const next = children[index].nextElementSibling;
            if (
              next instanceof HTMLElement
              && next.dataset.resizeIdStart === children[index].id
            ) {
              const target = next;
              extractResizableElements(target);

              updateElementsSize(
                property,
                value,
                splitPaneRef.current,
                resizeElementStart.current,
                resizeElementEnd.current
              );
              resizeElementEnd.current = null;
              resizeElementStart.current = null;
            }
          }
        }
        else if (splitPane && !resizable) {
          const children = splitPane.querySelectorAll("&>:not([role=separator])");
          if (children.length > index) {
            const [childStart, childEnd] = children.length === index + 1
              ? [children[index - 1], children[index]]
              : [children[index], children[index + 1]];
            if (
              childStart instanceof HTMLElement
              && childEnd instanceof HTMLElement
            ) {
              updateElementsSize(
                property,
                value,
                splitPane,
                childStart,
                childEnd
              );
            }
          }
        }
      }
    })();
  }, [property, resizable, extractResizableElements]);

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
      };
    }
  }, [
    resizable,
    splitPaneRef,
    orientation,
    swapChildrenOrientation,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
  ]);

  return {
    splitPaneRef,
  };
};
