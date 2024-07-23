import { lazy } from "react";

export const DashboardViewTab = lazy(() => import("./DashboardViewTab"));
export const FormViewTab = lazy(() => import("./FormViewTab"));
export const MarkdownViewTab = lazy(() => import("./MarkdownViewTab"));
export const SceneViewTab = lazy(() => import("./SceneViewTab"));

export type { DashboardViewTabProps } from "./DashboardViewTab";
export type { FormViewTabProps } from "./FormViewTab";
export type { MarkdownViewTabProps } from "./MarkdownViewTab";
export type { SceneViewTabProps } from "./SceneViewTab";

export type TabTemplates =
  | typeof DashboardViewTab
  | typeof FormViewTab
  | typeof MarkdownViewTab
  | typeof SceneViewTab;

export type TabTemplateProps<T extends TabTemplates> = Parameters<T>[0];
