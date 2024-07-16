import * as stylex from "@stylexjs/stylex";

import { View, type ViewProps } from "../View";

export type ContainerProps = Omit<ViewProps, "margin" | "scrollable" | "variant">;

const styles = stylex.create({
  container: {
    height: null,
    marginBlock: 0,
    marginInline: "auto",
    maxWidth: {
      "@media only screen and (min-width: 768px)": "760px",
      "@media only screen and (min-width: 992px)": "900px",
      "default": "calc(100% - 2rem)",
    },
    overflowX: null,
    overflowY: null,
    overscrollBehavior: null,
    scrollbarColor: null,
    scrollbarWidth: null,
  },
});

const Container = ({
  style,
  ...props
}: ContainerProps) => {
  return (
    <View
      style={[
        styles.container,
        style,
      ]}
      {...props}
      margin={undefined}
      scrollable={undefined}
      variant={undefined}
    />
  );
};

export default Container;
