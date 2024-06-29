import * as stylex from "@stylexjs/stylex";
import { useId } from "react";

import { Action, ActionProps } from "../Action";
import { type SpacerStyleProps, marginStyle, paddingStyle } from "../tokens.stylex";

export type ToolbarProps = {
  actions?: ActionProps[];
  id?: string;
  margin?: SpacerStyleProps;
  padding?: SpacerStyleProps;
  scaleActions?: ActionProps["scale"];
};

const styles = stylex.create({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexShrink: 1,
    gap: "0.5rem",
    listStyle: "none",
  },
});

const Toolbar = ({
  actions,
  id,
  margin = 0,
  padding = 0,
  scaleActions,
}: ToolbarProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;
  if (!actions || actions.length === 0) return;

  return (
    <ul
      id={currentId}
      {...stylex.props(
        styles.container,
        ...(margin === undefined ? [] : marginStyle(margin)),
        ...(padding === undefined ? [] : paddingStyle(padding))
      )}
    >
      {actions.map((action, index) => (
        <li key={`${currentId}-action-${index}`}>
          <Action dense scale={scaleActions} {...action} />
        </li>
      ))}
    </ul>
  );
};

export default Toolbar;
