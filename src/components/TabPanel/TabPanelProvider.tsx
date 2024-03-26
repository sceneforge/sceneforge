import {
  ReactNode,
  createContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction
} from "react";
import { type TabProps } from "./Tab";

export type TabComponent<P extends TabProps = TabProps> = (
  props: P,
  ...args: unknown[]
) => JSX.Element | ReactNode | null;

export interface TabContext<
  P extends TabProps = TabProps,
  C extends TabComponent<P> = TabComponent<P>
> {
  id: string;
  title: string;
  active: boolean;
  component: C;
  props?: Parameters<C>[0];
  createdAt?: number;
}

export interface TabPanelContextType {
  tabs: TabContext[];
  setTabs: Dispatch<SetStateAction<TabContext[]>>;
  tabsPosition: "top" | "bottom";
  setTabsPosition: Dispatch<SetStateAction<"top" | "bottom">>;
  defaultTab?: Omit<TabContext, "active" | "createdAt">;
}

export type TabPanelProviderProps = PropsWithChildren<{
  defaultTab?: Omit<TabContext, "active" | "createdAt">;
}>;

export const TabPanelContext = createContext<TabPanelContextType>({
  tabs: [],
  setTabs: () => void 0,
  tabsPosition: "bottom",
  setTabsPosition: () => void 0,
});

export const TabPanelProvider = ({
  children,
  defaultTab,
}: TabPanelProviderProps) => {
  const [tabs, setTabs] = useState<TabContext[]>([]);
  const [tabsPosition, setTabsPosition] = useState<"top" | "bottom">("bottom");

  return (
    <TabPanelContext.Provider
      value={{
        tabs,
        setTabs,
        defaultTab,
        tabsPosition,
        setTabsPosition,
      }}
    >
      {children}
    </TabPanelContext.Provider>
  );
};
