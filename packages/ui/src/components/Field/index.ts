import { lazy } from "react";

export const Field = lazy(() => import("./Field"));
export const FieldSwitch = lazy(() => import("./FieldSwitch"));
export const FieldText = lazy(() => import("./FieldText"));
export type { FieldProps } from "./Field";
export type { FieldSwitchProps } from "./FieldSwitch";
export type { FieldTextProps } from "./FieldText";
