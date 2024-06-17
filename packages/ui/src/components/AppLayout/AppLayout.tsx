import { type PropsWithChildren } from "react";
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { titleBar } from "../tokens.stylex";
import { Topbar, type TopbarProps } from "../Topbar";
import { View } from "../View";

const styles = stylex.create({
  container: {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    position: "relative",
    overflow: "hidden",
    width: stylex.firstThatWorks("100dvw", "100vw", "100%"),
    height: stylex.firstThatWorks("100dvh", "100vh", "100%"),
    minWidth: stylex.firstThatWorks("100dvw", "100vw", "100%"),
    minHeight: stylex.firstThatWorks("100dvh", "100vh", "100%"),
    maxWidth: stylex.firstThatWorks("100dvw", "100vw", "100%"),
    maxHeight: stylex.firstThatWorks("100dvh", "100vh", "100%"),
  },
  embedded: {
    width: "100%",
    height: "100%",
    minWidth: "100%",
    minHeight: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  topbar: {
    paddingTop: titleBar.appTitleBarHeight,
  },
  main: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  }
});

export type AppLayoutProps = PropsWithChildren<{
  embedded?: boolean;
  topbar?: TopbarProps;
  style?: StyleXStyles;
}>;

const AppLayout = ({
  embedded = false,
  topbar,
  children,
  style,
}: AppLayoutProps) => {
  return (
    <View {...stylex.props(
      styles.container,
      embedded && styles.embedded,
      style)
    }>
      {topbar && (<Topbar {...topbar} />)}
      <main {...stylex.props(styles.main, !!topbar && styles.topbar)}>
        {children}
      </main>
    </View>
  );
};

export default AppLayout;
