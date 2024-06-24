import { lazy, useId } from "react";

import { Switch, type SwitchProps } from "../Switch";

const Field = lazy(() => import("./Field"));

export type FieldSwitchProps = {
  label: string;
} & SwitchProps;

const FieldSwitch = ({ id, label, ...props }: FieldSwitchProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;

  return (
    <Field id={currentId} label={label}>
      <Switch {...props} id={currentId} />
    </Field>
  );
};

export default FieldSwitch;
