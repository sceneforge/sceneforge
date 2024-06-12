import { useId } from "react";
import type { Variant } from "../../types";
import { Action, type ActionProps } from "../Action";

export type ActionListProps = {
  id?: string;
  anchor?: string;
  actions?: ActionProps[];
  popover?: "manual" | "auto";
  variant?: Variant
};

const ActionList = ({
  id,
  actions,
  anchor,
  popover,
}: ActionListProps) => {
  const currentId = id ?? useId();
  if (!actions) return null;

  return (
    <ul
      anchor={anchor}
      id={currentId}
      popover={popover}
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
