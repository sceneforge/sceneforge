import {
  type MouseEvent as ReactMouseEvent,
  type Ref,
} from "react";

import { Variant } from "../../types";
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

export type ToggleProps = {
  label?: [string, string] | string;
  onToggle?: (event: ToggleEvent) => void;
  pressed?: "false" | "true" | boolean;
  ref?: Ref<ToggleComponentRef>;
  variant?: [Variant, Variant] | Variant;
} & Omit<ButtonProps, "label" | "onToggle" | "ref" | "variant">;

const Toggle = ({
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
    currentLabel,
    currentVariant,
    handleClickEvent,
    isPressed,
  } = useToggle({ label, onClick, onToggle, pressed, ref, variant });

  return (
    <Button
      aria-pressed={isPressed}
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
