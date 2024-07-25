import { lazy } from "react";

export type { ColorPickerProps } from "./ColorPicker";

export const ColorPicker = lazy(() => import("./ColorPicker"));
