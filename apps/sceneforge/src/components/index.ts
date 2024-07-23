import { lazy } from "react";

export const App = lazy(() => import("./App"));

export const AppInstall = lazy(() => import("./AppInstall"));

export const ReloadPrompt = lazy(() => import("./ReloadPrompt"));

export const Tabs = lazy(() => import("./Tabs"));
