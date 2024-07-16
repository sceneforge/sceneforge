import type { StyleXStyles } from "@stylexjs/stylex";
import type { AllHTMLAttributes, Ref } from "react";

import * as stylex from "@stylexjs/stylex";

export type UnlistedItemProps = {
  hidden?: boolean;
  ref?: Ref<HTMLLIElement>;
  style?: StyleXStyles;
} & Omit<AllHTMLAttributes<HTMLLIElement>, "className" | "style">;

const styles = stylex.create({
  container: {
    margin: 0,
    padding: 0,
  },
  hidden: {
    display: "none",
  },
});

const UnlistedItem = ({ hidden, style, ...props }: UnlistedItemProps) => {
  return (
    <li
      {...props}
      hidden={hidden}
      {...stylex.props(
        styles.container,
        style,
        hidden && styles.hidden
      )}
    />
  );
};

export default UnlistedItem;
