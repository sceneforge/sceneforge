import { lazy } from "react";

export const Field = lazy(() => import("./Field"));
export const FieldItem = lazy(() => import("./FieldItem"));
export const FieldSelect = lazy(() => import("./FieldSelect"));
export const FieldSwitch = lazy(() => import("./FieldSwitch"));
export const FieldText = lazy(() => import("./FieldText"));

export type { FieldProps } from "./Field";
export type { FieldItemProps } from "./FieldItem";
export type { FieldSelectProps } from "./FieldSelect";
export type { FieldSwitchProps } from "./FieldSwitch";
export type { FieldTextProps } from "./FieldText";
