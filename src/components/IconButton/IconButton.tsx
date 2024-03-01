import { Button, type ButtonProps } from "../Button";
import { Icon, type IconProps } from "../Icon";

import styles from "./IconButton.module.css";

export type IconButtonProps = IconProps & {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  title?: string;
  label?: string;
  size?: ButtonProps["size"];
  onClick?: ButtonProps["onClick"]
  onContextMenu?: ButtonProps["onContextMenu"];
  variant?: ButtonProps["variant"];
};

export const IconButton = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  title,
  onClick,
  onContextMenu,
  size = "sm",
  variant,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={styles.wrapper}
      clear
      data-icon-button
      size={size}
      title={title}
      variant={variant}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <Icon {...props} />
    </Button>
  );
};
