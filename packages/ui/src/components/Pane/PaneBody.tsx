import type { PropsWithChildren } from "react";

import * as stylex from "@stylexjs/stylex";

import { backgroundColor } from "../../colors.stylex";
import { Orientation } from "../../types";
import { ActionList, ActionListProps } from "../ActionList";
import { View, type ViewProps } from "../View";

export type PaneBodyProps = PropsWithChildren<{
  actions?: ActionListProps["actions"];
  actionsDense?: ActionListProps["actionsDense"];
  actionsGap?: ActionListProps["gap"];
  actionsHidden?: ActionListProps["hidden"];
  actionsMargin?: ActionListProps["margin"];
  actionsPadding?: ActionListProps["padding"];
  actionsScale?: ActionListProps["actionsScale"];
  actionsStyle?: ActionListProps["style"];
  id?: string;
  margin?: ViewProps["margin"];
  padding?: ViewProps["padding"];
}>;

const styles = stylex.create({
  actions: {
    backgroundColor: backgroundColor.alpha15,
    flexShrink: 1,
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
  list: {
    justifyContent: "center",
    width: null,
  },
});

const PaneBody = ({
  actions,
  actionsDense,
  actionsGap = 0.5,
  actionsHidden,
  actionsMargin = {
    block: 0.25,
    inline: 0.5,
  },
  actionsPadding,
  actionsScale,
  actionsStyle,
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
      <ActionList
        actions={actions}
        actionsDense={actionsDense}
        actionsScale={actionsScale}
        gap={actionsGap}
        hidden={actionsHidden}
        id={id ? `${id}-pane-body-actions` : undefined}
        listStyle={styles.list}
        margin={actionsMargin}
        orientation={Orientation.Horizontal}
        padding={actionsPadding}
        style={[
          styles.actions,
          styles.blockEnd,
          actionsStyle,
        ]}
      />
    </>
  );
};

export default PaneBody;
