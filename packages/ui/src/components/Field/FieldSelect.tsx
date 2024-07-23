import * as stylex from "@stylexjs/stylex";
import { lazy } from "react";

import { useCurrentId } from "../../hooks";
import { Select, type SelectProps } from "../Select";

const Field = lazy(() => import("./Field"));

export type FieldSelectProps = {
  label: string;
} & SelectProps;

const styles = stylex.create({
  popover: {
    insetInlineEnd: "anchor(right)",
    insetInlineStart: null,
  },
});

const FieldSelect = ({ id, label, ...props }: FieldSelectProps) => {
  const currentId = useCurrentId(id);

  return (
    <Field
      id={currentId}
      label={label}
    >
      <Select
        {...props}
        id={currentId}
        popoverStyle={styles.popover}
      />
    </Field>
  );
};

export default FieldSelect;
