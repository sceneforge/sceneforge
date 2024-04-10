import { useCallback, useContext, useEffect, useId, useMemo } from "react";
import { usePanel } from "../Panel";
import { Tab, type TabProps } from "./Tab";
import {
  TabComponent,
  TabPanelContext,
  type TabContext,
} from "./TabPanelProvider";

export const useTabPanel = () => {
  const unknownId = useId();
  const { updateTitle, appTitle } = usePanel();
  const {
    tabs,
    setTabs,
    defaultTab: defaultTabComponent,
    tabsPosition,
    setTabsPosition,
  } = useContext(TabPanelContext);

  const activateTab = useCallback(
    (tab: TabContext) => {
      return () => {
        setTabs((prevTabs) => prevTabs.map((t) => ({ ...t, active: false })));
        setTabs((prevTabs) =>
          prevTabs.map((t) => ({
            ...t,
            active:
              t.id === tab.id &&
              t.title === tab.title &&
              t.component === tab.component &&
              t.createdAt === tab.createdAt,
          }))
        );
        updateTitle(tab.title);
      };
    },
    [updateTitle, setTabs]
  );

  const newTab = useCallback(
    <
      I extends object = object,
      P extends TabProps<I> = TabProps<I>,
      C extends TabComponent<P> = TabComponent<P>,
      T extends TabContext<P, C> = TabContext<P, C>
    >(
      tab: T
    ) => {
      const createdAt = Date.now();
      // @TODO: Fix this type assertion
      const newTabContext = { ...tab, createdAt } as unknown as TabContext;
      setTabs((prevTabs) => [...prevTabs, newTabContext]);
      activateTab(newTabContext)();
    },
    [setTabs, activateTab]
  );

  const closeTab = useCallback(
    (tab: TabContext) => {
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
    },
    [setTabs]
  );

  const defaultTab = useMemo((): TabContext => {
    if (!defaultTabComponent)
      return {
        id: unknownId,
        title: "Undefined Tab",
        active: false,
        component: Tab(() => null),
      };

    return {
      ...defaultTabComponent,
      active: true,
    };
  }, [unknownId, defaultTabComponent]);

  const getTabByTitle = useCallback(
    (title: string) => {
      return tabs.find((tab) => tab.title === title);
    },
    [tabs]
  );

  const getTabById = useCallback(
    (id: string) => {
      return tabs.find((tab) => tab.id === id);
    },
    [tabs]
  );

  const getTabByComponent = useCallback(
    (component: TabComponent) => {
      return tabs.find((tab) => tab.component === component);
    },
    [tabs]
  );

  const updateTabTitle = useCallback(
    (id: string, title: string) => {
      setTabs((prevTabs) =>
        prevTabs.map((tab) => {
          if (tab.id === id) {
            return { ...tab, title };
          }
          return tab;
        })
      );
    },
    [setTabs]
  );

  const openTab = useCallback(
    (tabContext: TabContext) => () => {
      const tab = getTabByComponent(tabContext.component);
      if (tab) {
        activateTab(tab)();
      } else {
        newTab(tabContext);
      }
    },
    [getTabByComponent, activateTab, newTab]
  );

  const activeTab = useMemo(() => {
    return tabs.find((tab) => tab.active);
  }, [tabs]);

  useEffect(() => {
    if (activeTab && activeTab.title !== appTitle) {
      updateTitle(activeTab.title);
    }
  }, [activeTab, appTitle, updateTitle]);

  return {
    activeTab,
    tabs,
    defaultTab,
    tabsPosition,
    setTabsPosition,
    setTabs,
    newTab,
    closeTab,
    activateTab,
    getTabByTitle,
    getTabById,
    getTabByComponent,
    updateTabTitle,
    openTab,
  };
};
