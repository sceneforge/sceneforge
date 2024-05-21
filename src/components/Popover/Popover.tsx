import {
  type ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import type { Variant } from "../../types/variants";

import {
  Button,
  type ButtonComponent,
  type ButtonProps,
  type ToggleProps,
} from "../Button";

export type PopoverProps = {
  label?: string;
  variant?: Variant;
} & Omit<ButtonProps, keyof ToggleProps>;

export const Popover = forwardRef(function Popover(
  { children, id, label, ...props }: PopoverProps,
  ref: ForwardedRef<ButtonComponent>
) {
  const genId = useId();
  const [opened, setOpened] = useState(false);
  const currentId = useMemo(() => id || genId, [genId, id]);
  const popoverId = useMemo(() => `${currentId}-popover`, [currentId]);

  const buttonRef = useRef<ButtonComponent>(null);

  useImperativeHandle(
    ref,
    () =>
      buttonRef.current ?? {
        button: undefined,
        pressed: false,
        toggle: () => {},
      },
    [buttonRef]
  );

  const popoverRef = useRef<HTMLDivElement>(null);

  const handleBeforeToggle = useCallback(
    (event: Event) => {
      if (event instanceof ToggleEvent) {
        setOpened(event.newState === "open");
        if (event.newState === "open"
          && buttonRef.current?.button
          && buttonRef.current.button.checkVisibility()
        ) {
          const rect = buttonRef.current?.button.getBoundingClientRect();
          const x = rect.left;
          const y = rect.top;
          if (event.target instanceof HTMLElement) {
            const popoverRect = event.target.getBoundingClientRect();
            const width = popoverRect.width || 0;
            const height = popoverRect.height || 0;
            event.target.style.insetInlineStart = `${x - width / 2}px`;
            event.target.style.insetBlockStart = `calc(${
              y - height
            }px - 1rem)`;
          }
        }
      }
    },
    [buttonRef, setOpened]
  );

  useEffect(() => {
    const popover
      = popoverRef.current && popoverRef.current instanceof HTMLElement
        ? popoverRef.current
        : null;

    if (popover) {
      popover.addEventListener("toggle", handleBeforeToggle, { passive: true });
      return () => {
        popover.removeEventListener("toggle", handleBeforeToggle);
      };
    }
  }, [handleBeforeToggle, popoverRef]);

  return (
    <div className="relative">
      <Button
        key="button"
        popovertarget={popoverId}
        ref={buttonRef}
        {...props}
        aria-details={popoverId}
        aria-haspopup="dialog"
        aria-label={label}
        className={props.className ?? "bg-transparent b-none m-0 p-0"}
        id={currentId}
        tabIndex={-1}
      >
        {label}
      </Button>
      <div
        aria-hidden={!opened}
        aria-label={label}
        aria-modal="true"
        className="fixed inset-0"
        id={popoverId}
        key="popover"
        popover="auto"
        ref={popoverRef}
        role="dialog"
      >
        {children}
      </div>
    </div>
  );
});
