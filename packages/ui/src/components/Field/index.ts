import { lazy } from "react";

export const Field = lazy(() => import("./Field"));
export type { FieldProps } from "./Field";

export const FieldColor = lazy(() => import("./FieldColor"));
export type { FieldColorProps } from "./FieldColor";

export const FieldItem = lazy(() => import("./FieldItem"));
export type { FieldItemProps } from "./FieldItem";

export const FieldSelect = lazy(() => import("./FieldSelect"));
export type { FieldSelectProps } from "./FieldSelect";

export const FieldSlider = lazy(() => import("./FieldSlider"));
export type { FieldSliderProps } from "./FieldSlider";

export const FieldSwitch = lazy(() => import("./FieldSwitch"));
export type { FieldSwitchProps } from "./FieldSwitch";

export const FieldText = lazy(() => import("./FieldText"));
export type { FieldTextProps } from "./FieldText";
