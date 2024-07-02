import type { PropsWithChildren } from "react";

import * as stylex from "@stylexjs/stylex";

import { Toolbar, type ToolbarProps } from "../Toolbar";
import { View } from "../View";
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
    borderWidth: "0.0625rem",
    flexGrow: 1,
  },
});

const PaneBody = ({ actions, children, id }: PaneBodyProps) => {
  return (
    <>
      <View
        scrollable
        style={[
          styles.container,
          !actions && styles.blockEnd,
        ]}
      >
        {children}
      </View>
      {actions && (
        <View
          padding={{
            block: 0.25,
          }}
          style={[
            styles.actions,
            styles.blockEnd,
          ]}
        >
          <Toolbar
            actions={actions}
            id={id ? `${id}-pane-body-actions` : undefined}
          />
        </View>
      )}
    </>
  );
};

export default PaneBody;
