import {
  type Ref,
  type MouseEvent as ReactMouseEvent,
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
  toggle(event?: ReactMouseEvent<HTMLButtonElement, MouseEvent>, preventBubble?: boolean): void;
};

export type ToggleProps = Omit<ButtonProps, "ref" | "onToggle"> & {
  ref?: Ref<ToggleComponentRef>;
  label?: [string, string] | string;
  pressed?: "false" | "true" | boolean;
  variant?: [Variant, Variant] | Variant;
  onToggle?: (event: ToggleEvent) => void;
};

const Toggle = ({
  ref,
  label,
  pressed,
  variant,
  onToggle,
  onClick,
  ...props
}: ToggleProps) => {
  const {
    currentLabel,
    currentVariant,
    handleClickEvent,
    buttonRef,
    isPressed
  } = useToggle({ label, ref, variant, onToggle, onClick, pressed })

  return (
    <Button
      role="switch"
      aria-pressed={isPressed}
      label={currentLabel}
      variant={currentVariant}
      onClick={handleClickEvent}
      {...props}
      ref={buttonRef}
    />);
};

export default Toggle;
