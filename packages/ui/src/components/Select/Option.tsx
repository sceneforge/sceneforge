import type { AllHTMLAttributes } from "react";

import * as stylex from "@stylexjs/stylex";

import { Button, type ButtonProps } from "../Button";
import { UnlistedItem } from "../Unlisted";

export type OptionProps = {
  divider?: boolean;
  label?: string;
  onClick?: ButtonProps["onClick"];
  popoverId: string;
  selected?: boolean;
  value?: AllHTMLAttributes<HTMLOptionElement>["value"];
  variant?: ButtonProps["variant"];
};

const styles = stylex.create({
  container: {
    borderRadius: 0,
    textAlign: "start",
    width: "100%",
  },
  selected: {
    filter: "brightness(1.2)",
    fontWeight: "bold",
  },
});

const Option = ({
  divider,
  label,
  onClick,
  popoverId,
  selected,
  value,
  variant,
}: OptionProps) => {
  if (divider) {
    return (
      <UnlistedItem />
    );
  }
  return (
    <UnlistedItem>
      <Button
        onClick={onClick}
        popoverTarget={popoverId}
        popoverTargetAction="hide"
        style={[styles.container, selected && styles.selected]}
        tabIndex={selected ? 0 : -1}
        variant={variant}
      >
        {label ?? value}
      </Button>
    </UnlistedItem>
  );
};

export default Option;
