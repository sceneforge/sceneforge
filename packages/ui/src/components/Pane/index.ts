import { lazy } from "react";

export type { PaneProps } from "./Pane";
export type { PaneBodyProps } from "./PaneBody";
export type { PaneHeaderProps } from "./PaneHeader";
export type { PaneImageProps } from "./PaneImage";

export const Pane = lazy(() => import("./Pane"));
export const PaneHeader = lazy(() => import("./PaneHeader"));
export const PaneBody = lazy(() => import("./PaneBody"));
export const PaneImage = lazy(() => import("./PaneImage"));
