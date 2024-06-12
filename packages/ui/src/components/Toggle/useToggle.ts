import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent
} from "react";
import { Variant } from "../../types";
import type {
  ToggleProps,
  ToggleComponentRef,
} from "./Toggle";

export type UseToggleOptions = {
  ref?: ToggleProps["ref"];
  variant?: ToggleProps["variant"];
  pressed?: ToggleProps["pressed"];
  label?: ToggleProps["label"];
  onToggle?: ToggleProps["onToggle"];
  onClick?: ToggleProps["onClick"];
};

export const useToggle = ({
  ref,
  variant,
  pressed,
  label,
  onToggle,
  onClick
}: UseToggleOptions) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isPressed = useMemo(() => {
    if (pressed === true || pressed === "true") return true;
    if (pressed === false || pressed === "false") return false;
    return;
  }, [pressed]);

  const currentLabel: string | undefined = useMemo(() => {
    return Array.isArray(label) ? label[isPressed ? 1 : 0] : label;
  }, [label, isPressed]);

  const currentVariant: Variant | undefined = useMemo(() => {
    return Array.isArray(variant) ? variant[isPressed ? 1 : 0] : variant;
  }, [variant, isPressed]);

  const [pressedState, setPressedState] = useState<boolean>(isPressed ?? false);

  const handleToggle = useCallback(
    (event?: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
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

    },
    [isPressed, onToggle, pressedState]
  );

  const handleClickEvent = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
      handleToggle(event);
      if (onClick) onClick(event);
    },
    [handleToggle, onClick]
  );

  useImperativeHandle(
    ref,
    (): ToggleComponentRef => {
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

  useEffect(() => {
    if (isPressed === true) {
      setPressedState(true);
    }
    else if (isPressed === false) {
      setPressedState(false);
    }
  }, [isPressed, setPressedState]);

  return {
    handleClickEvent,
    currentLabel,
    currentVariant,
    isPressed,
    buttonRef,
  }
};
