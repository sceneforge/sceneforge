import * as stylex from "@stylexjs/stylex";
import { lazy } from "react";

import { useCurrentId } from "../../hooks";
import { ColorPicker, type ColorPickerProps } from "../ColorPicker";

const Field = lazy(() => import("./Field"));

export type FieldColorProps = {
  label: string;
} & Omit<ColorPickerProps, "label">;

const styles = stylex.create({
  popover: {
    insetInlineEnd: "anchor(right)",
    insetInlineStart: null,
  },
});

const FieldColor = ({ id, label, ...props }: FieldColorProps) => {
  const currentId = useCurrentId(id);

  return (
    <Field
      id={currentId}
      label={label}
    >
      <ColorPicker
        {...props}
        id={currentId}
        popoverStyle={styles.popover}
      />
    </Field>
  );
};

export default FieldColor;
