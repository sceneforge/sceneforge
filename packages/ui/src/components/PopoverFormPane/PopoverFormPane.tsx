import type { Ref } from "react";

import { Align, IconEnum, Shape } from "../../types";
import { FormPane, type FormPaneProps } from "../FormPane";
import { Popover, type PopoverProps } from "../Popover";
import { type PopoverFormPaneRef, usePopoverFormPane } from "./usePopoverFormPane";

export type PopoverFormPaneProps = {
  align?: PopoverProps["align"];
  defaultX?: PopoverProps["defaultX"];
  defaultY?: PopoverProps["defaultY"];
  ref?: Ref<PopoverFormPaneRef>;
  variant?: PopoverProps["variant"];
  verticalAlign?: PopoverProps["verticalAlign"];
} & Omit<FormPaneProps, "ref">;

const PopoverFormPane = ({
  actions,
  align = Align.Center,
  defaultX,
  defaultY,
  id,
  ref,
  variant,
  verticalAlign = Align.Start,
  ...props
}: PopoverFormPaneProps) => {
  const {
    closePopoverPane,
    currentId,
    formPaneRef,
    popoverRef,
  } = usePopoverFormPane({
    id,
    ref,
  });

  return (
    <Popover
      align={align}
      defaultX={defaultX}
      defaultY={defaultY}
      id={currentId}
      ref={popoverRef}
      shape={Shape.Rounded}
      variant={variant}
      verticalAlign={verticalAlign}
    >
      <FormPane
        {...props}
        actions={[
          ...(actions ?? []),
          {
            dense: true,
            icon: IconEnum.Close,
            kind: "icon",
            label: "Close",
            onClick: closePopoverPane,
            scale: false,
          },
        ]}
        id={`${currentId}-form`}
        ref={formPaneRef}
      />
    </Popover>
  );
};

export default PopoverFormPane;
