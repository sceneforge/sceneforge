import * as stylex from "@stylexjs/stylex";
import { Button, type ButtonProps } from "../Button";
import { Icon, IconProps } from "../Icon";

export type IconButtonProps = ButtonProps & {
  icon: IconProps["icon"];
  size?: IconProps["size"];
  inverted?: boolean;
};

const styles = stylex.create({
  container: {
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "50%",
  },
  icon: {
    pointerEvents: "none",
    touchAction: "none",
  },
});

const IconButton = ({
  icon,
  size,
  variant,
  inverted,
  style,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      {...props}
      variant={!inverted ? variant : undefined}
      style={[styles.container, style]}
    >
      <Icon
        icon={icon}
        size={size}
        variant={inverted ? variant : undefined}
        style={styles.icon}
      />
    </Button>
  );
};

export default IconButton;
