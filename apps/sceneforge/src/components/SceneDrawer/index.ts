import { lazy } from "react";

export type { SceneDrawerProps } from "./SceneDrawer";
export const SceneDrawer = lazy(() => import("./SceneDrawer"));
