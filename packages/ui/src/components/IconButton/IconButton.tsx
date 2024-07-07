import * as stylex from "@stylexjs/stylex";

import { Button, type ButtonProps } from "../Button";
import { Icon, IconProps } from "../Icon";

export type IconButtonProps = {
  icon: IconProps["icon"];
  size?: IconProps["size"];
} & Omit<ButtonProps, "children">;

const styles = stylex.create({
  container: {
    alignItems: "center",
    aspectRatio: 1,
    borderRadius: "100vw",
    display: "flex",
    justifyContent: "center",
  },
  icon: {
    pointerEvents: "none",
    touchAction: "none",
  },
});

const IconButton = ({
  icon,
  padding = 0.5,
  scale = true,
  size,
  style,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      {...props}
      padding={padding}
      scale={scale}
      style={[styles.container, style]}
    >
      <Icon
        icon={icon}
        size={size}
        style={styles.icon}
      />
    </Button>
  );
};

export default IconButton;
