import { type MouseEvent, useCallback, useEffect, useRef, useState } from "react";

import type { TabCloseCallback } from "./TabPanel";

export type UseTabProps = {
  afterClose?: TabCloseCallback;
  beforeClose?: TabCloseCallback;
  closeable?: boolean;
  id: string;
  onTabChange?: (id: string) => void;
  onTabClose?: (id: string) => void;
};

export const useTab = ({
  afterClose,
  beforeClose,
  closeable,
  id,
  onTabChange,
  onTabClose,
}: UseTabProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [pressed, setPressed] = useState(false);
  const [button, setButton] = useState<null | PointerEvent["button"]>(null);

  const handleTabChange = useCallback((
    event: MouseEvent<HTMLButtonElement> | PointerEvent
  ) => {
    event.preventDefault();
    onTabChange?.(id);
  }, [onTabChange, id]);

  const handleTabClose = useCallback((
    event: MouseEvent<HTMLButtonElement> | PointerEvent
  ) => {
    if (!closeable) return;

    event.preventDefault();
    if (beforeClose) {
      Promise.resolve(beforeClose()).then(() => {
        onTabClose?.(id);
        return afterClose?.();
      })
        .catch((error: unknown) => {
          throw new Error(`Tab ${id}: Error closing tab`, {
            cause: { error, id },
          });
        });
    }
    else {
      onTabClose?.(id);
      Promise.resolve(afterClose?.()).catch((error: unknown) => {
        throw new Error(`Tab ${id}: Error closing tab`, {
          cause: { error, id },
        });
      });
    }
  }, [afterClose, beforeClose, closeable, id, onTabClose]);

  const handlePointerDown = useCallback((event: PointerEvent) => {
    setButton(event.button);
    setPressed(true);
  }, []);

  const handlePointerUp = useCallback((event: PointerEvent) => {
    if (
      pressed
      && button !== null
      && button === event.button
      && event.target === buttonRef.current
    ) {
      switch (event.button) {
        case 0:
          handleTabChange(event);
          break;
        case 1:
          handleTabClose(event);
          break;
      }
    }
    setPressed(false);
    setButton(null);
  }, [pressed, button, handleTabChange, handleTabClose, buttonRef]);

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      button.addEventListener("pointerdown", handlePointerDown);
      document.addEventListener("pointerup", handlePointerUp);
      return () => {
        button.removeEventListener("pointerdown", handlePointerDown);
        document.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [buttonRef, handlePointerDown, handlePointerUp]);

  return {
    buttonRef,
    handleTabClose,
  };
};
