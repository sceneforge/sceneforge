import { lazy } from "react";

export const PopoverPane = lazy(() => import("./PopoverPane"));

export type { PopoverPaneProps } from "./PopoverPane";
export type { UsePopoverPaneProps } from "./usePopoverPane";
