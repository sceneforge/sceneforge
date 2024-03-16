import {
  forwardRef,
  useCallback,
  useMemo,
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
  nativeEvent: ReactMouseEvent<HTMLButtonElement, MouseEvent>["nativeEvent"];
  target: HTMLButtonElement;
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
  clear?: boolean;
  grow?: boolean;
  shrink?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  popovertarget?: string;
  inverted?: boolean;
  variant?: Variant;
} & ToggleProps;

export const Button = forwardRef(function Button(
  {
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
  ref: ForwardedRef<HTMLButtonElement>
) {
  const isPressed = useMemo(
    () => pressed === true || pressed === "true",
    [pressed]
  );
  const [currentLabel, setCurrentLabel] = useState<string | undefined>(
    Array.isArray(label) ? label[isPressed ? 1 : 0] : label
  );
  const [currentVariant, setCurrentVariant] = useState<Variant>(
    Array.isArray(variant) ? variant[isPressed ? 1 : 0] : variant
  );
  const [pressedState, setPressedState] = useState<boolean>(isPressed);

  const handleClickEvent = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (toggle) {
        setPressedState((prev) => !prev);
        if (onToggle) {
          onToggle({
            target: event.currentTarget,
            type: "toggle",
            state: pressedState ? "released" : "pressed",
            nativeEvent: event.nativeEvent,
          });
          if (Array.isArray(variant)) {
            setCurrentVariant(variant[pressedState ? 1 : 0]);
          }
          if (Array.isArray(label)) {
            setCurrentLabel(label[pressedState ? 1 : 0]);
          }
        }
      }
      if (onClick) onClick(event);
    },
    [toggle, onClick, onToggle, pressedState]
  );

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
      ref={ref}
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
                ? [variantBgClass[currentVariant] ?? "bg-primary", "c-inherit"]
                : [
                    variantTextClass[currentVariant] ?? "c-inherit",
                    "bg-transparent",
                  ]),
            ]
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
