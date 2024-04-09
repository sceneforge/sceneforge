import { type ForwardedRef, forwardRef } from "react";
import { Button, type ButtonProps, type ButtonComponent } from "../Button";
import { Dropdown, type DropdownProps } from "../Dropdown";
import { IconButton, type IconButtonProps } from "../IconButton";

export type ActionProps = (
  | (ButtonProps & {
      icon?: never;
      items?: never;
      contentVariant?: never;
    })
  | (IconButtonProps & {
      items?: never;
      contentVariant?: never;
    })
  | DropdownProps
) & { parentDropdown?: string; clearDropdown?: () => void };

export const Action = forwardRef(function Action(
  { contentVariant, parentDropdown, clearDropdown, ...props }: ActionProps,
  ref: ForwardedRef<ButtonComponent>
) {
  if (props.items) {
    return (
      <Dropdown
        {...(props as DropdownProps)}
        contentVariant={contentVariant}
        parentDropdown={parentDropdown}
        clearDropdown={clearDropdown}
        ref={ref}
      />
    );
  } else if (props.icon) {
    return <IconButton {...(props as IconButtonProps)} ref={ref} />;
  } else {
    return <Button {...(props as ButtonProps)} ref={ref} />;
  }
});
