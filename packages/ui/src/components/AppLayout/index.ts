import { lazy } from "react";
export type { AppLayoutProps } from "./AppLayout";
export const AppLayout = lazy(() => import("./AppLayout"));
