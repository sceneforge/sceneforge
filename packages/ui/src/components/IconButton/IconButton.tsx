import * as stylex from "@stylexjs/stylex";

import { Shape } from "../../types";
import { Button, type ButtonProps } from "../Button";
import { Icon, IconProps } from "../Icon";

export type IconButtonProps = {
  icon: IconProps["icon"];
  size?: IconProps["size"];
} & Omit<ButtonProps, "children">;

const styles = stylex.create({
  container: {
    aspectRatio: 1,
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
  shape = Shape.Squircle,
  size,
  style,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      {...props}
      padding={padding}
      scale={scale}
      shape={shape}
      style={[
        styles.container,
        style,
      ]}
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
