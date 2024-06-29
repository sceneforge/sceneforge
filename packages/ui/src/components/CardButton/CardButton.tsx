import * as stylex from "@stylexjs/stylex";

import { Button, type ButtonProps } from "../Button";
import { Card, type CardProps } from "../Card";

export type CardButtonProps = {
  id?: ButtonProps["id"];
  onClick?: ButtonProps["onClick"];
  popoverTarget?: ButtonProps["popoverTarget"];
  popoverTargetAction?: ButtonProps["popoverTargetAction"];
  ref?: ButtonProps["ref"];
  scale?: boolean;
  tabIndex?: ButtonProps["tabIndex"];
} & Omit<CardProps, "actions">;

const styles = stylex.create({
  container: {
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "0.5rem",
    color: "inherit",
    cursor: "pointer",
    height: "100%",
    margin: 0,
    padding: 0,
    width: "100%",
  },
  scale: {
    scale: {
      ":focus-visible": 1.1,
      ":hover": 1.1,
      "default": 1,
    },
    transition: "scale 0.12s ease-in-out",
  },
});

const CardButton = ({
  id,
  onClick,
  popoverTarget,
  popoverTargetAction,
  ref,
  scale = true,
  tabIndex = 0,
  ...props
}: CardButtonProps) => {
  return (
    <Button
      clear
      id={id}
      onClick={onClick}
      popoverTarget={popoverTarget}
      popoverTargetAction={popoverTargetAction}
      ref={ref}
      style={[
        styles.container,
        scale && styles.scale,
      ]}
      tabIndex={tabIndex}
    >
      <Card {...props} />
    </Button>
  );
};

export default CardButton;
