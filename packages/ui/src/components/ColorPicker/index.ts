import { lazy } from "react";

export type { ColorPickerProps } from "./ColorPicker";
export type { HueSliderProps } from "./HueSlider";
export type { LightnessSliderProps } from "./LightnessSlider";
export type { SaturationSliderProps } from "./SaturationSlider";

export const ColorPicker = lazy(() => import("./ColorPicker"));
export const HueSlider = lazy(() => import("./HueSlider"));
export const LightnessSlider = lazy(() => import("./LightnessSlider"));
export const SaturationSlider = lazy(() => import("./SaturationSlider"));
