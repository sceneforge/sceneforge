import {
  type Dispatch,
  type PropsWithChildren,
  ReactNode,
  type SetStateAction,
  createContext,
  useState,
} from "react";

import { type TabProps } from "./Tab";

export type TabComponent<P extends TabProps = TabProps> = (
  props: P,
  ...args: unknown[]
) => JSX.Element | ReactNode | null;

export interface TabContext<
  P extends TabProps = TabProps,
  C extends TabComponent<P> = TabComponent<P>,
> {
  active: boolean;
  component: C;
  createdAt?: number;
  id: string;
  props?: Parameters<C>[0];
  title: string;
  translation?: {
    key: string;
    ns: string;
  };
}

export interface TabPanelContextType {
  defaultTab?: Omit<TabContext, "active" | "createdAt">;
  setTabs: Dispatch<SetStateAction<TabContext[]>>;
  setTabsPosition: Dispatch<SetStateAction<"bottom" | "top">>;
  tabs: TabContext[];
  tabsPosition: "bottom" | "top";
}

export type TabPanelProviderProps = PropsWithChildren<{
  defaultTab?: Omit<TabContext, "active" | "createdAt">;
}>;

export const TabPanelContext = createContext<TabPanelContextType>({
  setTabs: () => void 0,
  setTabsPosition: () => void 0,
  tabs: [],
  tabsPosition: "bottom",
});

export const TabPanelProvider = ({
  children,
  defaultTab,
}: TabPanelProviderProps) => {
  const [tabs, setTabs] = useState<TabContext[]>([]);
  const [tabsPosition, setTabsPosition] = useState<"bottom" | "top">("bottom");

  return (
    <TabPanelContext.Provider
      value={{
        defaultTab,
        setTabs,
        setTabsPosition,
        tabs,
        tabsPosition,
      }}
    >
      {children}
    </TabPanelContext.Provider>
  );
};
