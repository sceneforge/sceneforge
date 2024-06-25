import type { StyleXStyles } from "@stylexjs/stylex";
import type { PropsWithChildren } from "react";

import * as stylex from "@stylexjs/stylex";

import { Variant } from "../../types";
import { View } from "../View";

export type ContainerProps = PropsWithChildren<{
  padding?: number;
  style?: StyleXStyles;
  variant?: Variant;
}>;

const styles = stylex.create({
  container: {
    display: "block",
    marginBlock: 0,
    marginInline: "auto",
    maxWidth: {
      "@media only screen and (min-width: 768px)": "760px",
      "@media only screen and (min-width: 992px)": "900px",
      "default": "calc(100% - 2rem)",
    },
    padding: 0,
  },
  padding: (padding: number) => ({
    padding: `${padding}rem`,
  }),
});

const Container = ({
  children,
  padding = 0,
  style,
  variant,
}: ContainerProps) => {
  return (
    <View
      style={[
        styles.container,
        padding !== 0 && styles.padding(padding),
        style,
      ]}
      variant={variant}
    >
      {children}
    </View>
  );
};

export default Container;
