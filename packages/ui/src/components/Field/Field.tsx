import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren } from "react";

import { backgroundColor } from "../tokens.stylex";

export type FieldProps = PropsWithChildren<{
  id?: string;
  label: string;
}>;

const styles = stylex.create({
  container: {
    alignItems: "center",
    backgroundColor: backgroundColor.alpha25,
    borderBlockEndColor: backgroundColor.alpha10,
    borderBlockEndStyle: "solid",
    borderBlockEndWidth: "1px",
    borderBlockStartColor: backgroundColor.alpha05,
    borderBlockStartStyle: "solid",
    borderBlockStartWidth: "1px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "stretch",
    minHeight: "3rem",
    paddingBlock: "0.25rem",
    paddingInline: "0.5rem",
  },
  field: {
    flexShrink: 1,
  },
  label: {
    flexGrow: 1,
  },
});

const Field = ({ children, id, label }: FieldProps) => {
  return (
    <li {...stylex.props(styles.container)}>
      <label htmlFor={id} {...stylex.props(styles.label)}>{label}</label>
      <div {...stylex.props(styles.field)}>
        {children}
      </div>
    </li>
  );
};

export default Field;
