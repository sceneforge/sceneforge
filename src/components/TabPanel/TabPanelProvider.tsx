import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction
} from "react";

export type TabContextType = "model-editor" | "model-preview" | "regular";

export interface TabContext {
  title: string;
  active: boolean;
  type: TabContextType;
  component?: () => JSX.Element;
  createdAt?: number;
}

export interface TabPanelContextType {
  tabs: TabContext[];
  setTabs: Dispatch<SetStateAction<TabContext[]>>;
  defaultTab?: () => JSX.Element;
}

export type TabPanelProviderProps = PropsWithChildren<{
  defaultTab?: () => JSX.Element;
}>;

const TabPanelContext = createContext<TabPanelContextType>({ tabs: [], setTabs: (() => void (0)) });

export const TabPanelProvider = ({ children, defaultTab }: TabPanelProviderProps) => {
  const [tabs, setTabs] = useState<TabContext[]>([]);

  return (
    <TabPanelContext.Provider value={{ tabs, setTabs, defaultTab }}>
      {children}
    </TabPanelContext.Provider>
  );
};

export const useTabPanel = () => {
  const { tabs, setTabs, defaultTab: defaultTabComponent } = useContext(TabPanelContext);

  const activateTab = useCallback((tab: TabContext) => {
    return () => {
      setTabs((prevTabs) => prevTabs.map((t) => ({
        ...t,
        active: t.title === tab.title &&
          t.type === tab.type &&
          t.component === tab.component &&
          t.createdAt === tab.createdAt
      })));
      document.title = tab.title;
    };
  }, [setTabs]);

  const newTab = useCallback((tab: Omit<TabContext, "createdAt">) => {
    const createdAt = Date.now();
    const newTabContext = { ...tab, createdAt };
    setTabs((prevTabs) => [...prevTabs, newTabContext]);
    activateTab(newTabContext)();
  }, [setTabs, activateTab]);

  const closeTab = useCallback((tab: TabContext) => {
    return () => {
      setTabs((prevTabs) => {
        if (tab.active) {
          const index = prevTabs.findIndex((t) => t === tab);
          if (prevTabs[index + 1]) {
            prevTabs[index + 1].active = true;
          } else if (prevTabs[index - 1]) {
            prevTabs[index - 1].active = true;
          } else {
            prevTabs[0].active = true;
          }
        }

        return prevTabs.filter((t) => t !== tab);
      });
    };
  }, [setTabs]);

  const defaultTab = useMemo<Omit<TabContext, "createdAt">>(() => {
    return {
      title: "Home",
      active: true,
      type: "regular",
      component: defaultTabComponent,
    };
  }, [defaultTabComponent]);

  const getTabByTitle = useCallback((title: string) => {
    return tabs.find((tab) => tab.title === title);
  }, [tabs]);

  return {
    tabs,
    defaultTab,
    setTabs,
    newTab,
    closeTab,
    activateTab,
    getTabByTitle,
  };
};
