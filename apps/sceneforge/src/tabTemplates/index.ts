import { lazy } from "react";

export const DashboardViewTemplate = lazy(() => import("./DashboardViewTemplate"));
export const FormViewTemplate = lazy(() => import("./FormViewTemplate"));
export const ModelViewTemplate = lazy(() => import("./ModelViewTemplate"));

export type { DashboardViewTemplateProps } from "./DashboardViewTemplate";
export type { FormViewTemplateProps } from "./FormViewTemplate";
export type { ModelViewTemplateProps } from "./ModelViewTemplate";

export type TabTemplates =
  | typeof DashboardViewTemplate
  | typeof FormViewTemplate
  | typeof ModelViewTemplate;
