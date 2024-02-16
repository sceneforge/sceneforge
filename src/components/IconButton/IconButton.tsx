import { Button, type ButtonProps } from "../Button";
import { Icon, type IconProps } from "../Icon";

export type IconButtonProps = IconProps & {
  size?: ButtonProps["size"];
  onClick?: ButtonProps["onClick"]
  onContextMenu?: ButtonProps["onContextMenu"];
}

export const IconButton = ({ onClick, onContextMenu, size, ...props }: IconButtonProps) => {
  return (
    <Button
      clear
      size={size}
      onClick={onClick}
      onContextMenu={onContextMenu}>
      <Icon {...props} />
    </Button>
  );
}