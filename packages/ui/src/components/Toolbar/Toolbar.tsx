import * as stylex from "@stylexjs/stylex";
import { useId } from "react";

import { Action, ActionProps } from "../Action";

export type ToolbarProps = {
  actions?: ActionProps[];
  id?: string;
};

const styles = stylex.create({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexShrink: 1,
    gap: "0.5rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
});

const Toolbar = ({ actions, id }: ToolbarProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;
  if (!actions || actions.length === 0) return;

  return (
    <ul id={currentId} {...stylex.props(styles.container)}>
      {actions.map((action, index) => (
        <li key={`${currentId}-action-${index}`}>
          <Action {...action} />
        </li>
      ))}
    </ul>
  );
};

export default Toolbar;
