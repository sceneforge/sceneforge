import { lazy } from "react";

export const HotspotPopover = lazy(() => import("./HotspotPopover"));

export type * from "./HotspotPopover";
export type { HotspotPopoverRef } from "./useHotspotPopover";
