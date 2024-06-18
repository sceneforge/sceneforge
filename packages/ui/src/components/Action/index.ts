import { lazy } from "react";
export type { ActionProps } from "./Action";

export const Action = lazy(() => import("./Action"));
