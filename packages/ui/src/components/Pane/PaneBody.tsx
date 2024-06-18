import type { PropsWithChildren } from "react";

import * as stylex from "@stylexjs/stylex";

import { Toolbar, type ToolbarProps } from "../Toolbar";
import { backgroundColor } from "../tokens.stylex";

export type PaneBodyProps = PropsWithChildren<{
  actions?: ToolbarProps["actions"];
  id?: string;
}>;

const styles = stylex.create({
  actions: {
    alignItems: "center",
    backgroundColor: backgroundColor.alpha15,
    display: "flex",
    flexDirection: "row",
    flexShrink: 1,
    justifyContent: "center",
    margin: 0,
    padding: "0.25rem",
  },
  blockEnd: {
    borderEndEndRadius: "0.25rem",
    borderEndStartRadius: "0.25rem",
  },
  container: {
    backgroundColor: backgroundColor.alpha05,
    borderBlockStartWidth: 0,
    borderColor: backgroundColor.alpha10,
    borderStyle: "solid",
    borderWidth: "1px",
    flexGrow: 1,
    height: "100%",
    overflow: "auto",
    padding: "0.25rem",
    width: "100%",
  },
});

const PaneBody = ({ actions, children, id }: PaneBodyProps) => {
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
          <Toolbar actions={actions} id={id ? `${id}-panel-body-actions` : undefined} />
        </div>
      )}
    </>
  );
};

export default PaneBody;
