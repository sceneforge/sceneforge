import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren } from "react";

import { Topbar, type TopbarProps } from "../Topbar";
import { View } from "../View";
import { titleBar } from "../tokens.stylex";

const styles = stylex.create({
  container: {
    boxSizing: "border-box",
    height: stylex.firstThatWorks("100dvh", "100vh", "100%"),
    margin: 0,
    maxHeight: stylex.firstThatWorks("100dvh", "100vh", "100%"),
    maxWidth: stylex.firstThatWorks("100dvw", "100vw", "100%"),
    minHeight: stylex.firstThatWorks("100dvh", "100vh", "100%"),
    minWidth: stylex.firstThatWorks("100dvw", "100vw", "100%"),
    overflow: "hidden",
    padding: 0,
    position: "relative",
    width: stylex.firstThatWorks("100dvw", "100vw", "100%"),
  },
  embedded: {
    height: "100%",
    maxHeight: "100%",
    maxWidth: "100%",
    minHeight: "100%",
    minWidth: "100%",
    width: "100%",
  },
  main: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  topbar: {
    paddingTop: titleBar.appTitleBarHeight,
  },
});

export type AppLayoutProps = PropsWithChildren<{
  embedded?: boolean;
  style?: StyleXStyles;
  topbar?: TopbarProps;
}>;

const AppLayout = ({
  children,
  embedded = false,
  style,
  topbar,
}: AppLayoutProps) => {
  return (
    <View {...stylex.props(
      styles.container,
      embedded && styles.embedded,
      style
    )
    }
    >
      {topbar && (<Topbar {...topbar} />)}
      <main {...stylex.props(styles.main, !!topbar && styles.topbar)}>
        {children}
      </main>
    </View>
  );
};

export default AppLayout;
