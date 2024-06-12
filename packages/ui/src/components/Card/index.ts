import { lazy } from "react";
export type { CardProps } from "./Card";
export const Card = lazy(() => import("./Card"));

