import { Orientation } from "../../types";
import { Button, type ButtonProps } from "../Button";
import { Divider, type DividerProps } from "../Divider";
import { Dropdown, type DropdownProps } from "../Dropdown";
import { IconButton, type IconButtonProps } from "../IconButton";
import { Toggle, type ToggleProps } from "../Toggle";

type ButtonActionProps = { kind: "button" | undefined } & Omit<ButtonProps, "children">;
type DropdownActionProps = { kind: "dropdown" } & Omit<DropdownProps, "children">;
type IconButtonActionProps = { kind: "icon" } & IconButtonProps;
type ToggleActionProps = { kind: "toggle" } & Omit<ToggleProps, "children">;

type DividerActionProps = {
  [key: string]: unknown;
  kind: "divider";
} & Omit<DividerProps, "orientation">;

type ActionItemProps =
  | ButtonActionProps
  | DividerActionProps
  | DropdownActionProps
  | IconButtonActionProps
  | ToggleActionProps;

export type ActionProps = {
  listOrientation?: Orientation;
} & ActionItemProps;

const Action = ({ kind, listOrientation, ...props }: ActionProps) => {
  switch (kind) {
    case "divider":
      return (
        <Divider
          orientation={
            listOrientation === Orientation.Horizontal
              ? Orientation.Vertical
              : Orientation.Horizontal
          }
          {...props as Omit<DividerProps, "orientation">}
        />
      );
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
