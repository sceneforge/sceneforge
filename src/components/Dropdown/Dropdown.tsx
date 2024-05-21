import {
  ForwardedRef,
  MouseEventHandler,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cls } from "../../lib/cls";
import { setPositionOnTarget } from "../../lib/setPosition";
import { variantBgClass } from "../../lib/variantClasses";
import { type Variant } from "../../types/variants";
import { Action, type ActionProps } from "../Action";
import {
  Button,
  type ButtonComponent,
  type ButtonProps,
  ButtonToggleEvent,
} from "../Button";
import { IconButton, type IconButtonProps } from "../IconButton";

export type DropdownProps = {
  clearDropdown?: () => void;
  contentVariant?: Variant;
  items?: (
    | {
      active?: never;
      className?: string;
      clearDropdown?: never;
      icon?: never;
      label?: never;
      onClick?: never;
      parentDropdown?: never;
      type: "divider";
      variant?: never;
    }
    | ({ active?: boolean; type: "item" } & ActionProps)
  )[];
  parentDropdown?: string;
} & (
  | ({ icon?: never } & Omit<ButtonProps, "pressed" | "toggle">)
  | Omit<IconButtonProps, "pressed" | "toggle">
);

export const Dropdown = forwardRef(function Dropdown(
  {
    clearDropdown,
    contentVariant,
    extendedClassName,
    items,
    onToggle,
    parentDropdown,
    ...props
  }: DropdownProps,
  ref: ForwardedRef<ButtonComponent>
) {
  const buttonRef = useRef<ButtonComponent>(null);
  const itemListRef = useRef<HTMLUListElement>(null);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const popoverId = useId();

  useImperativeHandle(
    ref,
    () => ({
      button: buttonRef.current?.button,
      pressed,
      toggle: buttonRef.current?.toggle,
    }),
    [pressed]
  );

  const clear = useCallback(() => {
    setPressed(false);
    itemListRef.current?.hidePopover();
    if (onToggle)
      onToggle({
        direct: false,
        state: "released",
        target: buttonRef.current?.button,
        type: "toggle",
      });
  }, [buttonRef, onToggle]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clear();
      }
      if ((event.key === "ArrowDown" || event.key === "ArrowUp") && itemListRef.current) {
        event.preventDefault();
        event.stopPropagation();
        const direction = event.key === "ArrowDown" ? 1 : -1;

        const items = itemListRef.current.querySelectorAll("li");
        let nextIndex = 0;
        for (const [index, item] of items.entries()) {
          if (item.querySelector(":focus, :active")) {
            nextIndex = index + direction;
            break;
          }
        }
        nextIndex = nextIndex < 0
          ? items.length + nextIndex
          : nextIndex % items.length;
        (
          items[nextIndex].querySelector(
            "button, a, input, select, textarea"
          ) as HTMLElement
        )?.focus();
      }
    },
    [itemListRef, clear]
  );

  const handleClickOut = useCallback(
    (event: MouseEvent) => {
      if (
        itemListRef.current
        && !itemListRef.current.contains(event.target as Node)
      ) {
        clear();
      }
    },
    [itemListRef, clear]
  );

  const handleToggle = useCallback(
    (event: ButtonToggleEvent) => {
      setPressed(event.state === "pressed");
      setTimeout(() => {
        if (pressed && itemListRef.current && buttonRef.current?.button) {
          setPositionOnTarget(itemListRef.current, buttonRef.current.button);
        }
      }, 100);
      if (onToggle) onToggle(event);
    },
    [onToggle, pressed]
  );

  const handleItemClick = useCallback(
    (onClick?: MouseEventHandler): MouseEventHandler =>
      (event) => {
        const popoverTargetId
          = event.target instanceof HTMLElement
          && event.target.getAttribute("popovertarget")
            ? event.target.getAttribute("popovertarget")
            : undefined;
        const popoverTarget = popoverTargetId
          ? document.querySelector(`#${popoverTargetId}`)
          : undefined;
        const popoverTargetAnchor
          = popoverTarget && popoverTarget.getAttribute("anchor")
            ? popoverTarget.getAttribute("anchor")
            : undefined;
        if (popoverTargetAnchor !== popoverId) {
          clear();
          if (clearDropdown) clearDropdown();
        }
        if (onClick) return onClick(event);
      },
    [clear, popoverId, clearDropdown]
  );

  useEffect(() => {
    if (buttonRef.current) {
      window.addEventListener("click", handleClickOut, true);
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("contextmenu", handleClickOut, true);

      return () => {
        window.removeEventListener("click", handleClickOut, true);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("contextmenu", handleClickOut, true);
      };
    }
  }, [buttonRef, handleClickOut, handleKeyDown]);

  useEffect(() => {
    if (pressed && itemListRef.current && buttonRef.current?.button) {
      const button = buttonRef.current.button;
      const list = itemListRef.current;
      const interval = setInterval(() => {
        setPositionOnTarget(list, button);
        if (visible !== true) {
          setVisible(true);
        }
      }, 100);

      return () => {
        if (visible !== false) {
          setVisible(false);
        }
        clearInterval(interval);
      };
    }
  }, [pressed, buttonRef, itemListRef, visible, setVisible]);

  const buttonProps = {
    ...props,
    onToggle: handleToggle,
    toggle: true,
  };

  return (
    <>
      {props.icon
        ? (
          <IconButton
            {...(buttonProps as IconButtonProps)}
            extendedClassName={cls(
              extendedClassName,
              pressed ? "dark:bg-black:20 light:bg-white:20" : undefined
            )}
            popovertarget={popoverId}
            popovertargetaction={pressed ? "show" : "hide"}
            pressed={pressed}
            ref={buttonRef}
            toggle
          />
        )
        : (
          <Button
            {...(buttonProps as ButtonProps)}
            extendedClassName={cls(
              extendedClassName,
              pressed ? "dark:bg-black:20 light:bg-white:20" : undefined
            )}
            popovertarget={popoverId}
            popovertargetaction={pressed ? "show" : "hide"}
            pressed={pressed}
            ref={buttonRef}
            toggle
          />
        )}
      {items && items.length > 0 && (
        <ul
          anchor={parentDropdown ?? undefined}
          className={cls(
            "fixed w-min list-none m-0 p-1 b-1 b-solid light:b-white:15 dark:b-black:15 c-inherit shadow-2xl shadow-black rounded-3",
            contentVariant && variantBgClass[contentVariant]
              ? variantBgClass[contentVariant]
              : "bg-accent",
            visible ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          id={popoverId}
          popover="manual"
          ref={itemListRef}
        >
          {items.map(({ active, className, onClick, type, ...item }, index) => (
            <li
              className={cls(
                className,
                active
                  ? "dark:bg-black:30 light:bg-white:30 rounded-2"
                  : undefined
              )}
              key={index}
            >
              {type === "divider"
                ? (
                  <hr />
                )
                : (
                  <Action
                    className="w-full cursor-pointer rounded-2 b-none bg-transparent p-2 text-start text-nowrap c-inherit dark:hover:bg-black:25 light:hover:bg-white:25"
                    contentVariant={contentVariant}
                    {...item}
                    clearDropdown={clear}
                    onClick={handleItemClick(onClick)}
                    parentDropdown={popoverId}
                  />
                )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
});
