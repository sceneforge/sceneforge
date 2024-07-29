import { lazy } from "react";

export type { PopoverProps } from "./Popover";
export type { PopoverRef, UsePopoverProps } from "./usePopover";

export const Popover = lazy(() => import("./Popover"));
