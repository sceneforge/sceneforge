import { lazy } from "react";
export type { CanvasProps } from "./Canvas";
export const Canvas = lazy(() => import("./Canvas"));
