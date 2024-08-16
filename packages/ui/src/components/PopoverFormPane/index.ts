import { lazy } from "react";

export const PopoverFormPane = lazy(() => import("./PopoverFormPane"));

export type * from "./PopoverFormPane";
export type { PopoverFormPaneRef } from "./usePopoverFormPane";
