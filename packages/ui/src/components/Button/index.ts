import { lazy } from "react";
export type { ButtonProps } from "./Button";
export const Button = lazy(() => import("./Button"));
