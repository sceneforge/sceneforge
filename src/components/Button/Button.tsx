import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type ForwardedRef,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { type Variant } from "../../types/variants";
import { cls } from "../../lib/cls";
import { variantBgClass, variantTextClass } from "../../lib/variantClasses";

export type ButtonToggleEvent = {
  nativeEvent?: ReactMouseEvent<HTMLButtonElement, MouseEvent>["nativeEvent"];
  target?: HTMLButtonElement;
  direct: boolean;
  type: "toggle";
  state: "pressed" | "released";
};

export type ToggleProps<Toggle = unknown, Regular = unknown> =
  | ({
      toggle: true;
      variant?: Variant | [Variant, Variant];
      pressed?: boolean | "true" | "false";
      label?: string | [string, string];
      onToggle?: (event: ButtonToggleEvent) => void;
    } & Toggle)
  | ({
      toggle?: false;
      variant?: Variant;
      pressed?: never;
      onToggle?: never;
      label?: string;
    } & Regular);

export type ButtonProps = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "type"
> & {
  extendedClassName?: string;
  clear?: boolean;
  grow?: boolean;
  shrink?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  popovertarget?: string;
  inverted?: boolean;
  variant?: Variant;
  ref?: ForwardedRef<ButtonComponent>;
} & ToggleProps;

export type ButtonComponent = {
  button?: HTMLButtonElement;
  pressed?: boolean;
  toggle?: () => void;
};

export const Button = forwardRef(function Button(
  {
    extendedClassName,
    grow = true,
    shrink,
    clear,
    label,
    size,
    children,
    variant = "none",
    className,
    toggle = false,
    pressed,
    inverted,
    onClick,
    onToggle,
    ...props
  }: ButtonProps,
  ref: ForwardedRef<ButtonComponent>,
) {
  const isPressed = useMemo(() => {
    if (pressed === true || pressed === "true") return true;
    if (pressed === false || pressed === "false") return false;
    return undefined;
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
          setPressedState((prev) => !prev);
        }
        if (onToggle) {
          onToggle({
            target: event?.currentTarget ?? buttonRef.current ?? undefined,
            direct: !!event,
            type: "toggle",
            state: pressedState ? "released" : "pressed",
            nativeEvent: event?.nativeEvent,
          });
        }
      }
    },
    [toggle, isPressed, onToggle, pressedState],
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
    [buttonRef, pressedState, handleToggle],
  );

  const handleClickEvent = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
      handleToggle(event);
      if (onClick) onClick(event);
    },
    [handleToggle, onClick],
  );

  useEffect(() => {
    if (isPressed === true) {
      setPressedState(true);
    } else if (isPressed === false) {
      setPressedState(false);
    }
  }, [isPressed, setPressedState]);

  const toggleProps = toggle
    ? {
        role: "switch",
        "aria-pressed": pressedState,
      }
    : {};

  return (
    <button
      aria-label={children && currentLabel ? currentLabel : undefined}
      data-variant={currentVariant}
      ref={buttonRef}
      className={cls(
        className
          ? className
          : clear
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
                ...(!inverted
                  ? [
                      variantBgClass[currentVariant] ?? "bg-primary",
                      "c-inherit",
                    ]
                  : [
                      variantTextClass[currentVariant] ?? "c-inherit",
                      "bg-transparent",
                    ]),
              ],
        extendedClassName,
      )}
      data-size={size}
      type="button"
      onClick={handleClickEvent}
      title={currentLabel}
      {...toggleProps}
      {...props}
    >
      {currentLabel && !children ? currentLabel : children}
    </button>
  );
});
