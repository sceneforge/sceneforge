import { Action } from "@sceneforge/ui";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

import { cls } from "../../lib/cls";
import { variantBgClass } from "../../lib/variantClasses";
import { useContextMenu } from "./useContextMenu";

export const ContextMenu = () => {
  const {
    clearContextMenu,
    handleItemClick,
    header,
    items,
    setPosition,
    show,
    variant,
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
    <ul
      className={cls(
        "fixed list-none m-0 rounded-2 c-light p-1 shadow-2xl shadow-black b-1 b-solid b-white:25",
        variant && variantBgClass[variant]
          ? variantBgClass[variant]
          : "bg-accent"
      )}
      ref={ref}
    >
      {header && (
        <li className="b-b-1 rounded-1 b-b-solid p-block-1 p-inline-2 font-size-3 opacity-50 dark:b-b-black:15 light:b-b-white:15 dark:bg-white:10 light:bg-black:10">
          {header}
        </li>
      )}
      {items
      && items.map(({ onClick, type, ...item }, index) => (
        <li key={index}>
          {type === "divider"
            ? (
              <hr />
            )
            : (
              <Action
                type="button"
                {...item}
                className="w-full rounded b-none bg-transparent p-2 text-start c-inherit dark:hover:bg-black:15 light:hover:bg-white:15"
                onClick={handleItemClick(onClick)}
              />
            )}
        </li>
      ))}
    </ul>
  );
};
