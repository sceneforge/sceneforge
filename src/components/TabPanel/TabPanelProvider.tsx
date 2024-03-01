import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction
} from "react";
import { v4 as uuid } from "uuid";
import { usePanel } from "../Panel";
import { Tab, type TabProps } from "./Tab";

type Component<P extends TabProps = TabProps> = (
  props: P,
  ...args: unknown[]
) => (JSX.Element | ReactNode | null);

export interface TabContext<
  P extends TabProps = TabProps,
  C extends Component<P> = Component<P>
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
  defaultTab?: Omit<TabContext, "active" | "createdAt">;
}

export type TabPanelProviderProps = PropsWithChildren<{
  defaultTab?: Omit<TabContext, "active" | "createdAt">;
}>;

const TabPanelContext = createContext<TabPanelContextType>({
  tabs: [],
  setTabs: (() => void (0))
});

export const TabPanelProvider = ({
  children,
  defaultTab
}: TabPanelProviderProps) => {
  const [tabs, setTabs] = useState<TabContext[]>([]);

  return (
    <TabPanelContext.Provider value={{ tabs, setTabs, defaultTab }}>
      {children}
    </TabPanelContext.Provider>
  );
};

export const useTabPanel = () => {
  const { updateTitle } = usePanel();
  const { tabs, setTabs, defaultTab: defaultTabComponent } = useContext(TabPanelContext);

  const activateTab = useCallback(
    (tab: TabContext) => {
      return () => {
        setTabs((prevTabs) => prevTabs.map((t) => ({ ...t, active: false })));
        setTabs((prevTabs) => prevTabs.map((t) => ({
          ...t,
          active: t.id === tab.id &&
            t.title === tab.title &&
            t.component === tab.component &&
            t.createdAt === tab.createdAt
        })));
        updateTitle(tab.title);
      };
    }, [updateTitle, setTabs]
  );

  const newTab = useCallback(<
    P extends TabProps = TabProps,
    C extends Component<P> = Component<P>,
    T extends TabContext<P, C> = TabContext<P, C>
  >(tab: T) => {
    const createdAt = Date.now();
    const newTabContext = { ...tab, createdAt };
    setTabs((prevTabs) => [
      ...prevTabs,
      newTabContext as TabContext<TabProps, Component>
    ]);
    activateTab(newTabContext as TabContext<TabProps, Component>)();
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

  const defaultTab = useMemo((): TabContext => {
    if (!defaultTabComponent) return {
      id: uuid(),
      title: "",
      active: false,
      component: Tab(() => (<></>)),
    };

    return {
      ...defaultTabComponent,
      active: true,
    };
  }, [defaultTabComponent]);

  const getTabByTitle = useCallback((title: string) => {
    return tabs.find((tab) => tab.title === title);
  }, [tabs]);

  const getTabById = useCallback((id: string) => {
    return tabs.find((tab) => tab.id === id);
  }, [tabs]);

  const updateTabTitle = useCallback((id: string, title: string) => {
    setTabs((prevTabs) => prevTabs.map((tab) => {
      if (tab.id === id) {
        return { ...tab, title };
      }
      return tab;
    }));
  }, [setTabs]);

  return {
    tabs,
    defaultTab,
    setTabs,
    newTab,
    closeTab,
    activateTab,
    getTabByTitle,
    getTabById,
    updateTabTitle,
  };
};
