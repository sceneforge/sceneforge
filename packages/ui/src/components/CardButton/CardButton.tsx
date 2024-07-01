import * as stylex from "@stylexjs/stylex";

import { Button, type ButtonProps } from "../Button";
import { Card, type CardProps } from "../Card";

export type CardButtonProps = {
  margin?: ButtonProps["margin"];
  onClick?: ButtonProps["onClick"];
  popoverTarget?: ButtonProps["popoverTarget"];
  popoverTargetAction?: ButtonProps["popoverTargetAction"];
  ref?: ButtonProps["ref"];
  scale?: ButtonProps["scale"];
  tabIndex?: ButtonProps["tabIndex"];
} & Omit<CardProps, "actions">;

const styles = stylex.create({
  container: {
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "0.5rem",
    color: "inherit",
    height: "100%",
    width: "100%",
  },
});

const CardButton = ({
  id,
  margin = 0,
  onClick,
  popoverTarget,
  popoverTargetAction,
  ref,
  scale = true,
  tabIndex,
  variant,
  ...props
}: CardButtonProps) => {
  return (
    <Button
      id={id}
      margin={margin}
      onClick={onClick}
      padding={0}
      popoverTarget={popoverTarget}
      popoverTargetAction={popoverTargetAction}
      ref={ref}
      scale={scale}
      style={styles.container}
      tabIndex={tabIndex}
      variant={variant}
    >
      <Card {...props} variant={variant} />
    </Button>
  );
};

export default CardButton;
