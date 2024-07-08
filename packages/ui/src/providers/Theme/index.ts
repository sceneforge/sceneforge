import { lazy } from "react";
export const ThemeProvider = lazy(() => import("./ThemeProvider"));
export type { ThemeColorsType, ThemeProviderProps } from "./ThemeProvider";

export { useColorState } from "./useColorState";
export type { ColorStateType, SetColorStateType } from "./useColorState";
