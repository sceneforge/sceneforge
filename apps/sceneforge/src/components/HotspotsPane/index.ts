import { lazy } from "react";

export type * from "./HotspotsPane";
export const HotspotsPane = lazy(() => import("./HotspotsPane"));
