import { lazy } from "react";

export type { AppProviderProps } from "./App";

export type { AppContextType } from "./AppContext";

export type {
  AppInstallProviderProps,
  BeforeInstallPromptEvent,
} from "./AppInstall";

export type { AppInstallContextType } from "./AppInstallContext";

export const AppProvider = lazy(() => import("./App"));

export const AppInstallProvider = lazy(() => import("./AppInstall"));
