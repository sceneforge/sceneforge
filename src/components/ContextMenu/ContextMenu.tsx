import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import { Action } from "../Action";
import { useContextMenu } from "./useContextMenu";
import { cls } from "../../lib/cls";
import { variantBgClass } from "../../lib/variantClasses";

export const ContextMenu = () => {
  const {
    show,
    header,
    items,
    variant,
    setPosition,
    clearContextMenu,
    handleItemClick,
  } = useContextMenu();
  const ref = useRef<HTMLDivElement>(null);

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      clearContextMenu();
    }
  };

  const handleClickOut = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      clearContextMenu();
    }
  };

  useEffect(() => {
    if (show) {
      window.addEventListener("click", handleClickOut, true);
      window.addEventListener("keydown", handleEscape, true);
      window.addEventListener("contextmenu", handleClickOut, true);

      setTimeout(() => {
        clearContextMenu();
      }, 5000);

      return () => {
        window.removeEventListener("click", handleClickOut, true);
        window.removeEventListener("keydown", handleEscape, true);
        window.removeEventListener("contextmenu", handleClickOut, true);
      };
    }
  }, [show, clearContextMenu]);

  useLayoutEffect(() => {
    setPosition(ref);
  }, [ref, setPosition]);

  if (!show) return null;

  return (
    <div
      ref={ref}
      className={cls(
        "fixed rounded-2 c-light p-1 shadow-2xl shadow-black b-1 b-solid b-white:25",
        variant && variantBgClass[variant]
          ? variantBgClass[variant]
          : "bg-accent"
      )}
    >
      {header && (
        <div className="light:bg-black:10 dark:bg-white:10 rounded-1 p-block-1 p-inline-2 font-size-3 opacity-50 b-b-1 b-b-solid light:b-b-white:15 dark:b-b-black:15">
          {header}
        </div>
      )}
      {items &&
        items.map(({ type, onClick, ...item }, index) => (
          <Fragment key={index}>
            {type === "divider" ? (
              <hr />
            ) : (
              <Action
                {...item}
                className="b-none bg-transparent c-inherit w-full text-start p-2 rounded light:hover:bg-white:15 dark:hover:bg-black:15"
                onClick={handleItemClick(onClick)}
              />
            )}
          </Fragment>
        ))}
    </div>
  );
};
