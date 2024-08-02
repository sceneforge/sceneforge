import type { StyleXStyles } from "@stylexjs/stylex";

import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren } from "react";

import { titleBar } from "../tokens.stylex";
import { Topbar, type TopbarProps } from "../Topbar";
import { View } from "../View";

const styles = stylex.create({
  colorScheme: (colorScheme: "dark" | "light dark" | "light") => ({
    colorScheme: colorScheme,
  }),
  container: {
    colorScheme: "light dark",
    height: stylex.firstThatWorks("100dvh", "100vh", "100%"),
    maxHeight: stylex.firstThatWorks("100dvh", "100vh", "100%"),
    maxWidth: stylex.firstThatWorks("100dvw", "100vw", "100%"),
    minHeight: stylex.firstThatWorks("100dvh", "100vh", "100%"),
    minWidth: stylex.firstThatWorks("100dvw", "100vw", "100%"),
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
  colorScheme?: "dark" | "light dark" | "light";
  embedded?: boolean;
  label?: string;
  style?: StyleXStyles;
  topbar?: TopbarProps;
}>;

const AppLayout = ({
  children,
  colorScheme,
  embedded = false,
  label,
  style,
  topbar,
}: AppLayoutProps) => {
  return (
    <View
      aria-label={label}
      role="application"
      style={[
        styles.container,
        embedded && styles.embedded,
        colorScheme && styles.colorScheme(colorScheme),
        style,
      ]}
    >
      {topbar && (<Topbar {...topbar} />)}
      <main {...stylex.props(styles.main, !!topbar && styles.topbar)}>
        {children}
      </main>
    </View>
  );
};

export default AppLayout;
