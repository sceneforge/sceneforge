import { lazy } from "react";

import { useCurrentId } from "../../hooks";
import { InputText, type InputTextProps } from "../InputText";

const Field = lazy(() => import("./Field"));

export type FieldTextProps = {
  label: string;
} & InputTextProps;

const FieldText = ({ id, label, ...props }: FieldTextProps) => {
  const currentId = useCurrentId(id);

  return (
    <Field id={currentId} label={label}>
      <InputText id={currentId} {...props} />
    </Field>
  );
};

export default FieldText;
