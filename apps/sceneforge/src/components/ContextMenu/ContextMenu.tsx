import { Action } from "@sceneforge/ui";
import { type MouseEventHandler, useCallback, useEffect, useLayoutEffect, useRef } from "react";

import { useContextMenu } from "./useContextMenu";

export const ContextMenu = () => {
  const {
    clearContextMenu,
    handleItemClick,
    header,
    items,
    setPosition,
    show,
  } = useContextMenu();
  const ref = useRef<HTMLUListElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearContextMenu();
      }
    },
    [clearContextMenu]
  );

  const handleClickOut = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        clearContextMenu();
      }
    },
    [clearContextMenu]
  );

  useEffect(() => {
    if (show) {
      window.addEventListener("click", handleClickOut, true);
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("contextmenu", handleClickOut, true);

      const timeout = setTimeout(() => {
        clearContextMenu();
      }, 5000);

      return () => {
        clearTimeout(timeout);

        window.removeEventListener("click", handleClickOut, true);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("contextmenu", handleClickOut, true);
      };
    }
  }, [show, clearContextMenu, handleClickOut, handleKeyDown]);

  useLayoutEffect(() => {
    setPosition(ref);
  }, [ref, setPosition]);

  if (!show) return null;

  return (
    <ul ref={ref}>
      {header && (
        <li>
          {header}
        </li>
      )}
      {
        items
        && items.length > 0
        && items.map(({ onClick, type, ...item }, index) => (
          <li key={index}>
            {type === "divider"
              ? (
                <hr />
              )
              : (
                <Action
                  kind="button"
                  {...item}
                  onClick={
                    onClick
                      ? handleItemClick(
                        onClick as MouseEventHandler<HTMLButtonElement>
                      )
                      : undefined
                  }
                />
              )}
          </li>
        ))
      }
    </ul>
  );
};
