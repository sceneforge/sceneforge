import { Button, type ButtonProps } from "../Button";
import { Dropdown, type DropdownProps } from "../Dropdown";
import { IconButton, type IconButtonProps } from "../IconButton";
import { Toggle, type ToggleProps } from "../Toggle";

type ButtonActionProps = { type: "button" } & ButtonProps;
type DropdownActionProps = { type: "dropdown" } & DropdownProps;
type IconButtonActionProps = { type: "icon" } & IconButtonProps;
type ToggleActionProps = { type: "toggle" } & ToggleProps;

export type ActionProps =
  | ButtonActionProps
  | DropdownActionProps
  | IconButtonActionProps
  | ToggleActionProps;

const Action = ({ type, ...props }: ActionProps) => {
  switch (type) {
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
