import { lazy } from "react";

import { useCurrentId } from "../../hooks";
import { Switch, type SwitchProps } from "../Switch";

const Field = lazy(() => import("./Field"));

export type FieldSwitchProps = {
  label: string;
} & SwitchProps;

const FieldSwitch = ({ id, label, ...props }: FieldSwitchProps) => {
  const currentId = useCurrentId(id);

  return (
    <Field id={currentId} label={label}>
      <Switch {...props} id={currentId} />
    </Field>
  );
};

export default FieldSwitch;
