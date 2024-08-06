import { lazy } from "react";
export const ThemeProvider = lazy(() => import("./ThemeProvider"));
export type { ThemeProviderProps } from "./ThemeProvider";
export { useColorState } from "./useColorState";

export type { ColorStateType, SetColorStateType } from "./useColorState";
export { useTheme } from "./useTheme";
