import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type ForwardedRef,
  type MouseEvent as ReactMouseEvent,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import { cls } from "../../lib/cls";
import { variantBgClass, variantTextClass } from "../../lib/variantClasses";
import { type Variant } from "../../types/variants";

export type ButtonToggleEvent = {
  direct: boolean;
  nativeEvent?: ReactMouseEvent<HTMLButtonElement, MouseEvent>["nativeEvent"];
  state: "pressed" | "released";
  target?: HTMLButtonElement;
  type: "toggle";
};

export type ToggleProps<Toggle = unknown, Regular = unknown> =
  | ({
    label?: [string, string] | string;
    onToggle?: (event: ButtonToggleEvent) => void;
    pressed?: "false" | "true" | boolean;
    toggle: true;
    variant?: [Variant, Variant] | Variant;
  } & Toggle)
  | ({
    label?: string;
    onToggle?: never;
    pressed?: never;
    toggle?: false;
    variant?: Variant;
  } & Regular);

export type ButtonProps = {
  clear?: boolean;
  extendedClassName?: string;
  grow?: boolean;
  inverted?: boolean;
  popovertarget?: string;
  ref?: ForwardedRef<ButtonComponent>;
  shrink?: boolean;
  size?: "full" | "lg" | "md" | "sm" | "xl" | "xs";
  variant?: Variant;
} & Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "type"
> & ToggleProps;

export type ButtonComponent = {
  button?: HTMLButtonElement;
  pressed?: boolean;
  toggle?: () => void;
};

export const Button = forwardRef(function Button(
  {
    children,
    className,
    clear,
    extendedClassName,
    grow = true,
    inverted,
    label,
    onClick,
    onToggle,
    pressed,
    shrink,
    size,
    toggle = false,
    variant = "none",
    ...props
  }: ButtonProps,
  ref: ForwardedRef<ButtonComponent>
) {
  const isPressed = useMemo(() => {
    if (pressed === true || pressed === "true") return true;
    if (pressed === false || pressed === "false") return false;
    return;
  }, [pressed]);

  const currentLabel = useMemo(() => {
    return Array.isArray(label) ? label[isPressed ? 1 : 0] : label;
  }, [label, isPressed]);

  const currentVariant = useMemo(() => {
    return Array.isArray(variant) ? variant[isPressed ? 1 : 0] : variant;
  }, [variant, isPressed]);

  const [pressedState, setPressedState] = useState<boolean>(isPressed ?? false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = useCallback(
    (event?: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (toggle) {
        if (isPressed === undefined) {
          setPressedState(previous => !previous);
        }
        if (onToggle) {
          onToggle({
            direct: !!event,
            nativeEvent: event?.nativeEvent,
            state: pressedState ? "released" : "pressed",
            target: event?.currentTarget ?? buttonRef.current ?? undefined,
            type: "toggle",
          });
        }
      }
    },
    [toggle, isPressed, onToggle, pressedState]
  );

  useImperativeHandle(
    ref,
    (): ButtonComponent => {
      return {
        button: buttonRef.current ?? undefined,
        pressed: pressedState,
        toggle: () => {
          handleToggle();
        },
      };
    },
    [buttonRef, pressedState, handleToggle]
  );

  const handleClickEvent = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
      handleToggle(event);
      if (onClick) onClick(event);
    },
    [handleToggle, onClick]
  );

  useEffect(() => {
    if (isPressed === true) {
      setPressedState(true);
    }
    else if (isPressed === false) {
      setPressedState(false);
    }
  }, [isPressed, setPressedState]);

  const toggleProps = toggle
    ? {
      "aria-pressed": pressedState,
      "role": "switch",
    }
    : {};

  return (
    <button
      aria-label={children && currentLabel ? currentLabel : undefined}
      className={cls(
        className ?? (clear
          ? "bg-transparent c-inherit b-none b-0 cursor-pointer c-inherit m-0 p-0 inline-block"
          : [
            "text-center",
            "p-inline-2",
            "p-block-3",
            "rounded-4",
            "b-none",
            "b-0",
            "m-0",
            "cursor-pointer",
            grow ? "flex-grow" : null,
            shrink ? "flex-shrink" : null,
            ...(inverted
              ? [
                variantTextClass[currentVariant] ?? "c-inherit",
                "bg-transparent",
              ]
              : [
                variantBgClass[currentVariant] ?? "bg-primary",
                "c-inherit",
              ]),
          ]),
        extendedClassName
      )}
      data-size={size}
      data-variant={currentVariant}
      onClick={handleClickEvent}
      ref={buttonRef}
      title={currentLabel}
      type="button"
      {...toggleProps}
      {...props}
    >
      {currentLabel && !children ? currentLabel : children}
    </button>
  );
});
