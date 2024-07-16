import * as stylex from "@stylexjs/stylex";

import { roundedStyles } from "../../borders.stylex";
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
  size,
  squircle = true,
  style,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      {...props}
      padding={padding}
      scale={scale}
      squircle={squircle}
      style={[
        styles.container,
        !squircle && roundedStyles.circle,
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
