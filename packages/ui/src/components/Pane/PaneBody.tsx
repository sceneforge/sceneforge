import type { PropsWithChildren } from "react";

import * as stylex from "@stylexjs/stylex";

import { Toolbar, type ToolbarProps } from "../Toolbar";
import { View, type ViewProps } from "../View";
import { backgroundColor } from "../tokens.stylex";

export type PaneBodyProps = PropsWithChildren<{
  actions?: ToolbarProps["actions"];
  actionsPadding?: ToolbarProps["padding"];
  id?: string;
  margin?: ViewProps["margin"];
  padding?: ViewProps["padding"];
}>;

const styles = stylex.create({
  actions: {
    alignItems: "center",
    backgroundColor: backgroundColor.alpha15,
    display: "flex",
    flexDirection: "row",
    flexShrink: 1,
    height: null,
    justifyContent: "center",
    width: null,
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

const PaneBody = ({
  actions,
  actionsPadding,
  children,
  id,
  margin,
  padding,
}: PaneBodyProps) => {
  return (
    <>
      <View
        margin={margin}
        padding={padding}
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
          style={[
            styles.actions,
            styles.blockEnd,
          ]}
        >
          <Toolbar
            actions={actions}
            id={id ? `${id}-pane-body-actions` : undefined}
            padding={actionsPadding}
          />
        </View>
      )}
    </>
  );
};

export default PaneBody;
