import * as stylex from "@stylexjs/stylex";
import { type PropsWithChildren } from "react";

export type FieldProps = PropsWithChildren<{
  id?: string;
  label: string;
}>;

const styles = stylex.create({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "stretch",
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
