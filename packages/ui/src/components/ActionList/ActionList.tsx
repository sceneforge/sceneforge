import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { type Ref, useId } from "react";
import type { Variant } from "../../types";
import { Action, type ActionProps } from "../Action";

export type ActionListProps = {
  id?: string;
  anchor?: string;
  actions?: ActionProps[];
  popover?: "manual" | "auto";
  variant?: Variant;
  ref?: Ref<HTMLUListElement>;
  style?: StyleXStyles;
};

const ActionList = ({
  id,
  actions,
  anchor,
  popover,
  ref,
  style,
}: ActionListProps) => {
  const currentId = id ?? useId();
  if (!actions || actions.length < 1) return null;

  return (
    <ul
      anchor={anchor}
      id={currentId}
      popover={popover}
      ref={ref}
      {...stylex.props(style)}
    >
      {actions.map((action, index) => (
        <li key={`${currentId}-action-${index}`}>
          <Action {...action} />
        </li>
      ))}
    </ul>
  );
};

export default ActionList;
