import * as stylex from "@stylexjs/stylex";

import { Button, type ButtonProps } from "../Button";
import { Card, type CardProps } from "../Card";

export type CardButtonProps = {
  id?: ButtonProps["id"];
  onClick?: ButtonProps["onClick"];
  popovertarget?: ButtonProps["popovertarget"];
  ref?: ButtonProps["ref"];
} & Omit<CardProps, "actions">;

const styles = stylex.create({
  container: {
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "0.5rem",
    color: "inherit",
    height: "100%",
    margin: 0,
    padding: 0,
    width: "100%",
  },
});

const CardButton = ({
  id,
  onClick,
  popovertarget,
  ref,
  ...props
}: CardButtonProps) => {
  return (
    <Button
      clear
      id={id}
      onClick={onClick}
      popovertarget={popovertarget}
      ref={ref}
      style={[styles.container]}
    >
      <Card {...props} />
    </Button>
  );
};

export default CardButton;
