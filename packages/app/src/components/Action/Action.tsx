import { type ForwardedRef, forwardRef } from "react";

import { Button, type ButtonComponent, type ButtonProps } from "../Button";
import { Dropdown, type DropdownProps } from "../Dropdown";
import { IconButton, type IconButtonProps } from "../IconButton";

export type ActionProps = {
  clearDropdown?: () => void;
  parentDropdown?: string;
} & (
  | ({
    contentVariant?: never;
    icon?: never;
    items?: never;
  } & ButtonProps)
  | ({
    contentVariant?: never;
    items?: never;
  } & IconButtonProps)
  | DropdownProps
);

export const Action = forwardRef(function Action(
  { clearDropdown, contentVariant, parentDropdown, ...props }: ActionProps,
  ref: ForwardedRef<ButtonComponent>
) {
  if (props.items) {
    return (
      <Dropdown
        {...(props as DropdownProps)}
        clearDropdown={clearDropdown}
        contentVariant={contentVariant}
        parentDropdown={parentDropdown}
        ref={ref}
      />
    );
  }
  else if (props.icon) {
    return <IconButton {...(props as IconButtonProps)} ref={ref} />;
  }
  else {
    return <Button {...(props as ButtonProps)} ref={ref} />;
  }
});
