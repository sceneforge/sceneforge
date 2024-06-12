import * as stylex from "@stylexjs/stylex";
import { useId } from "react";
import { Action, ActionProps } from "../Action";

export type ToolbarProps = {
  id?: string;
  actions?: ActionProps[];
};

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "row",
    margin: 0,
    padding: 0,
    listStyle: "none",
    gap: "0.5rem",
  }

});

const Toolbar = ({ id, actions }: ToolbarProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;
  if (!actions || actions.length < 1) return;

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
