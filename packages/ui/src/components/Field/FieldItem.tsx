import { lazy } from "react";

import type { FieldColorProps } from "./FieldColor";
import type { FieldSelectProps } from "./FieldSelect";
import type { FieldSwitchProps } from "./FieldSwitch";
import type { FieldTextProps } from "./FieldText";

const FieldColor = lazy(() => import("./FieldColor"));
const FieldSelect = lazy(() => import("./FieldSelect"));
const FieldSwitch = lazy(() => import("./FieldSwitch"));
const FieldText = lazy(() => import("./FieldText"));

export type FieldItemProps =
  | ({ type: "color" } & FieldColorProps)
  | ({ type: "select" } & FieldSelectProps)
  | ({ type: "switch" } & FieldSwitchProps)
  | ({ type?: "text" } & FieldTextProps);

const FieldItem = ({ type, ...props }: FieldItemProps) => {
  switch (type) {
    case "color":
      return <FieldColor {...props as FieldColorProps} />;
    case "select":
      return <FieldSelect {...props as FieldSelectProps} />;
    case "switch":
      return <FieldSwitch {...props as FieldSwitchProps} />;
    default:
      return <FieldText {...props as FieldTextProps} />;
  }
};

export default FieldItem;
