import { Button, type ButtonProps } from "../Button";
import { IconButton, type IconButtonProps } from "../IconButton";

export type ActionProps = (ButtonProps & { icon?: never }) | IconButtonProps;

export const Action = (props: ActionProps) => {
  if (props.icon) {
    return <IconButton {...(props as IconButtonProps)} />;
  }
  return <Button {...(props as ButtonProps)} />;
};
