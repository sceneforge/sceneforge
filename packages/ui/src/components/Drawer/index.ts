import { lazy } from "react";
export type { DrawerProps } from "./Drawer";
export type { DrawerControllerProps } from "./DrawerController";
export type { ResizableHandler, UseDrawerProps } from "./useDrawer";
export const Drawer = lazy(() => import("./Drawer"));
export const DrawerController = lazy(() => import("./DrawerController"));
