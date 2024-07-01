import { lazy } from "react";

export const CarouselItem = lazy(() => import("./CarouselItem"));

export type { CarouselItemProps } from "./CarouselItem";
