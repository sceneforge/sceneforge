import * as stylex from "@stylexjs/stylex";

import { borderStyles } from "../../borders.stylex";
import { foregroundColor } from "../../colors.stylex";
import { useCurrentId } from "../../hooks";
import { appRegionStyles, titleBar } from "../../titleBar.stylex";
import { Orientation, Variant } from "../../types";
import { ActionList, type ActionListProps } from "../ActionList";
import { Heading } from "../Heading";
import { View } from "../View";

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
  inverted?: boolean;
  shadow?: boolean;
  title?: string;
  variant?: Variant;
};

const styles = stylex.create({
  container: {
    height: titleBar.appTitleBarHeight,
    insetBlockStart: titleBar.appTitleBarInsetBlockStart,
    insetInline: 0,
    position: "fixed",
    width: "100%",
  },
  containerBorderAndShadow: {
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
  inverted,
  shadow,
  title,
  variant = Variant.Accent,
}: TopbarProps) => {
  const currentId = useCurrentId(id);

  return (
    <header
      id={currentId}
      {...stylex.props(
        styles.container,
        borderStyles.noBorder,
        shadow && styles.containerBorderAndShadow,
        shadow && [
          borderStyles.borderBlockEnd,
          borderStyles.borderBlockEndSize(1),
          borderStyles.borderBlockEndDefault(65),
        ]
      )}
    >
      <View
        inverted={inverted}
        style={[
          styles.content,
          appRegionStyles.drag,
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
          actionsStyle={appRegionStyles.noDrag}
          gap={actionsStartGap}
          orientation={Orientation.Horizontal}
        />
        <View />
        <ActionList
          actions={actionsEnd}
          actionsDense={actionsEndDense}
          actionsScale={actionsEndScale}
          actionsStyle={appRegionStyles.noDrag}
          gap={actionsEndGap}
          orientation={Orientation.Horizontal}
        />
      </View>
    </header>
  );
};

export default Topbar;
