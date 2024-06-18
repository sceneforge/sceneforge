import { useCallback, useContext, useEffect, useId, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useAppContext } from "../App";
import { usePanel } from "../Panel";
import { type TabProps } from "./Tab";
import { TabNull } from "./TabNull";
import {
  TabComponent,
  type TabContext,
  TabPanelContext,
} from "./TabPanelProvider";

export const useTabPanel = () => {
  const unknownId = useId();
  const { appTitle, updateTitle } = usePanel();
  const {
    defaultTab: defaultTabComponent,
    setTabs,
    setTabsPosition,
    tabs,
    tabsPosition,
  } = useContext(TabPanelContext);
  const { t } = useTranslation();
  const { resolvedLanguage } = useAppContext();

  const activateTab = useCallback(
    (tab: TabContext) => {
      return () => {
        setTabs(previousTabs =>
          previousTabs.map(t => ({
            ...t,
            active: false,
          })));
        setTabs(previousTabs =>
          previousTabs.map(t => ({
            ...t,
            active:
              t.id === tab.id
              && t.title === tab.title
              && t.translation === tab.translation
              && t.component === tab.component
              && t.createdAt === tab.createdAt,
          })));
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
      T extends TabContext<P, C> = TabContext<P, C>,
    >(
      tab: T
    ) => {
      const createdAt = Date.now();
      // @TODO: Fix this type assertion
      const newTabContext = { ...tab, createdAt } as unknown as TabContext;
      setTabs(previousTabs => [...previousTabs, newTabContext]);
      activateTab(newTabContext)();
    },
    [setTabs, activateTab]
  );

  const closeTab = useCallback(
    (tab: TabContext) => {
      return () => {
        setTabs((previousTabs) => {
          if (tab.active) {
            const index = previousTabs.indexOf(tab);
            if (previousTabs[index + 1]) {
              previousTabs[index + 1].active = true;
            }
            else if (previousTabs[index - 1]) {
              previousTabs[index - 1].active = true;
            }
            else {
              previousTabs[0].active = true;
            }
          }

          return previousTabs.filter(t => t !== tab);
        });
      };
    },
    [setTabs]
  );

  const defaultTab = useMemo((): TabContext => {
    if (!defaultTabComponent)
      return {
        active: false,
        component: TabNull,
        id: unknownId,
        title: "Undefined Tab",
        translation: {
          key: "general.undefinedTab",
          ns: "tabs",
        },
      };

    return {
      ...defaultTabComponent,
      active: true,
    };
  }, [unknownId, defaultTabComponent]);

  const getTabByTitle = useCallback(
    (title: string) => {
      return tabs.find(tab => tab.title === title);
    },
    [tabs]
  );

  const getTabById = useCallback(
    (id: string) => {
      return tabs.find(tab => tab.id === id);
    },
    [tabs]
  );

  const getTabByComponent = useCallback(
    (component: TabComponent) => {
      return tabs.find(tab => tab.component === component);
    },
    [tabs]
  );

  const updateTabTitle = useCallback(
    (id: string, title: string, translation?: { key: string; ns: string }) => {
      setTabs(previousTabs =>
        previousTabs.map((tab) => {
          if (tab.id === id) {
            return { ...tab, title, translation };
          }
          return tab;
        }));
    },
    [setTabs]
  );

  const openTab = useCallback(
    (tabContext: TabContext) => () => {
      const tab = getTabByComponent(tabContext.component);
      if (tab) {
        activateTab(tab)();
      }
      else {
        newTab(tabContext);
      }
    },
    [getTabByComponent, activateTab, newTab]
  );

  const activeTab = useMemo(() => {
    return tabs.find(tab => tab.active);
  }, [tabs]);

  const activeTabTitle = useMemo(() => {
    return activeTab
      ? (activeTab.translation
        ? t(activeTab.translation.key, {
          lng: resolvedLanguage,
          ns: activeTab.translation.ns,
        })
        : activeTab.title)
      : undefined;
  }, [t, activeTab, resolvedLanguage]);

  useEffect(() => {
    if (activeTabTitle && activeTabTitle !== appTitle) {
      updateTitle(activeTabTitle);
      if (activeTab?.id) {
        updateTabTitle(activeTab.id, activeTabTitle, activeTab.translation);
      }
    }
  }, [activeTab, activeTabTitle, appTitle, updateTitle, updateTabTitle]);

  return {
    activateTab,
    activeTab,
    closeTab,
    defaultTab,
    getTabByComponent,
    getTabById,
    getTabByTitle,
    newTab,
    openTab,
    setTabs,
    setTabsPosition,
    tabs,
    tabsPosition,
    updateTabTitle,
  };
};
