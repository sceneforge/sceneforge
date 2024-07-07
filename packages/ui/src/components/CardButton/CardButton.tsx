import * as stylex from "@stylexjs/stylex";

import { Button, type ButtonProps } from "../Button";
import { Card, type CardProps } from "../Card";

export type CardButtonProps = {
  hidden?: ButtonProps["hidden"];
  margin?: ButtonProps["margin"];
  onClick?: ButtonProps["onClick"];
  popoverTarget?: ButtonProps["popoverTarget"];
  popoverTargetAction?: ButtonProps["popoverTargetAction"];
  ref?: ButtonProps["ref"];
  tabIndex?: ButtonProps["tabIndex"];
} & Omit<
  CardProps,
  | "actions"
  | "actionsMargin"
  | "actionsPadding"
  | "actionsStyle"
  | "hidden"
  | "popover"
>;

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
  hidden,
  id,
  margin = 0,
  onClick,
  popoverTarget,
  popoverTargetAction,
  ref,
  tabIndex,
  variant,
  ...props
}: CardButtonProps) => {
  return (
    <Button
      hidden={hidden}
      id={id}
      margin={margin}
      onClick={onClick}
      padding={0}
      popoverTarget={popoverTarget}
      popoverTargetAction={popoverTargetAction}
      ref={ref}
      style={styles.container}
      tabIndex={tabIndex}
      variant={variant}
    >
      <Card {...props} variant={variant} />
    </Button>
  );
};

export default CardButton;
