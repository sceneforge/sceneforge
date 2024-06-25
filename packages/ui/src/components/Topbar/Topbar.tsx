import * as stylex from "@stylexjs/stylex";
import { useId } from "react";

import { Variant } from "../../types";
import { Heading } from "../Heading";
import { Toolbar, type ToolbarProps } from "../Toolbar";
import { View } from "../View";
import { color, titleBar } from "../tokens.stylex";

export type TopbarProps = {
  id?: string;
  shadow?: boolean;
  title?: string;
  toolbarEnd?: ToolbarProps;
  toolbarStart?: ToolbarProps;
  variant?: Variant;
};

const styles = stylex.create({
  container: {
    backgroundColor: "AccentColor",
    borderBlockEndColor: "transparent",
    borderBlockEndStyle: "solid",
    borderBlockEndWidth: 0,
    color: "AccentColorText",
    height: titleBar.appTitleBarHeight,
    insetBlockStart: titleBar.appTitleBarInsetBlockStart,
    insetInline: 0,
    position: "fixed",
    width: "100%",
  },
  containerBorderAndShadow: {
    borderBlockEndColor: `color-mix(in srgb, ${color.foreground} 75%, transparent)`,
    borderBlockEndWidth: "0.0125rem",
    boxShadow: `0 4px 6px -1px color-mix(in srgb, ${color.foreground} 30%, transparent)`,
  },
  content: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    height: "100%",
    insetBlockStart: 0,
    insetInlineStart: titleBar.appTitleBarInsetInlineStart,
    justifyContent: "stretch",
    paddingInline: "1rem",
    position: "absolute",
    width: titleBar.appTitleBarWidth,
  },
  heading: {
    fontSize: "1rem",
    textWrap: "nowrap",
  },
  toolbar: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: "100%",
    justifyContent: "flex-start",
    width: "100%",
  },
  toolbarEnd: {
    justifyContent: "flex-end",
  },
});

const Topbar = ({
  id,
  shadow,
  title,
  toolbarEnd,
  toolbarStart,
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
      <View style={[styles.content]} variant={variant}>
        <Heading
          level={1}
          paddingInline={1}
          style={[styles.heading]}
        >
          {title}
        </Heading>
        <div {...stylex.props(styles.toolbar)}>
          {toolbarStart && <Toolbar key={`${currentId}-toolbar-start`} {...toolbarStart} />}
        </div>
        <div {...stylex.props(styles.toolbar, styles.toolbarEnd)}>
          {toolbarEnd && <Toolbar key={`${currentId}-toolbar-end`} {...toolbarEnd} />}
        </div>
      </View>
    </header>
  );
};

export default Topbar;
