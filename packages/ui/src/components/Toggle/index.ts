import { lazy } from "react";
export type { ToggleComponentRef, ToggleEvent, ToggleProps } from "./Toggle";
export const Toggle = lazy(() => import("./Toggle"));
