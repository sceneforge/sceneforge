import { lazy } from "react";

export const DashboardViewTemplate = lazy(() => import("./DashboardViewTemplate"));
export const FormViewTemplate = lazy(() => import("./FormViewTemplate"));
export const MarkdownViewTemplate = lazy(() => import("./MarkdownViewTemplate"));
export const SceneViewTemplate = lazy(() => import("./SceneViewTemplate"));

export type { DashboardViewTemplateProps } from "./DashboardViewTemplate";
export type { FormViewTemplateProps } from "./FormViewTemplate";
export type { MarkdownViewTemplateProps } from "./MarkdownViewTemplate";
export type { SceneViewTemplateProps } from "./SceneViewTemplate";

export type TabTemplates =
  | typeof DashboardViewTemplate
  | typeof FormViewTemplate
  | typeof MarkdownViewTemplate
  | typeof SceneViewTemplate;

export type TabTemplateProps<T extends TabTemplates> = Parameters<T>[0];
