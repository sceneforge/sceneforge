import {
  useCallback,
  useRef,
  useEffect,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
  useState,
  MouseEventHandler,
  useId,
} from "react";
import { Action, type ActionProps } from "../Action";
import {
  Button,
  ButtonToggleEvent,
  type ButtonComponent,
  type ButtonProps,
} from "../Button";
import { IconButton, type IconButtonProps } from "../IconButton";
import { setPositionOnTarget } from "../../lib/setPosition";
import { cls } from "../../lib/cls";
import { type Variant } from "../../types/variants";
import { variantBgClass } from "../../lib/variantClasses";

export type DropdownProps = (
  | (Omit<ButtonProps, "toggle" | "pressed"> & { icon?: never })
  | Omit<IconButtonProps, "toggle" | "pressed">
) & {
  parentDropdown?: string;
  contentVariant?: Variant;
  clearDropdown?: () => void;
  items?: (
    | (ActionProps & { type: "item"; active?: boolean })
    | {
        type: "divider";
        onClick?: never;
        label?: never;
        icon?: never;
        variant?: never;
        className?: string;
        active?: never;
        parentDropdown?: never;
        clearDropdown?: never;
      }
  )[];
};

export const Dropdown = forwardRef(function Dropdown(
  {
    items,
    contentVariant,
    onToggle,
    parentDropdown,
    clearDropdown,
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
        type: "toggle",
        state: "released",
        direct: false,
        target: buttonRef.current?.button,
      });
  }, [buttonRef, onToggle]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clear();
      }
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        if (itemListRef.current) {
          event.preventDefault();
          event.stopPropagation();
          const direction = event.key === "ArrowDown" ? 1 : -1;

          const items = itemListRef.current.querySelectorAll("li");
          let nextIndex = 0;
          for (let i = 0; i < items.length; i++) {
            if (items[i].querySelector(":focus, :active")) {
              nextIndex = i + direction;
              break;
            }
          }
          nextIndex =
            nextIndex < 0 ? items.length + nextIndex : nextIndex % items.length;
          (
            items[nextIndex].querySelector(
              "button, a, input, select, textarea"
            ) as HTMLElement
          )?.focus();
        }
      }
    },
    [itemListRef, clear]
  );

  const handleClickOut = useCallback(
    (event: MouseEvent) => {
      if (
        itemListRef.current &&
        !itemListRef.current.contains(event.target as Node)
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
        const popoverTargetId =
          event.target instanceof HTMLElement &&
          event.target.getAttribute("popovertarget")
            ? event.target.getAttribute("popovertarget")
            : undefined;
        const popoverTarget = popoverTargetId
          ? document.getElementById(popoverTargetId)
          : undefined;
        const popoverTargetAnchor =
          popoverTarget && popoverTarget.getAttribute("anchor")
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
    toggle: true,
    onToggle: handleToggle,
  };

  return (
    <>
      {props.icon ? (
        <IconButton
          {...(buttonProps as IconButtonProps)}
          toggle
          pressed={pressed}
          ref={buttonRef}
          popovertargetaction={pressed ? "show" : "hide"}
          popovertarget={popoverId}
        />
      ) : (
        <Button
          {...(buttonProps as ButtonProps)}
          toggle
          pressed={pressed}
          popovertargetaction={pressed ? "show" : "hide"}
          popovertarget={popoverId}
          ref={buttonRef}
        />
      )}
      {items && items.length && (
        <ul
          id={popoverId}
          popover="manual"
          ref={itemListRef}
          anchor={parentDropdown ?? undefined}
          className={cls(
            "fixed w-min list-none m-0 p-2 b-1 b-solid light:b-white:15 dark:b-black:15 c-inherit shadow-2xl shadow-black rounded-3",
            contentVariant && variantBgClass[contentVariant]
              ? variantBgClass[contentVariant]
              : "bg-accent",
            visible ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          {items.map(({ type, onClick, className, active, ...item }, index) => (
            <li
              key={index}
              className={cls(
                className,
                active
                  ? "dark:bg-black:30 light:bg-white:30 rounded-2"
                  : undefined
              )}
            >
              {type === "divider" ? (
                <hr />
              ) : (
                <Action
                  className="w-full cursor-pointer rounded-2 b-none bg-transparent p-2 text-start text-nowrap c-inherit dark:hover:bg-black:25 light:hover:bg-white:25"
                  contentVariant={contentVariant}
                  {...item}
                  onClick={handleItemClick(onClick)}
                  parentDropdown={popoverId}
                  clearDropdown={clear}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
});
