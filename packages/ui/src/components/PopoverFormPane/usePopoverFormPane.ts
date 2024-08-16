import {
  type MouseEvent as ReactMouseEvent,
  type Ref,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";

import type { FormPaneRef } from "../FormPane";
import type { PopoverRef } from "../Popover";

import { useCurrentId } from "../../hooks";

export interface PopoverFormPaneRef extends FormPaneRef, PopoverRef {
  get formPane(): FormPaneRef | null;
  get popover(): null | PopoverRef;
}

export type UsePopoverFormPaneProps = {
  id?: string;
  ref?: Ref<PopoverFormPaneRef>;
};

export const usePopoverFormPane = ({
  id,
  ref,
}: UsePopoverFormPaneProps) => {
  const currentId = useCurrentId(id);
  const formPaneRef = useRef<FormPaneRef>(null);
  const popoverRef = useRef<PopoverRef>(null);

  useImperativeHandle(ref, () => new (class implements PopoverFormPaneRef {
    focus() {
      formPaneRef.current?.focus();
    };

    hide() {
      popoverRef.current?.hide();
    };

    position(x: number, y: number) {
      popoverRef.current?.position(x, y);
    };

    reset() {
      formPaneRef.current?.reset();
    };

    show() {
      popoverRef.current?.show();
    }

    showPosition(
      event: PointerEvent | ReactMouseEvent<HTMLElement, MouseEvent>
    ) {
      popoverRef.current?.showPosition(event);
    }

    submit() {
      formPaneRef?.current?.submit();
    }

    get element(): HTMLDivElement | undefined {
      return popoverRef.current?.element;
    }

    get form(): HTMLFormElement | null {
      return formPaneRef.current?.form ?? null;
    }

    get formPane(): FormPaneRef | null {
      return formPaneRef.current;
    }

    get pane(): HTMLDivElement | null {
      return formPaneRef.current?.pane ?? null;
    }

    get popover(): null | PopoverRef {
      return popoverRef.current;
    }
  })(), [formPaneRef, popoverRef]);

  const closePopoverPane = useCallback(() => {
    popoverRef.current?.hide();
  }, [popoverRef]);

  return {
    closePopoverPane,
    currentId,
    formPaneRef,
    popoverRef,
  };
};
