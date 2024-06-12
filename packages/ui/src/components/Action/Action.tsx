import { Button, type ButtonProps } from "../Button";
import { Dropdown, type DropdownProps } from "../Dropdown";
import { IconButton, type IconButtonProps } from "../IconButton";
import { Toggle, type ToggleProps } from "../Toggle";

type ButtonActionProps = ButtonProps & { type: "button" };
type DropdownActionProps = DropdownProps & { type: "dropdown" };
type IconButtonActionProps = IconButtonProps & { type: "icon" };
type ToggleActionProps = ToggleProps & { type: "toggle" };

export type ActionProps = ButtonActionProps | DropdownActionProps | IconButtonActionProps | ToggleActionProps;

const Action = ({ type, ...props }: ActionProps) => {
  switch (type) {
    case "dropdown":
      return (<Dropdown {...props as DropdownProps} />);
    case "icon":
      return (<IconButton {...props as IconButtonProps} />);
    case "toggle":
      return (<Toggle {...props as ToggleProps} />);
    case "button":
    default:
      return (<Button {...props as ButtonProps} />);
  };
};

export default Action;
