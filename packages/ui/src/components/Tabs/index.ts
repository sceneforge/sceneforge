import { lazy } from "react";
export type { TabProps } from "./Tab";
export type { TabListProps } from "./TabList";
export type {
  TabCloseCallback,
  TabComponentProps,
  TabComponentType,
  TabPanelCoreProps,
  TabPanelProps,
} from "./TabPanel";
export type { TabContent, TabsProps } from "./Tabs";
export type { TabsControllerProps } from "./TabsController";
export { useTabs } from "./useTabs";
export type { TabsHandler, UseTabsProps } from "./useTabs";
export const Tabs = lazy(() => import("./Tabs"));
export const Tab = lazy(() => import("./Tab"));
export const TabList = lazy(() => import("./TabList"));
export const TabPanel = lazy(() => import("./TabPanel"));
export const TabsController = lazy(() => import("./TabsController"));
