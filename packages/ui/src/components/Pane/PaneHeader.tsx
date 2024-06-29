import * as stylex from "@stylexjs/stylex";
import { useId } from "react";

import { Heading, HeadingProps } from "../Heading";
import { Toolbar, ToolbarProps } from "../Toolbar";
import { backgroundColor } from "../tokens.stylex";

export type PaneHeaderProps = {
  actions?: ToolbarProps["actions"];
  headingPadding?: HeadingProps["padding"];
  id?: string;
  inner?: boolean;
  level?: HeadingProps["level"];
  scaleActions?: ToolbarProps["scaleActions"];
  title: string;
  toolbarPadding?: ToolbarProps["padding"];
};

const styles = stylex.create({
  container: {
    alignItems: "center",
    backgroundColor: backgroundColor.alpha15,
    borderColor: backgroundColor.alpha10,
    borderStyle: "solid",
    borderWidth: "1px",
    display: "flex",
    flexDirection: "row",
    flexShrink: 1,
    gap: "0.5rem",
    height: "2.5rem",
    justifyContent: "stretch",
    overflow: "clip",
  },
  heading: {
    flexGrow: 1,
    fontSize: "1.125rem",
    textOverflow: "ellipsis",
  },
  inner: {
    borderStartEndRadius: "0.25rem",
    borderStartStartRadius: "0.25rem",
  },
});

const PaneHeader = ({
  actions,
  headingPadding = 0,
  id,
  inner = true,
  level = 2,
  scaleActions = true,
  title,
  toolbarPadding = 0,
}: PaneHeaderProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;

  return (
    <div
      id={currentId}
      {...stylex.props(
        styles.container,
        inner && styles.inner
      )}
    >
      <Heading
        id={`${currentId}-heading`}
        level={level}
        margin={0}
        padding={headingPadding}
        style={[styles.heading]}
      >
        {title}
      </Heading>
      {actions && (
        <Toolbar
          actions={actions}
          id={`${currentId}-toolbar`}
          margin={0}
          padding={toolbarPadding}
          scaleActions={scaleActions}
        />
      )}
    </div>
  );
};

export default PaneHeader;
