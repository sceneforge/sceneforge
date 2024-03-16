import {
  RefObject,
  useCallback,
  useEffect,
  useState,
  type MouseEventHandler
} from "react";
import { changeSize, targetClicked } from "./panelHandler";

export const usePanelSheet = (
  panelRef: RefObject<HTMLDivElement | null>,
  resizeable: boolean,
  orientation: "block" | "inline",
  position: "start" | "end"
) => {
  const [clickDown, setClickDown] = useState(false);

  const mouseUp = useCallback(() => {
    setClickDown(false);
  }, [setClickDown]);

  const mouseDown = useCallback(
    (event: MouseEvent) => {
      if (
        resizeable &&
        targetClicked(panelRef.current, orientation, position, event, "::after")
      ) {
        setClickDown(true);
      } else {
        setClickDown(false);
      }
    },
    [resizeable, panelRef, orientation, position, setClickDown]
  );

  const mouseOver: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (!resizeable) return;
      if (!clickDown) return;

      event.preventDefault();
      event.stopPropagation();
      changeSize(panelRef.current, orientation, position, event);
    },
    [resizeable, panelRef, clickDown, orientation, position]
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
  };
};
