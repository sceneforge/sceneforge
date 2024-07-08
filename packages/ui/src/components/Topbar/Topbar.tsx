import * as stylex from "@stylexjs/stylex";
import { useId } from "react";

import { Orientation, Variant } from "../../types";
import { ActionList, ActionListProps } from "../ActionList";
import { Heading } from "../Heading";
import { View } from "../View";
import { foregroundColor, titleBar } from "../tokens.stylex";

export type TopbarProps = {
  actionsEnd?: ActionListProps["actions"];
  actionsEndDense?: ActionListProps["actionsDense"];
  actionsEndGap?: ActionListProps["gap"];
  actionsEndScale?: ActionListProps["actionsScale"];
  actionsStart?: ActionListProps["actions"];
  actionsStartDense?: ActionListProps["actionsDense"];
  actionsStartGap?: ActionListProps["gap"];
  actionsStartScale?: ActionListProps["actionsScale"];
  id?: string;
  shadow?: boolean;
  title?: string;
  variant?: Variant;
};

const styles = stylex.create({
  container: {
    backgroundColor: "AccentColor",
    color: "AccentColorText",
    height: titleBar.appTitleBarHeight,
    insetBlockStart: titleBar.appTitleBarInsetBlockStart,
    insetInline: 0,
    position: "fixed",
    width: "100%",
  },
  containerBorderAndShadow: {
    borderBlockEndColor: foregroundColor.alpha75,
    borderBlockEndStyle: "solid",
    borderBlockEndWidth: "0.0125rem",
    boxShadow: `0 4px 6px -1px ${foregroundColor.alpha30}`,
  },
  content: {
    alignItems: "center",
    display: "grid",
    gap: "0.5rem",
    gridTemplateColumns: "min-content auto",
    insetBlockStart: 0,
    insetInlineStart: titleBar.appTitleBarInsetInlineStart,
    position: "absolute",
    width: titleBar.appTitleBarWidth,
  },
  contentActions: {
    gridTemplateColumns: "min-content max-content auto max-content",
  },
  contentActionsOnlyEnd: {
    gridTemplateColumns: "min-content auto max-content",
  },
  contentActionsOnlyStart: {
    gridTemplateColumns: "min-content max-content auto",
  },
  heading: {
    fontSize: "1rem",
    textWrap: "nowrap",
  },
});

const Topbar = ({
  actionsEnd,
  actionsEndDense,
  actionsEndGap,
  actionsEndScale,
  actionsStart,
  actionsStartDense,
  actionsStartGap,
  actionsStartScale,
  id,
  shadow,
  title,
  variant,
}: TopbarProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;

  return (
    <header
      id={currentId}
      {...stylex.props(
        styles.container,
        shadow && styles.containerBorderAndShadow
      )}
    >
      <View
        style={[
          styles.content,
          actionsStart && actionsEnd && styles.contentActions,
          actionsStart && !actionsEnd && styles.contentActionsOnlyStart,
          !actionsStart && actionsEnd && styles.contentActionsOnlyEnd,
        ]}
        variant={variant}
      >
        <Heading
          level={1}
          padding={{
            inline: 1,
          }}
          style={[styles.heading]}
        >
          {title}
        </Heading>
        <ActionList
          actions={actionsStart}
          actionsDense={actionsStartDense}
          actionsScale={actionsStartScale}
          gap={actionsStartGap}
          orientation={Orientation.Horizontal}
        />
        <View />
        <ActionList
          actions={actionsEnd}
          actionsDense={actionsEndDense}
          actionsScale={actionsEndScale}
          gap={actionsEndGap}
          orientation={Orientation.Horizontal}
        />
      </View>
    </header>
  );
};

export default Topbar;
