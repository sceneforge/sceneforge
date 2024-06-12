import * as stylex from "@stylexjs/stylex";
import { useId } from "react";
import { Heading } from "../Heading";
import { Toolbar, type ToolbarProps } from "../Toolbar";
import { Variant } from "../../types";
import { color, titleBar } from "../tokens.stylex";
import { View } from "../View";

export type TopbarProps = {
  id?: string;
  title?: string;
  toolbarStart?: ToolbarProps;
  toolbarEnd?: ToolbarProps;
  variant?: Variant;
};

const styles = stylex.create({
  container: {
    position: "fixed",
    backgroundColor: color.background,
    width: "100%",
    insetBlockStart: titleBar.appTitleBarInsetBlockStart,
    insetInline: 0,
    height: titleBar.appTitleBarHeight,
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
  },
  containerBorderAndShadow: () => ({
    borderBlockEndColor: `color-mix(in srgb, ${color.foreground} 75%, "transparent")`,
    boxShadow: `0 4px 6px -1px color-mix(in srgb, ${color.foreground} 30%, "transparent")`
  }),
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "stretch",
    gap: "0.5rem",
    position: "absolute",
    height: "100%",
    paddingInline: "1rem",
    insetBlockStart: 0,
    insetInlineStart: titleBar.appTitleBarInsetInlineStart,
    width: titleBar.appTitleBarWidth,
  },
  heading: {
    margin: 0,
    padding: 0,
    textWrap: "nowrap",
    fontSize: "1rem"
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
  },
  toolbarEnd: {
    justifyContent: "flex-end",
  },
  variantColor: (background: keyof typeof color, text: keyof typeof color) => ({
    backgroundColor: color[background],
    color: color[text]
  }),
});

const Topbar = ({
  id,
  title,
  toolbarStart,
  toolbarEnd,
  variant
}: TopbarProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;

  return (
    <header
      id={currentId}
      {...stylex.props(styles.container, styles.containerBorderAndShadow())}
    >
      <View style={[styles.content]} variant={variant}>
        <Heading level={1} style={[styles.heading]}>{title}</Heading>
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
