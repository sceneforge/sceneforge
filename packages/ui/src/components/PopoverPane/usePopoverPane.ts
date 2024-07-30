import { type Ref, useCallback, useImperativeHandle, useRef } from "react";

import type { PopoverRef } from "../Popover";

export type UsePopoverPaneProps = {
  ref?: Ref<PopoverRef>;
};

export const usePopoverPane = ({
  ref,
}: UsePopoverPaneProps) => {
  const popoverRef = useRef<PopoverRef>(null);

  useImperativeHandle(ref, () => {
    return popoverRef.current as PopoverRef;
  }, [popoverRef]);

  const closePopoverPane = useCallback(() => {
    popoverRef.current?.hide();
  }, [popoverRef]);

  return {
    closePopoverPane,
    popoverRef,
  };
};
