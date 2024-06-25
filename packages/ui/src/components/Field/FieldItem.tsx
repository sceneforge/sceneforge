import { lazy } from "react";

import type { FieldSelectProps } from "./FieldSelect";
import type { FieldSwitchProps } from "./FieldSwitch";
import type { FieldTextProps } from "./FieldText";

const FieldSelect = lazy(() => import("./FieldSelect"));
const FieldSwitch = lazy(() => import("./FieldSwitch"));
const FieldText = lazy(() => import("./FieldText"));

export type FieldItemProps =
  | ({ type: "select" } & FieldSelectProps)
  | ({ type: "switch" } & FieldSwitchProps)
  | ({ type: "text" } & FieldTextProps);

const FieldItem = ({ type, ...props }: FieldItemProps) => {
  switch (type) {
    case "select":
      return <FieldSelect {...props as FieldSelectProps} />;
    case "switch":
      return <FieldSwitch {...props as FieldSwitchProps} />;
    case "text":
      return <FieldText {...props as FieldTextProps} />;
    default:
      return null;
  }
};

export default FieldItem;
