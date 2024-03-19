import {
  useCallback,
  useRef,
  useLayoutEffect,
  useEffect,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
  useState,
  MouseEventHandler,
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
  contentVariant?: Variant;
  items?: (
    | (ActionProps & { type: "item" })
    | {
        type: "divider";
        onClick: never;
        label: never;
        icon: never;
        variant: never;
      }
  )[];
};

export const Dropdown = forwardRef(function Dropdown(
  { items, contentVariant, onToggle, ...props }: DropdownProps,
  ref: ForwardedRef<ButtonComponent>
) {
  const buttonRef = useRef<ButtonComponent>(null);
  const itemListRef = useRef<HTMLUListElement>(null);
  const [pressed, setPressed] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      button: buttonRef.current?.button,
      pressed,
      toggle: buttonRef.current?.toggle,
    }),
    [buttonRef]
  );

  const clear = useCallback(() => {
    setPressed(false);
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
    [itemListRef, pressed, clear]
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
      if (event.state === "pressed") {
        setPressed(true);
      }
      if (onToggle) onToggle(event);
    },
    [setPressed, onToggle]
  );

  const handleItemClick = useCallback(
    (onClick?: MouseEventHandler): MouseEventHandler =>
      (event) => {
        clear();
        if (onClick) return onClick(event);
      },
    [clear]
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
  }, [buttonRef]);

  useLayoutEffect(() => {
    if (pressed && itemListRef.current && buttonRef.current?.button) {
      setPositionOnTarget(itemListRef.current, buttonRef.current.button);
    }
  }, [pressed, buttonRef, itemListRef]);

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
        />
      ) : (
        <Button
          {...(buttonProps as ButtonProps)}
          toggle
          pressed={pressed}
          ref={buttonRef}
        />
      )}
      {pressed && items && items.length && (
        <ul
          ref={itemListRef}
          className={cls(
            "fixed w-min list-none m-0 p-2 b-1 b-solid light:b-white:15 dark:b-black:15 c-inherit shadow-2xl shadow-black rounded-3",
            contentVariant && variantBgClass[contentVariant]
              ? variantBgClass[contentVariant]
              : "bg-accent"
          )}
        >
          {items.map(({ type, onClick, ...item }, index) => (
            <li key={index}>
              {type === "divider" ? (
                <hr />
              ) : (
                <Action
                  {...item}
                  onClick={handleItemClick(onClick)}
                  className="bg-transparent w-full c-inherit p-2 b-none light:hover:bg-white:25 dark:hover:bg-black:25 rounded-2 text-start cursor-pointer"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
});
