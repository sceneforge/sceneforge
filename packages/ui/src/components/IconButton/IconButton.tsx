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
    ":hover": {
      transform: "scale(1.2)",
    },
    "alignItems": "center",
    "aspectRatio": 1,
    "borderRadius": "100vw",
    "display": "flex",
    "justifyContent": "center",
    "margin": 0,
    "padding": "calc(inherit / 2)",
    "transition": "transform 0.2s ease-in-out",
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
