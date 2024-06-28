import { Button, type ButtonProps } from "../Button";
import { Dropdown, type DropdownProps } from "../Dropdown";
import { IconButton, type IconButtonProps } from "../IconButton";
import { Toggle, type ToggleProps } from "../Toggle";

type ButtonActionProps = { kind: "button" | undefined } & ButtonProps;
type DropdownActionProps = { kind: "dropdown" } & DropdownProps;
type IconButtonActionProps = { kind: "icon" } & IconButtonProps;
type ToggleActionProps = { kind: "toggle" } & ToggleProps;

export type ActionProps =
  | ButtonActionProps
  | DropdownActionProps
  | IconButtonActionProps
  | ToggleActionProps;

const Action = ({ kind, ...props }: ActionProps) => {
  switch (kind) {
    case "dropdown":
      return (<Dropdown {...props as DropdownProps} />);
    case "icon":
      return (<IconButton {...props as IconButtonProps} />);
    case "toggle":
      return (<Toggle {...props as ToggleProps} />);
    default:
      return (<Button {...props as ButtonProps} />);
  };
};

export default Action;
