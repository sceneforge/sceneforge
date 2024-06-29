import type { StyleXStyles } from "@stylexjs/stylex";
import type { PropsWithChildren } from "react";

import * as stylex from "@stylexjs/stylex";

import { Variant } from "../../types";
import { View, ViewProps } from "../View";

export type ContainerProps = PropsWithChildren<{
  padding?: ViewProps["padding"];
  style?: StyleXStyles;
  variant?: Variant;
}>;

const styles = stylex.create({
  container: {
    display: "block",
    marginInline: "auto",
    maxWidth: {
      "@media only screen and (min-width: 768px)": "760px",
      "@media only screen and (min-width: 992px)": "900px",
      "default": "calc(100% - 2rem)",
    },
  },
});

const Container = ({
  children,
  padding = 0,
  style,
  variant,
}: ContainerProps) => {
  return (
    <View
      padding={padding}
      style={[
        styles.container,
        style,
      ]}
      variant={variant}
    >
      {children}
    </View>
  );
};

export default Container;
