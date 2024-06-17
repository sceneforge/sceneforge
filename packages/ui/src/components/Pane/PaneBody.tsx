import * as stylex from "@stylexjs/stylex";
import type { PropsWithChildren } from "react";
import { backgroundColor } from "../tokens.stylex";
import { Toolbar, type ToolbarProps } from "../Toolbar";

export type PaneBodyProps = PropsWithChildren<{
  id?: string;
  actions?: ToolbarProps["actions"];
}>;

const styles = stylex.create({
  container: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    padding: "0.25rem",
    overflow: "auto",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: backgroundColor.alpha10,
    borderBlockStartWidth: 0,
    backgroundColor: backgroundColor.alpha05,
  },
  actions: {
    flexShrink: 1,
    backgroundColor: backgroundColor.alpha15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.25rem",
    margin: 0,
  },
  blockEnd: {
    borderEndStartRadius: "0.25rem",
    borderEndEndRadius: "0.25rem",
  }
});

const PaneBody = ({ id, actions, children }: PaneBodyProps) => {
  return (
    <>
      <div
        {...stylex.props(
          styles.container,
          !actions && styles.blockEnd
        )}
      >
        {children}
      </div>
      {actions && (
        <div {...stylex.props(styles.actions, styles.blockEnd)}>
          <Toolbar id={id ? `${id}-panel-body-actions` : undefined} actions={actions} />
        </div>
      )}
    </>
  );
};

export default PaneBody;
