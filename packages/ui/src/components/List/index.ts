import { lazy } from "react";

export const List = lazy(() => import("./List"));
export type { ListProps } from "./List";

export const ListItem = lazy(() => import("./ListItem"));
export type { ListItemProps } from "./ListItem";
