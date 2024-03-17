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
      return () => {
        window.removeEventListener("click", handleClickOut, true);
        window.removeEventListener("keydown", handleEscape, true);
        window.removeEventListener("contextmenu", handleClickOut, true);
      };
    }
  }, [show]);

  useLayoutEffect(() => {
    setPosition(ref);
  }, [ref, setPosition]);

  if (!show) return null;

  return (
    <div
      ref={ref}
      className={cls(
        "fixed rounded-2 c-light p-1 shadow-xl shadow-black b-1 b-solid b-white:25",
        variant && variantBgClass[variant]
          ? variantBgClass[variant]
          : "bg-accent"
      )}
    >
      {header && <div>{header}</div>}
      {items &&
        items.map(({ type, onClick, ...item }, index) => (
          <Fragment key={index}>
            {type === "divider" ? (
              <hr />
            ) : (
              <Action {...item} onClick={handleItemClick(onClick)} />
            )}
          </Fragment>
        ))}
    </div>
  );
};
