import { lazy } from "react";
export type { DialogProps } from "./Dialog";
export const Dialog = lazy(() => import("./Dialog"));
