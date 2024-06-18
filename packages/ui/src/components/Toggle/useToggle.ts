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

  const [pressedState, setPressedState] = useState<boolean>(isPressed ?? false);

  const currentLabel: string | undefined = useMemo(() => {
    return Array.isArray(label) ? label[pressedState ? 1 : 0] : label;
  }, [label, pressedState]);

  const currentVariant: Variant | undefined = useMemo(() => {
    return Array.isArray(variant) ? variant[pressedState ? 1 : 0] : variant;
  }, [variant, pressedState]);

  const handleToggle = useCallback(
    (event?: ReactMouseEvent<HTMLButtonElement, MouseEvent>, preventBubble?: boolean) => {
      setPressedState(previous => !previous);
      if (!preventBubble && onToggle) {
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
    () => new (class implements ToggleComponentRef {
      get button() {
        return buttonRef.current ?? undefined;
      }

      get pressed() {
        return pressedState;
      }

      set pressed(value: boolean) {
        setPressedState(value);
      }

      toggle(event: ReactMouseEvent<HTMLButtonElement, MouseEvent>, preventBubble?: boolean) {
        handleToggle(event, preventBubble);
      }
    }),
    [buttonRef, pressedState, handleToggle]
  );

  useEffect(() => {
    if (isPressed === true) {
      setPressedState(true);
    }
    else if (isPressed === false) {
      setPressedState(false);
    }
  }, [isPressed]);

  return {
    handleClickEvent,
    currentLabel,
    currentVariant,
    isPressed,
    buttonRef,
  }
};
