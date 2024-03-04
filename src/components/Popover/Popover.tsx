import { createElement, useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { Button, type ButtonProps } from "../Button";

import styles from "./Popover.module.css";

export interface PopoverProps extends ButtonProps {
  title: string;
  className?: ButtonProps["className"];
  backdrop?: boolean;
}

export const Popover = ({ backdrop = false, title, className, children, ...props }: PopoverProps) => {
  const id = `popover-${uuid()}`;
  const [opened, setOpened] = useState(false);
  const classNames = [styles.wrapper, className].filter(Boolean).join(" ");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleBeforeToggle = useCallback((event: Event) => {
    if (event instanceof ToggleEvent) {
      setOpened(event.newState === "open");
      if (event.newState === "open") {
        if (buttonRef.current && buttonRef.current.checkVisibility()) {
          const rect = buttonRef.current.getBoundingClientRect();
          const x = rect.left;
          const y = rect.top;
          if (event.target instanceof HTMLElement) {
            const popoverRect = event.target.getBoundingClientRect();
            const width = popoverRect.width || 0;
            const height = popoverRect.height || 0;
            event.target.style.insetInlineStart = `${(x - (width / 2))}px`;
            event.target.style.insetBlockStart = `calc(${y - height}px - 1rem)`;
          }
        }
      }
    }
  }, [buttonRef, setOpened]);

  useEffect(() => {
    const popover = (popoverRef.current && popoverRef.current instanceof HTMLElement) ? popoverRef.current : null;

    if (popover) {
      popover.addEventListener("toggle", handleBeforeToggle, { passive: true });
      return () => {
        popover.removeEventListener("toggle", handleBeforeToggle);
      }
    }
  }, [handleBeforeToggle, popoverRef]);

  return [
    createElement(Button, {
      ...props,
      key: "button",
      ref: buttonRef,
      className: classNames,
      popovertarget: id,
      tabIndex: -1,
      "aria-pressed": opened ? "true" : "false",
      "aria-label": title,
      "aria-haspopup": "dialog",
      "aria-details": id,
    }, title),
    createElement("div", {
      ref: popoverRef,
      key: "popover",
      popover: "auto",
      "data-no-backdrop": backdrop ? "false" : "true",
      id,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": title,
    }, children)
  ];
}