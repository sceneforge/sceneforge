import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type Ref, useId } from "react";

import type { Variant } from "../../types";

import { Action, type ActionProps } from "../Action";

export type ActionListProps = {
  actions?: ActionProps[];
  anchor?: string;
  id?: string;
  popover?: "auto" | "manual";
  ref?: Ref<HTMLUListElement>;
  style?: StyleXStyles;
  variant?: Variant;
};

const ActionList = ({
  actions,
  anchor,
  id,
  popover,
  ref,
  style,
}: ActionListProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;
  if (!actions || actions.length === 0) return null;

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
