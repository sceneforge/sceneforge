import { lazy } from "react";
export const Pane = lazy(() => import("./Pane"));
export type { PaneProps } from "./Pane";
export const PaneHeader = lazy(() => import("./PaneHeader"));
export type { PaneHeaderProps } from "./PaneHeader";
export const PaneBody = lazy(() => import("./PaneBody"));
export type { PaneBodyProps } from "./PaneBody";
