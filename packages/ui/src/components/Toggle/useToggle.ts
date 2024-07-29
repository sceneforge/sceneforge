import {
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import type { ButtonProps } from "../Button";
import type {
  ToggleComponentRef,
  ToggleProps,
} from "./Toggle";

export type UseToggleOptions = {
  glossy?: ToggleProps["glossy"];
  inverted?: ToggleProps["inverted"];
  label?: ToggleProps["label"];
  onClick?: ToggleProps["onClick"];
  onToggle?: ToggleProps["onToggle"];
  pressed?: ToggleProps["pressed"];
  ref?: ToggleProps["ref"];
  variant?: ToggleProps["variant"];
};

export const useToggle = ({
  glossy,
  inverted,
  label,
  onClick,
  onToggle,
  pressed,
  ref,
  variant,
}: UseToggleOptions) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isPressed = useMemo(() => {
    if (pressed === true || pressed === "true") return true;
    if (pressed === false || pressed === "false") return false;
    return;
  }, [pressed]);

  const [pressedState, setPressedState] = useState<boolean>(isPressed ?? false);

  const currentLabel: ButtonProps["label"] | undefined = useMemo(() => {
    return Array.isArray(label) ? label[pressedState ? 1 : 0] : label;
  }, [label, pressedState]);

  const currentVariant: ButtonProps["variant"] | undefined = useMemo(() => {
    return Array.isArray(variant) ? variant[pressedState ? 1 : 0] : variant;
  }, [variant, pressedState]);

  const currentInverted: ButtonProps["inverted"] | undefined = useMemo(() => {
    return Array.isArray(inverted) ? inverted[pressedState ? 1 : 0] : inverted;
  }, [inverted, pressedState]);

  const currentGlossy: ButtonProps["glossy"] | undefined = useMemo(() => {
    return Array.isArray(glossy) ? glossy[pressedState ? 1 : 0] : glossy;
  }, [glossy, pressedState]);

  const handleToggle = useCallback(
    (
      event?: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
      preventBubble?: boolean
    ) => {
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
    [onToggle, pressedState]
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
      toggle(
        event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
        preventBubble?: boolean
      ) {
        handleToggle(event, preventBubble);
      }

      get button() {
        return buttonRef.current ?? undefined;
      }

      get pressed() {
        return pressedState;
      }

      set pressed(value: boolean) {
        setPressedState(value);
      }
    })(),
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
    buttonRef,
    currentGlossy,
    currentInverted,
    currentLabel,
    currentVariant,
    handleClickEvent,
    isPressed,
  };
};
