import { lazy } from "react";

export type { SplitPaneProps } from "./SplitPane";
export type { SplitPaneControllerProps } from "./SplitPaneController";
export type { SplitPaneComponentRef } from "./useSplitPane";

export const SplitPane = lazy(() => import("./SplitPane"));
export const SplitPaneController = lazy(() => import("./SplitPaneController"));
