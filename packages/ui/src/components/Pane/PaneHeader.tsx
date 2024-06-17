import * as stylex from "@stylexjs/stylex";
import { Heading, HeadingProps } from "../Heading";
import { Toolbar, ToolbarProps } from "../Toolbar";
import { backgroundColor } from "../tokens.stylex";

export type PaneHeaderProps = {
  title: string;
  level?: HeadingProps["level"];
  toolbar?: ToolbarProps;
  inner?: boolean;
};

const styles = stylex.create({
  container: {
    flexShrink: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "stretch",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: backgroundColor.alpha15,
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: backgroundColor.alpha10,
    overflow: "clip",
    height: "2.5rem",
  },
  heading: {
    flexGrow: 1,
    padding: "0.25rem",
    fontSize: "1.125rem",
    textOverflow: "ellipsis",
  },
  inner: {
    borderStartStartRadius: "0.25rem",
    borderStartEndRadius: "0.25rem",
  }
});

const PaneHeader = ({
  title,
  level = 2,
  inner = true,
  toolbar,
}: PaneHeaderProps) => {
  return (
    <div
      {...stylex.props(
        styles.container,
        inner && styles.inner
      )}
    >
      <Heading level={level} style={[styles.heading]}>{title}</Heading>
      {toolbar && <Toolbar {...toolbar} />}
    </div>
  );
};

export default PaneHeader;
