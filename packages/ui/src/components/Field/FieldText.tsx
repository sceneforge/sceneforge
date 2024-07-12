import { lazy, useId } from "react";

import { InputText, type InputTextProps } from "../InputText";

const Field = lazy(() => import("./Field"));

export type FieldTextProps = {
  label: string;
} & InputTextProps;

const FieldText = ({ id, label, ...props }: FieldTextProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;

  return (
    <Field id={currentId} label={label}>
      <InputText id={currentId} {...props} />
    </Field>
  );
};

export default FieldText;
