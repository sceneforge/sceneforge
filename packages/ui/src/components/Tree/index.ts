import { lazy } from "react";
export const Tree = lazy(() => import("./Tree"));
export const TreeNode = lazy(() => import("./TreeNode"));

export type { TreeProps } from "./Tree";
export type { TreeNodeProps } from "./TreeNode";
export type { UseTreeProps } from "./useTree";
