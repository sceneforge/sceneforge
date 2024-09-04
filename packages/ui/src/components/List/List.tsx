import * as stylex from "@stylexjs/stylex";

import { Orientation } from "../../types";
import { Unlisted, type UnlistedProps } from "../Unlisted";

export type ListProps = Omit<UnlistedProps, "orientation">;

export const styles = stylex.create({
  container: {
    alignContent: "baseline",
  },
});

const List = ({ style, ...props }: ListProps) => {
  return (
    <Unlisted
      {...props}
      orientation={Orientation.Vertical}
      scrollable
      style={[styles.container, style]}
    />
  );
};

export default List;
