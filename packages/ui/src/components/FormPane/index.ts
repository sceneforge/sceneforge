import { lazy } from "react";

export const FormPane = lazy(() => import("./FormPane"));

export type * from "./FormPane";
export type { FormPaneRef } from "./useFormPane";
