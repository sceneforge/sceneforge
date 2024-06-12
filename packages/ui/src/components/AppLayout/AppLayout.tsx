import type { PropsWithChildren } from "react";
import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { typography } from "../tokens.stylex";
import { View } from "../View";

const styles = stylex.create({
  container: {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    position: "relative",
    overflow: "auto",
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSizeDefault,
  },
  embedded: {
    width: "100%",
    height: "100%",
  },
  content: {
    width: stylex.firstThatWorks("100dvw", "100vw", "100%"),
    height: stylex.firstThatWorks("100dvw", "100vw", "100%"),
    minWidth: stylex.firstThatWorks("100dvw", "100vw", "100%"),
    minHeight: stylex.firstThatWorks("100dvw", "100vw", "100%"),
  },
});

export type AppLayoutProps = PropsWithChildren<{
  embedded?: boolean;
  className?: string;
  style?: StyleXStyles;
}>;

const AppLayout = ({ embedded = false, children, style }: AppLayoutProps) => {
  return (
    <View
      style={[
        styles.container,
        embedded ? styles.embedded : styles.content,
        style
      ]}
    >
      {children}
    </View>
  );
};

export default AppLayout;
