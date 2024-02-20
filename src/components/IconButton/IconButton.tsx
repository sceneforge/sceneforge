import { Button, type ButtonProps } from "../Button";
import { Icon, type IconProps } from "../Icon";

export type IconButtonProps = IconProps & {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  title?: string;
  label?: string;
  size?: ButtonProps["size"];
  onClick?: ButtonProps["onClick"]
  onContextMenu?: ButtonProps["onContextMenu"];
};

export const IconButton = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  title,
  onClick,
  onContextMenu,
  size = "sm",
  ...props
}: IconButtonProps) => {
  return (
    <Button
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      clear
      data-icon-button
      size={size}
      title={title}
      onClick={onClick} onContextMenu={onContextMenu}>
      <Icon {...props} />
    </Button>
  );
};
