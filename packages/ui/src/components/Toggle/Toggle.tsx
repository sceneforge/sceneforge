import type { MouseEvent as ReactMouseEvent, Ref } from "react";

import { Button, type ButtonProps } from "../Button";
import { useToggle } from "./useToggle";

export type ToggleEvent = {
  direct: boolean;
  nativeEvent?: ReactMouseEvent<HTMLButtonElement, MouseEvent>["nativeEvent"];
  state: "pressed" | "released";
  target?: HTMLButtonElement;
  type: "toggle";
};

export interface ToggleComponentRef {
  get button(): HTMLButtonElement | undefined;

  get pressed(): boolean;

  set pressed(value: boolean);

  toggle(
    event?: ReactMouseEvent<
      HTMLButtonElement,
      MouseEvent
    >, preventBubble?: boolean
  ): void;
};

type ToggleProperty<
  T extends object,
  K extends keyof T,
> = [Required<T>[K], Required<T>[K]] | Required<T>[K];

export type ToggleProps = {
  glossy?: ToggleProperty<ButtonProps, "glossy">;
  inverted?: ToggleProperty<ButtonProps, "inverted">;
  label?: ToggleProperty<ButtonProps, "label">;
  onToggle?: (event: ToggleEvent) => void;
  pressed?: "false" | "true" | boolean;
  ref?: Ref<ToggleComponentRef>;
  variant?: ToggleProperty<ButtonProps, "variant">;
} & Omit<ButtonProps, "glossy" | "inverted" | "label" | "onToggle" | "ref" | "variant">;

const Toggle = ({
  glossy,
  inverted,
  label,
  onClick,
  onToggle,
  pressed,
  ref,
  variant,
  ...props
}: ToggleProps) => {
  const {
    buttonRef,
    currentGlossy,
    currentInverted,
    currentLabel,
    currentVariant,
    handleClickEvent,
    isPressed,
    // eslint-disable-next-line react-compiler/react-compiler
  } = useToggle({
    glossy,
    inverted,
    label,
    onClick,
    onToggle,
    pressed,
    ref,
    variant,
  });

  return (
    <Button
      aria-pressed={isPressed}
      glossy={currentGlossy}
      inverted={currentInverted}
      label={currentLabel}
      onClick={handleClickEvent}
      role="switch"
      variant={currentVariant}
      {...props}
      ref={buttonRef}
    />
  );
};

export default Toggle;
