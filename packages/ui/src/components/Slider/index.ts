import { lazy } from "react";

export type { SliderProps } from "./Slider";

export const Slider = lazy(() => import("./Slider"));
