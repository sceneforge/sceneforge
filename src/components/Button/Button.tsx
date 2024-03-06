import {
  forwardRef,
  useCallback,
  useState,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type ForwardedRef,
  type MouseEvent as ReactMouseEvent
} from "react";
import styles from "./Button.module.css";

export type ButtonToggleEvent = {
  nativeEvent: ReactMouseEvent<HTMLButtonElement, MouseEvent>["nativeEvent"];
  target: HTMLButtonElement;
  type: "toggle";
  state: "pressed" | "released";
}

export type Variant = "none" | "default" | "accent" | "danger" | "warning" | "success" | "info" | "inverted";

export type ToggleProps<Toggle = unknown, Regular = unknown> = ({
  toggle: true,
  variant?: Variant | [Variant, Variant];
  pressed?: boolean | "true" | "false";
  onToggle?: (event: ButtonToggleEvent) => void;
} & Toggle) | ({
  toggle?: false;
  variant?: Variant;
  pressed?: never;
  onToggle?: never;
} & Regular)

export type ButtonProps = Omit<DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
>, "type"> & {
  clear?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  popovertarget?: string;
};

export const Button = forwardRef(function Button({
  clear,
  size,
  children,
  variant = "none",
  className,
  toggle = false,
  pressed,
  onClick,
  onToggle,
  ...props
}: ButtonProps & ToggleProps, ref: ForwardedRef<HTMLButtonElement>) {
  const [pressedState, setPressedState] = useState<boolean>(pressed === true || pressed === "true")
  const classNames = [styles.wrapper, className].filter(Boolean).join(" ");

  const handleClickEvent = useCallback((event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (toggle) {
      setPressedState((prev) => !prev);
      if (onToggle) {
        onToggle({
          target: event.currentTarget,
          type: "toggle",
          state: pressedState ? "released" : "pressed",
          nativeEvent: event.nativeEvent
        });
      }
    }
    if (onClick) onClick(event);
  }, [toggle, onClick, onToggle, pressedState]);

  const toggleProps = (toggle ? {
    role: "switch",
    "aria-pressed": pressedState,
    "data-variant": Array.isArray(variant) && variant.length === 2 ? variant[pressed ? 1 : 0] : variant,
  } : {
    "data-variant": variant,
  });

  return (
    <button
      ref={ref}
      className={classNames}
      data-clear={clear ? "true" : "false"}
      data-size={size}
      type="button"
      onClick={handleClickEvent}
      {...toggleProps}
      {...props}
    >
      {children}
    </button>
  );
});
