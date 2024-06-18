import * as stylex from "@stylexjs/stylex";

import { Button, type ButtonProps } from "../Button";
import { Icon, IconProps } from "../Icon";

export type IconButtonProps = {
  icon: IconProps["icon"];
  inverted?: boolean;
  size?: IconProps["size"];
} & ButtonProps;

const styles = stylex.create({
  container: {
    borderRadius: "50%",
    height: "2.5rem",
    width: "2.5rem",
  },
  icon: {
    pointerEvents: "none",
    touchAction: "none",
  },
});

const IconButton = ({
  icon,
  inverted,
  size,
  style,
  variant,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      {...props}
      style={[styles.container, style]}
      variant={inverted ? undefined : variant}
    >
      <Icon
        icon={icon}
        size={size}
        style={styles.icon}
        variant={inverted ? variant : undefined}
      />
    </Button>
  );
};

export default IconButton;
