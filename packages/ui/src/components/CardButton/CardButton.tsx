import * as stylex from "@stylexjs/stylex";
import { Button, type ButtonProps } from "../Button";
import { Card, type CardProps } from "../Card";

export type CardButtonProps = Omit<CardProps, "actions"> & {
  id?: ButtonProps["id"];
  onClick?: ButtonProps["onClick"];
  ref?: ButtonProps["ref"];
  popovertarget?: ButtonProps["popovertarget"];
};

const styles = stylex.create({
  container: {
    border: "none",
    margin: 0,
    padding: 0,
    width: "100%",
    height: "100%",
    borderRadius: "0.5rem",
    backgroundColor: "transparent",
    color: "inherit",
  }
});

const CardButton = ({ id, onClick, ref, popovertarget, ...props }: CardButtonProps) => {
  return (
    <Button
      id={id}
      onClick={onClick}
      ref={ref}
      popovertarget={popovertarget}
      clear
      style={[styles.container]}
    >
      <Card {...props} />
    </Button>
  );
};

export default CardButton;
