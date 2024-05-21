import {
  type MouseEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { changeSize, targetClicked } from "./panelHandler";

type UpdateSizeArguments =
  | { movementX: number; movementY: number; size?: never }
  | { size: number; movementX?: never; movementY?: never };

export const usePanelSheet = (
  panelRef: RefObject<HTMLDivElement | null>,
  resizeable: boolean,
  orientation: "block" | "inline",
  position: "start" | "end",
  handleRef?: RefObject<HTMLSpanElement | null>
) => {
  const [clickDown, setClickDown] = useState(false);

  const mouseUp = useCallback(() => {
    setClickDown(false);
  }, [setClickDown]);

  const mouseDown = useCallback(
    (event: MouseEvent) => {
      if (
        resizeable
        && (targetClicked(
          panelRef.current,
          orientation,
          position,
          event,
          "::after"
        )
        || (handleRef?.current
        && targetClicked(
          handleRef.current,
          orientation,
          position,
          event,
          undefined,
          true
        )))
      ) {
        setClickDown(true);
      }
      else {
        setClickDown(false);
      }
    },
    [resizeable, panelRef, handleRef, orientation, position, setClickDown]
  );

  const updateSize = useCallback(
    ({ movementX, movementY, size }: UpdateSizeArguments) => {
      if (panelRef.current && orientation && position) {
        if ((movementX || movementY) && !size) {
          changeSize(panelRef.current, orientation, position, {
            movementX,
            movementY,
          });
        }
        else if (size && !movementX && !movementY) {
          panelRef.current.style.setProperty(
            orientation === "block" ? "height" : "width",
            `${size}%`
          );
        }
      }
    },
    [orientation, panelRef, position]
  );

  const mouseOver: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (!resizeable) return;
      if (!clickDown) return;

      event.preventDefault();
      event.stopPropagation();
      updateSize(event);
    },
    [resizeable, clickDown, updateSize]
  );

  useEffect(() => {
    if (resizeable && panelRef.current) {
      window.addEventListener("mousedown", mouseDown, { capture: true });
      window.addEventListener("mouseup", mouseUp, { capture: true });
    }

    return () => {
      window.removeEventListener("mousedown", mouseDown, { capture: true });
      window.removeEventListener("mouseup", mouseUp, { capture: true });
    };
  }, [resizeable, mouseDown, mouseUp, mouseOver, panelRef]);

  return {
    mouseOver,
    clickDown,
    updateSize,
  };
};
